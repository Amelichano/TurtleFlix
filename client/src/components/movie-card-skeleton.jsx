import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@material-tailwind/react'

function MovieCardSkeleton({ movie }) {
  return (
    <Card className="mt-6 w-full">
      <div className="animate-pulse">
        <CardHeader color="blue-gray" className="relative h-56">
          <div className="h-full w-full bg-gray-300" />
        </CardHeader>
        <CardBody>
          <h5 className="mb-2 rounded-full bg-gray-300 text-xl">&nbsp;</h5>
          <p className="mb-1 rounded-full bg-gray-300 text-base">&nbsp;</p>
          <p className="rounded-full bg-gray-300 text-base">&nbsp;</p>
        </CardBody>
        <CardFooter className="flex gap-4 pt-0">
          <div className="h-10 w-20 rounded-lg bg-gray-300" />
          <div className="h-10 w-20 rounded-lg bg-gray-300" />
        </CardFooter>
      </div>
    </Card>
  )
}

export default MovieCardSkeleton
