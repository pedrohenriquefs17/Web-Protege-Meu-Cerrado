'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ICarouselProps {
  images: string[]
}

const Carousel: React.FC<ICarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000) // Troca a imagem a cada 3 segundos

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar
  }, [images.length])

  return (
    <figure className="relative mx-auto w-[95%] h-[30vw]">
      {/* <img
        src={images[index]}
        className="h-full w-full"
        alt={`Imagem ${index + 1} do carrossel`}
      /> */}
      <Image
        key={`carousel-image-${index}`}
        src={images[index]}
        alt={`Imagem ${index + 1} do carroussel`}
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        sizes='100vw'
      />
    </figure>
  )
}

export default Carousel