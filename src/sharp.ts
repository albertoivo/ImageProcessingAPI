import { Response } from 'express'
import path from 'path'
import sharp from 'sharp'
import { removeExtension } from './util'

type MethodStrings = keyof typeof sharp.fit

export const resize = (
  filename: string,
  width: number,
  height: number,
  method: MethodStrings
): JSON => {
  const filepath = '/processedimages/' + filename
  const newName =
    '/processedimages/' +
    removeExtension(filename) +
    '-' +
    width +
    'x' +
    height +
    '-' +
    method +
    '.png'

  try {
    sharp(path.join(__dirname, '/assets', filepath))
      .resize(width, height, { fit: method })
      .toFile(path.join(__dirname, '/assets', newName))
  } catch (e) {
    const responseData = JSON.stringify({ status: 400, error: e })
    return JSON.parse(responseData)
  }

  const responseData = JSON.stringify({ status: 200 })
  return JSON.parse(responseData)
}
