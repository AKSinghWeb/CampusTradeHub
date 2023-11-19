import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

export function LoginSignup() {
  return (
    <Tabs defaultValue="login" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">
          <span id="loginBtn">Login</span>
        </TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  )
}
