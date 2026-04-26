import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import API from "@/api"   // ✅ use central API
import { getData } from '@/context/userContext'

const Login = () => {
  const { setUser } = getData()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const res = await API.post("/api/auth/login", formData)

      if (res.data.success) {
        localStorage.setItem("accessToken", res.data.accessToken)
        setUser(res.data.user)

        toast.success(res.data.message || "Login successful!")
        navigate("/")
      }

    } catch (error) {
      console.log(error)

      const errorMessage =
        error.response?.data?.message ||
        "Login failed"

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
            Login into your account
          </h1>
          <p className='text-gray-600'>
            Start organizing your thoughts today
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='text-center text-green-600'>
              Login
            </CardTitle>
            <CardDescription className='text-center'>
              Login to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <div className='flex justify-between'>
                  <Label>Password</Label>
                  <Link to="/forgot-password" className='text-sm text-green-600'>
                    Forgot?
                  </Link>
                </div>

                <div className='relative'>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className='absolute right-0 top-0 h-full'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Logging in...
                  </>
                ) : "Login"}
              </Button>

            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <button onClick={() => navigate('/signup')}>
              Don’t have an account?
              <span className='text-green-600 ml-1'>Signup</span>
            </button>
          </CardFooter>

        </Card>
      </div>
    </div>
  )
}

export default Login