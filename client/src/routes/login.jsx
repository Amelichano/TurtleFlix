import React, { useEffect, useState } from 'react'
import { Card, Typography, Alert } from '@material-tailwind/react'

import LoginForm from '../components/login-form'
import { postLogIn } from '../api/user'

function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const hasCredential = () => {
    if (id.length <= 0 && password.length <= 0) {
      setMessage('아이디와 비밀번호를 입력해주세요')
      return false
    } else if (id.length <= 0) {
      setMessage('아이디를 입력해주세요')
      return false
    } else if (password.length <= 0) {
      setMessage('비밀번호를 입력해주세요')
      return false
    }
    return true
  }

  const login = () => {
    if (hasCredential()) {
      postLogIn(id, password)
        .then((res) => {
          sessionStorage.setItem('session', JSON.stringify(res))
          window.location.href = '/'
        })
        .catch((err) => {
          setMessage('로그인 실패!')
        })
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className={`fixed top-6 ${!message ? 'hidden' : ''}`}>
        <Alert variant="ghost">
          <span>{message}</span>
        </Alert>
      </div>

      <Card className="w-full max-w-md p-6">
        <Typography className="font-bold" variant="h4" color="blue-gray">
          로그인
        </Typography>
        <Typography className="mt-1 font-normal">TURTLEFLIX</Typography>
        <LoginForm
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
          onLoginClick={login}
        />
        <Typography color="gray" className="mt-4 text-center">
          계정이 없으신가요?{' '}
          <a href="/register" className="font-medium text-gray-900">
            회원가입
          </a>
        </Typography>
      </Card>
    </div>
  )
}

export default Login
