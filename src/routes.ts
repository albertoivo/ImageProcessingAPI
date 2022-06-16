// eslint-disable-next-line no-unused-vars
import express, { Request, Response } from 'express'
import sharp from 'sharp'
import { resize } from './services'

export const router = express.Router()

// Cache

sharp.cache({
  files: 10,
  memory: 200,
  items: 100
})

router.get('/', (request: Request, response: Response): void => {
  return response.render('index')
})

router.get('/health', function (request: Request, response: Response): Response {
  return response.status(200).json({ success: true })
})

router.get('/resize', (req: Request, res: Response): void => {
  const file = req.query.fileInput

  if (!file) {
    res.status(400).send('No files were uploaded.')
  }

  type MethodStrings = keyof typeof sharp.fit

  const width = req.query && req.query.width && +req.query.width
  const height = req.query && req.query.height && +req.query.height

  if (!width || !height) {
    res.status(400).send('Width and Height are mandatories fields')
  }

  if (isNaN(width) || isNaN(height)) {
    res.status(400).send('Width and Height must be numbers.')
  }

  if (width < 1 || height <= 1) {
    res.status(400).send('Width and Height must be bigger than 0.')
  }

  const method: MethodStrings = req.query.method as MethodStrings

  resize(res, file.toString(), width, height, method)

  res.render('result', {})
})

module.exports = router
