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
import { useNavigate } from 'react-router-dom'
import API from "@/api"   // ✅ using alias + central API

const Signup = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
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

      const res = await API.post("/api/auth/signup", formData)

      console.log(res.data)

      if (res.data.success) {
        toast.success("Account created successfully!")
        navigate('/login')
      }

    } catch (error) {
      console.log(error)

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        "Something went wrong during signup!"

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
            Create your account
          </h1>
          <p className='text-gray-600'>
            Start organizing your thoughts today
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='text-center text-green-600'>
              Sign up
            </CardTitle>
            <CardDescription className='text-center'>
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div>
                <Label>Full Name</Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

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
                <Label>Password</Label>
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
                    Creating...
                  </>
                ) : "Signup"}
              </Button>

            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <button onClick={() => navigate('/login')}>
              Already have an account?
              <span className='text-green-600 ml-1'>Login</span>
            </button>
          </CardFooter>

        </Card>
      </div>
    </div>
  )
}

export default Signup