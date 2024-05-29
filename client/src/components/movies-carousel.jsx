import Autoplay from 'embla-carousel-autoplay'

import { Carousel, CarouselContent, CarouselItem } from './embla-carousel'
import MovieCard from './movie-card'

function MoviesCarousel({ movies }) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000 })]}
      className="w-full"
    >
      <CarouselContent className>
        {movies.map((movie, index) => (
          <CarouselItem
            key={index}
            className="p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default MoviesCarousel
