import fs from 'fs'
import path from 'path'

export async function getCarouselImages() {
    const carouselPath = path.join(process.cwd(), 'public/carousel')

    try {
        const files = fs.readdirSync(carouselPath)
        return files
            .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file)) // Filtra apenas imagens
            .map((file) => `/carousel/${file}`) // Adiciona o caminho relativo
    } catch (error) {
        console.error('Error reading carousel images:', error)
        return []
    }
}
