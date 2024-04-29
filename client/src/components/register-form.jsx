import { Button, Input, Typography } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'

import InputWithHelperText from './input-with-helper-text'

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 py-6">
        <InputWithHelperText
          size="lg"
          label="아이디"
          placeholder="아이디"
          helperText={'영문 소문자 또는 영문 소문자, 숫자 조합 6~12 자리'}
          error={errors.id ? true : false}
          {...register('id', {
            required: true,
            minLength: 6,
            maxLength: 12,
            pattern: /^[a-z0-9]+$/,
          })}
        />
        <Input
          type="password"
          size="lg"
          label="비밀번호"
          placeholder="********"
          error={errors.password ? true : false}
          {...register('password', {
            required: true,
            minLength: 8,
            maxLength: 15,
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/,
          })}
        />
        <InputWithHelperText
          type="password"
          maxLength={16}
          size="lg"
          label="비밀번호 확인"
          placeholder="********"
          helperText="영문, 숫자, 특수문자 조합 8~15 자리"
          error={errors.confirm_password ? true : false}
          {...register('confirm_password', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
        />
        <Input
          maxLength={40}
          size="lg"
          label="이름"
          placeholder="홍길동"
          error={errors.username ? true : false}
          {...register('username', {
            required: true,
            maxLength: 40,
          })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" className="text-sm" fullWidth>
          회원가입
        </Button>
        <Typography color="gray" className="text-center">
          이미 계정이 있으신가요?{' '}
          <a href="#" className="font-medium text-gray-900">
            로그인
          </a>
        </Typography>
      </div>
    </form>
  )
}

export default RegisterForm
