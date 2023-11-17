// ContactUs.js

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useApiCall from '@/hooks/useApiCall'
import { feedbackApiService } from '@/services/apiService'
import { Loader2 } from 'lucide-react'

import { useState } from 'react'

const ContactUs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [messageError, setMessageError] = useState('')

  const [createFeedbackApiCall, loading] = useApiCall(
    feedbackApiService.createFeedback
  )

  const validateForm = () => {
    let isValid = true
    if (name.trim() === '') {
      setNameError('Name is required')
      isValid = false
    } else {
      setNameError('')
    }
    if (email.trim() === '') {
      setEmailError('Email is required')
      isValid = false
    } else {
      setEmailError('')
    }
    if (message.trim() === '') {
      setMessageError('Message is required')
      isValid = false
    } else {
      setMessageError('')
    }

    if (message && message.length > 200) {
      setMessageError('Message should be less than 200 characters')
      isValid = false
    } else {
      setMessageError('')
    }

    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateForm()) {
      try {
        await createFeedbackApiCall('Message submitted successfylly!', {
          name,
          email,
          message,
        })
        setName('')
        setEmail('')
        setMessage('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full p-8 shadow-md border dark:bg-slate-900 dark:shadow-slate-800 rounded-md">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className=""
              placeholder="Your Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setNameError('')
              }}
            />
            {nameError && (
              <p className="text-sm font-semibold mt-1 ml-1 text-red-500">
                {nameError}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setEmailError('')
              }}
            />
            {emailError && (
              <p className="text-sm font-semibold mt-1 ml-1 text-red-500">
                {emailError}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 p-2 w-full "
              placeholder="Your Message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
                setMessageError('')
              }}
            ></Textarea>
            {messageError && (
              <p className="text-sm font-semibold mt-1 ml-1 text-red-500">
                {messageError}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span> Please wait </span>
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
