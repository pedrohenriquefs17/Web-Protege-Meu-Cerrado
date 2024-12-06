import React from 'react'
import { getCarouselImages } from "app/utils/getCarouselImages"
import Carousel from './Carousel'

const CarouselWrapper: React.FC = async () => {
  const images = await getCarouselImages()

  return (
    <div className='h-full border-2 border-red-500 p-2'>
      <Carousel images={images} />
    </div>
  )
}

export default CarouselWrapper