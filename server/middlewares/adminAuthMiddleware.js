const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuthMiddleware = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized. Token missing.' })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET_KEY)

    const userId = decodedToken.uid

    const user = await User.findById(userId)

    // console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (user.role === 'admin') {
      req.user = user
      next()
    } else {
      return res.status(403).json({ error: 'Access denied' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' })
  }
}

module.exports = adminAuthMiddleware
