import React, { useEffect, useState } from 'react'
import { Card, Input, Button } from '@material-tailwind/react';
function Root() {

  const [target, setTarget] = useState('');

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
          <Button className="mt-6" type="submit" fullWidth onClick={search}>
            검색
          </Button>
        </Card>
      </form>
    </div>
      
  )

}

export default Root
