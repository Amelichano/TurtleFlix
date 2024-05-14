import React from 'react'

import { Button, Input } from '@material-tailwind/react'

function LoginForm({ id, setId, password, setPassword, onLoginClick }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-4 py-6">
        <Input
          size="lg"
          placeholder="username"
          label="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          size="lg"
          label="비밀번호"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" fullWidth onClick={onLoginClick}>
          로그인
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
