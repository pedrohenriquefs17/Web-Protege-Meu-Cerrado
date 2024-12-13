import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const carouselPath = path.join(process.cwd(), 'public/carousel')

  try {
    const files = fs.readdirSync(carouselPath)
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `/carousel/${file}`)
    
    res.status(200).json(images)
  } catch (error) {
    console.error('Error reading carousel images:', error)
    res.status(500).json({ error: 'Failed to load carousel images' })
  }
}
