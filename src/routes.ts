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
    return
  }

  type MethodStrings = keyof typeof sharp.fit

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

  const method: MethodStrings = req.query.method as MethodStrings

  const resizeResponse = resize(res, file.toString(), width, height, method)

  res.render('result', { resizeResponse })
})

module.exports = router
