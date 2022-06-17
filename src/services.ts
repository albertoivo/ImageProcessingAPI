import e, { Response } from 'express'
import path from 'path'
import sharp from 'sharp'
import { removeExtension } from './util'

type MethodStrings = keyof typeof sharp.fit

export const resize = (res: Response, filename: string, width: number, height: number, method: MethodStrings): Response => {
  const filepath = '/processedimages/' + filename
  const newName = '/processedimages/' + removeExtension(filename) + '-' + width + 'x' + height + '-' + method + '.png'

  try {
    sharp(path.join(__dirname, '/assets', filepath))
      .resize(width, height, { fit: method })
      .toFile(path.join(__dirname, '/assets', newName))

  } catch (e) {
    res.redirect('/erro', e)
  }

  return res.status(200)
}
