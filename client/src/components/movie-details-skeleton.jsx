import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react'

function MovieDetailsSkeleton() {
  return (
    <Card className="w-full animate-pulse flex-col md:flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 md:w-2/5 md:rounded-r-none"
      >
        <div className="h-full w-full bg-gray-300" />
      </CardHeader>
      <CardBody className="flex w-full flex-col justify-between gap-8">
        <div className="flex flex-col gap-2">
          <Typography
            variant="h6"
            color="gray"
            className="mb-2 rounded-full bg-gray-300 uppercase"
          >
            &nbsp;
          </Typography>
          <Typography
            variant="h4"
            color="blue-gray"
            className="rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            color="gray"
            className="h-40 w-full rounded-3xl bg-gray-300 font-normal"
          >
            &nbsp;
          </Typography>
        </div>
        <div className="flex flex-col gap-2 uppercase">
          <Typography className="mb-6 h-10 rounded-full bg-gray-300">
            &nbsp;
          </Typography>
          <Typography className="rounded-full bg-gray-300">&nbsp;</Typography>
          <Typography className="rounded-full bg-gray-300">&nbsp;</Typography>
          <Typography className="rounded-full bg-gray-300">&nbsp;</Typography>
          <Typography className="rounded-full bg-gray-300">&nbsp;</Typography>
          <Typography className="rounded-full bg-gray-300">&nbsp;</Typography>
          <Typography className="rounded-full bg-gray-300">&nbsp;</Typography>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-20 rounded-lg bg-gray-300" />
          <div className="h-10 w-20 rounded-lg bg-gray-300" />
        </div>
      </CardBody>
    </Card>
  )
}

export default MovieDetailsSkeleton
