
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import API from "@/api"   // ✅ use central API

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setError("")

      const res = await API.post("/api/auth/forgot-password", {
        email
      })

      if (res.data.success) {
        toast.success(res.data.message)
        setIsSubmitted(true)

        // Navigate to OTP page
        navigate(`/verify-otp/${email}`)
      }

    } catch (error) {
      console.log(error)

      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset link"

      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full h-screen bg-green-100 flex items-center justify-center'>
      <div className='w-full max-w-md p-4 space-y-6'>

        <div className='text-center'>
          <h1 className='text-3xl font-bold text-green-600'>
            Reset Your Password
          </h1>
          <p className='text-gray-600'>
            Enter your email to receive reset instructions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='text-center text-green-600'>
              Forgot Password
            </CardTitle>
            <CardDescription className='text-center'>
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive reset link"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <div className='py-6 text-center space-y-4'>
                <div className='flex justify-center'>
                  <CheckCircle className='text-green-600 w-8 h-8' />
                </div>

                <p className='text-gray-700'>
                  We’ve sent a reset link to:
                </p>

                <p className='font-semibold'>{email}</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className='space-y-4'>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : "Send Reset Link"}
                </Button>

              </form>
            )}
          </CardContent>

          <CardFooter className='flex justify-center'>
            <p>
              Remember your password?{" "}
              <Link to="/login" className='text-green-600 hover:underline'>
                Login
              </Link>
            </p>
          </CardFooter>

        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword