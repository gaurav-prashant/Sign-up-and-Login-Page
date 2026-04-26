
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
import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from "@/api"   // ✅ use central API

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)

  const inputRefs = useRef([])
  const { email } = useParams()
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (value.length > 1) return

    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const finalOtp = otp.join("")

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      const res = await API.post(`/api/auth/verify-otp/${email}`, {
        otp: finalOtp
      })

      setSuccessMessage(res.data.message)
      setIsVerified(true)

      setTimeout(() => {
        navigate(`/change-password/${email}`)
      }, 2000)

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100'>
      <div className='w-full max-w-md space-y-6 p-4'>

        <div className='text-center'>
          <h1 className='text-3xl font-bold text-green-600'>
            Verify your email
          </h1>
          <p className='text-gray-600'>
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='text-center text-green-600'>
              Enter verification code
            </CardTitle>
            <CardDescription className='text-center'>
              {isVerified
                ? "Verification successful! Redirecting..."
                : "Enter the 6-digit code"}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <p className='text-green-600 text-center text-sm'>
                {successMessage}
              </p>
            )}

            {isVerified ? (
              <div className='text-center space-y-4'>
                <CheckCircle className='text-green-600 w-8 h-8 mx-auto' />
                <p>Verification successful!</p>
                <div className='flex justify-center items-center'>
                  <Loader2 className='animate-spin mr-2' />
                  <span>Redirecting...</span>
                </div>
              </div>
            ) : (
              <>
                {/* OTP Inputs */}
                <div className='flex justify-between'>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleChange(index, e.target.value)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 text-center text-lg font-bold"
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className='space-y-3'>
                  <Button
                    onClick={handleVerify}
                    disabled={isLoading || otp.some(d => d === "")}
                    className='w-full bg-green-600 hover:bg-green-500'
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className='animate-spin mr-2' />
                        Verifying...
                      </>
                    ) : "Verify Code"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearOtp}
                    disabled={isLoading}
                    className='w-full'
                  >
                    <RotateCcw className='mr-2 h-4 w-4' />
                    Clear
                  </Button>
                </div>
              </>
            )}

          </CardContent>

          <CardFooter className='flex justify-center'>
            <p className='text-sm'>
              Wrong email?{" "}
              <Link to="/forgot-password" className='text-green-600'>
                Go back
              </Link>
            </p>
          </CardFooter>

        </Card>

        <p className='text-center text-xs text-gray-500'>
          For testing use: <span className='font-mono'>123456</span>
        </p>

      </div>
    </div>
  )
}

export default VerifyOTP

