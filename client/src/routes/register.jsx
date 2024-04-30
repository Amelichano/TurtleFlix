import { Card, Typography } from '@material-tailwind/react'

import RegisterForm from '../components/register-form'

function Register() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          회원가입
        </Typography>
        <Typography color="gray" className="mt-1">
          만나서 반가워요!
        </Typography>
        <RegisterForm />
      </Card>
    </div>
  )
}

export default Register
