import express, { Request, Response } from 'express'
import sharp from 'sharp'
import { resize } from './sharp'
import fs from 'fs'
import path from 'path'

export const router = express.Router()
const imageFolder = path.join(__dirname, '/assets', '/processedimages')

// Cache

sharp.cache({
  files: 10,
  memory: 200,
  items: 100
})

router.get('/', (request: Request, response: Response): void => {
  return response.render('index')
})

router.get(
  '/health',
  function (request: Request, response: Response): Response {
    return response.status(200).json({ success: true })
  }
)

router.get('/resize', (req: Request, res: Response): void => {
  const file = req.query.fileInput

  // File Validations

  if (!file) {
    res.status(400).send('No files were uploaded.')
    return
  }

  const completeFilepath = path.join(imageFolder, file.toString())

  if (!fs.existsSync(completeFilepath)) {
    res.status(400).send('There is no such file.')
    return
  }

  // Width and Height Validations

  const width = req.query && req.query.width && +req.query.width
  const height = req.query && req.query.height && +req.query.height

  if (width == null || height == null) {
    res.status(400).send('Width and Height are mandatories fields.')
    return
  }

  if (width < 1 || height <= 1) {
    res.status(400).send('Width and Height must be bigger than 0.')
    return
  }

  if (isNaN(width) || isNaN(height)) {
    res.status(400).send('Width and Height must be numbers.')
    return
  }

  type MethodStrings = keyof typeof sharp.fit
  const method: MethodStrings = req.query.method as MethodStrings

  // Manual cache (SHARP has its own cache declared in the begining of this file)

  const size: string = width + 'x' + height + '-' + method
  const files = fs
    .readdirSync(imageFolder)
    .filter((file) => file.match(`${size}`))
  if (files.length > 0) {
    res.status(200).render('result')
    return
  }

  // Calling the resize function

  resize(completeFilepath, width, height, method)

  // Returning the result

  res.status(200).render('result')
})

module.exports = router
