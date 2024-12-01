import React from 'react'
import { getCarouselImages } from "app/utils/getCarouselImages"
import Carousel from './Carousel'

const CarouselWrapper: React.FC = async () => {
  const images = await getCarouselImages()

  return (
    <div className='h-64 m-auto'>
      <Carousel images={images} />
    </div>
  )
}

export default CarouselWrapper