import React, { useEffect, useState } from 'react'
import { Card, Input, Button, Select, Option } from '@material-tailwind/react';
function Root() {

  const [target, setTarget] = useState('');
  const [value, setValue] = useState('');

  const search = () => {
    
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <form
      className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
      onSubmit={(e) => e.preventDefault()}
      >
        <Card className="w-full max-w-md p-6">
          <Input
            type="email"
            placeholder="제목을 통해 검색하시겠습니까?"
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <div className="mt-6 w-full">
            <Select
              label="장르 선택"
              value={value}
              onChange={(val) => setValue(val)}
            >
              <Option value="20">None</Option>
              <Option value="1">Adventure</Option>
              <Option value="2">Animation</Option>
              <Option value="3">Children</Option>
              <Option value="4">Comedy</Option>
              <Option value="5">Fantasy</Option>
              <Option value="6">Romance</Option>
              <Option value="7">Drama</Option>
              <Option value="8">Action</Option>
              <Option value="9">Crime</Option>
              <Option value="10">Thriller</Option>
              <Option value="11">Horror</Option>
              <Option value="12">Mystery</Option>
              <Option value="13">Sci-Fi</Option>
              <Option value="14">War</Option>
              <Option value="15">Musical</Option>
              <Option value="16">Documentary</Option>
              <Option value="17">IMAX</Option>
              <Option value="18">Western</Option>
              <Option value="19">Film-Noir</Option>
            </Select>
          </div>
          <Button className="mt-6" type="submit" fullWidth onClick={search}>
            검색
          </Button>
        </Card>
      </form>
    </div>
      
  )

}

export default Root
