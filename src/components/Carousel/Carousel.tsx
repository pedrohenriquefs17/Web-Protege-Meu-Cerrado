'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ICarouselProps {
  images: string[]
}

const Carousel: React.FC<ICarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true) // Ativa o efeito de fade
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsFading(false) // Remove o fade após a troca
      }, 200) // Duração da animação (100ms)
    }, 3000) // Troca de imagem a cada 3 segundos
    
    return () => clearInterval(interval);
  }, [images.length])

  return (
    <figure className="relative mx-auto w-[95%] h-[30vw] group overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          key={`carousel-image-${index}`}
          src={images[index]}
          alt={`Imagem ${index + 1} do carroussel`}
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          sizes='100vw'
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div className="w-[50%] h-[30%] bg-black/50 backdrop-blur-sm rounded-lg">
            <Image
              src={"/logo-protege-meu-cerrado.png"}
              alt='Logo Protege Meu Cerrado'
              fill
            />
          </div>
        </div>
      </div>
    </figure>
  )
}

export default Carousel