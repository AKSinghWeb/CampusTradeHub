import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useRef, useState } from 'react'
import { Checkbox } from './checkbox'
import { PasswordInput } from './PasswordInput'
import axios from 'axios'
import { useAuth } from '@/context/UserAuthContext'

const SignInForm = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const { state, dispatch } = useAuth()

  const [formData, setFormData] = useState({
    username: 'kminchelle',
    password: '0lelplR',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Make an Axios request to your API
      // const response = await axios.post(
      //   'https://dummyjson.com/auth/login',
      //   formData
      // )

      const response = await axios.get(
        'https://mocki.io/v1/9e9a2685-ac77-42f1-8fb9-392e96fc48f7'
      )

      // Handle the response as needed
      dispatch({ type: 'LOGIN', payload: response.data })
      const escKeyEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
      })
      document.dispatchEvent(escKeyEvent)
      console.log(state)
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Login failed', error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 py-6">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={handleChange}
              ref={inputRef}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

const SignUpForm = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  const [termsChecked, setTermsChecked] = useState(false)
  const handleTermsChange = () => {
    setTermsChecked((prev) => !prev)
  }
  return (
    <Card>
      <CardContent className="space-y-2 py-6">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input ref={inputRef} id="name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" type="password" />
        </div>
        <div className="space-y-1 mt-2">
          <div className="items-top flex space-x-2 mt-6">
            <Checkbox
              id="terms1"
              checked={termsChecked}
              onCheckedChange={handleTermsChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!termsChecked}>
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  )
}

export function LoginSignup() {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <SignInForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}
