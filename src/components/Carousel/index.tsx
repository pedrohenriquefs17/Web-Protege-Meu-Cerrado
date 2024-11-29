"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react"

interface ICarousel {
    images: string[]
}

const Carousel = ({ images }: ICarousel) => {
    const [index, setIndex] = useState(0)
    const length = images.length

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % length); // Incrementa e reseta quando atinge o maxIndex
        }, 3000) // 3segundos

        return () => clearInterval(timer); // Limpa o timer quando o componente desmontar
    });

    const handlePrevious = () => {
        const newIndex = index - 1
        setIndex(newIndex < 0 ? length - 1 : newIndex)
    };

    const handleNext = () => {
        const newIndex = index + 1
        setIndex(newIndex >= length ? 0 : newIndex)
    };

    return (
        <div className='h-96'>
            <figure className=''>
                <Image
                    src={images[index]}
                    alt="Carrossel de imagens do cerrado."
                    width={100}
                    height={96}
                    layout="intrinsic"
                />
            </figure>
        </div>
    )
}

export default Carousel