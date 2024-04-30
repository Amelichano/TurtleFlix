import { forwardRef } from 'react'

import { Input, Typography } from '@material-tailwind/react'
import { InfoCircledIcon } from '@radix-ui/react-icons'

const InputWithHelperText = forwardRef(({ helperText, ...props }, ref) => {
  return (
    <div>
      <Input {...props} ref={ref} />
      <Typography
        variant="small"
        color="gray"
        className="mt-2 flex items-center gap-1"
      >
        <InfoCircledIcon className="h-4 w-4" />
        {helperText}
      </Typography>
    </div>
  )
})

InputWithHelperText.displayName = 'InputWithHelperText'

export default InputWithHelperText
