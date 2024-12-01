"use client"

import { Icon } from "@iconify/react/dist/iconify.js"

interface IBlog {
    titulo: string
    texto: string
}

export const Blog = ({ texto, titulo }: IBlog) => {
    return (
        <article className="">
            <h3 className="text-xl mb-3 flex">
                <Icon icon={"mdi:flower"} width={30} className="px-2"/>
                {titulo}
                </h3>
            <p className="px-3">{texto}</p>
        </article>
    )
}