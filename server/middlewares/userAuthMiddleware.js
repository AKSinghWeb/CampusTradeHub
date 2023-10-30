const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuthMiddleware = async (req, res, next) => {
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

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = user
    console.log('req.user', req.user)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' })
  }
}

module.exports = userAuthMiddleware
