import React from "react";

import { Button, Input, Typography } from '@material-tailwind/react'

function LoginForm({ id, setId, password, setPassword, onLoginClick }) {

    return (
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={e => e.preventDefault()}>
            <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                    ID
                </Typography>
                <Input
                    size="lg"
                    placeholder="username"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                </Typography>
                <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    minLength="8"
                    maxLength="16"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4">
                <Button className="mt-6" type="submit" fullWidth onClick={onLoginClick}>
                    로그인
                </Button>
            </div>
        </form>
    );
}

export default LoginForm