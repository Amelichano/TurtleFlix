import { Button, Card, Input, Typography } from '@material-tailwind/react'

import InputWithHelperText from '../components/input-with-helper-text'

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          회원가입
        </Typography>
        <Typography color="gray" className="mt-1">
          만나서 반가워요!
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-6">
            <InputWithHelperText
              maxLength={20}
              size="lg"
              label="아이디"
              placeholder="username"
              helperText="영문 소문자 또는 영문 소문자, 숫자 조합 6~12 자리"
            />
            <Input
              type="password"
              maxLength={16}
              size="lg"
              label="비밀번호"
              placeholder="********"
            />
            <InputWithHelperText
              type="password"
              maxLength={16}
              size="lg"
              label="비밀번호 확인"
              placeholder="********"
              helperText="영문, 숫자, 특수문자 조합 8~15 자리"
            />
            <Input maxLength={40} size="lg" label="이름" placeholder="홍길동" />
          </div>
          <div className="flex flex-col gap-4">
            <Button type="submit" className="text-sm" fullWidth>
              회원가입
            </Button>
            <Typography color="gray" className="text-center">
              이미 계정이 있으신가요?{' '}
              <a href="#" className="font-medium text-gray-900">
                로그인하기
              </a>
            </Typography>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Register
