'use client'

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
    <figure className="w-96">
      <img
        src={images[index]}
        className="h-full w-full"
        alt={`Imagem ${index + 1} do carrossel`}
      />
    </figure>
  )
}

export default Carousel