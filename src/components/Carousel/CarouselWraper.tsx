import React from 'react'
import { getCarouselImages } from "app/utils/getCarouselImages"
import Carousel from './Carousel'

const CarouselWrapper: React.FC = async () => {
  // recebe a url de todas imagens dispostas dentro de public/carousel
  const images = await getCarouselImages()

  return (
    <div className='relative w-full p-4'>
      <Carousel images={images} />
    </div>
  )
}

export default CarouselWrapper