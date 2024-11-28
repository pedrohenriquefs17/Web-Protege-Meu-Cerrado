"use client"

import Image from 'next/image';
import React, { useState } from 'react';

interface ICarousel {
    images: string[]
}

const Carousel = ({ images }: ICarousel) => {
    const [index, setIndex] = useState(0)
    const length = images.length

    const handlePrevious = () => {
        const newIndex = index - 1
        setIndex(newIndex < 0 ? length - 1 : newIndex)
    };

    const handleNext = () => {
        const newIndex = index + 1
        setIndex(newIndex >= length ? 0 : newIndex)
    };

    return (
        <div className="card is-shadowless">
            <div className='card-image'>
                <figure className='image'>
                    <img
                        src={images[index]}
                        alt="Carrossel de imagens do cerrado."
                        className='image is-128x128' />
                </figure>
            </div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            {/* <p>{index}</p> */}
        </div>
    )
}

export default Carousel