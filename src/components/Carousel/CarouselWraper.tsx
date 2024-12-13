import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'

const CarouselWrapper: React.FC = () => {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/carousel')
        if(!response.ok)
          throw new Error("Images not found")

        const data = await response.json()
        setImages(data)
      } catch (error) {
        console.error('Failed to fetch carousel images:', error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="relative w-full p-4">
      <Carousel images={images} />
    </div>
  )
}

export default CarouselWrapper