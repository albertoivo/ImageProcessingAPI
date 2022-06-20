import path from 'path'
import sharp from 'sharp'
import { removeExtension } from './util'

// Cache

sharp.cache({
  files: 10,
  memory: 200,
  items: 100
})

type MethodStrings = keyof typeof sharp.fit

export const resize = (
  filepath: string,
  width: number,
  height: number,
  method: MethodStrings
): JSON => {
  const newName = path.join(
    removeExtension(filepath) +
      '-' +
      width +
      'x' +
      height +
      '-' +
      method +
      '.png'
  )

  try {
    sharp(filepath).resize(width, height, { fit: method }).toFile(newName)
  } catch (e) {
    const responseData = JSON.stringify({ status: 400, error: e })
    return JSON.parse(responseData)
  }

  const responseData = JSON.stringify({ status: 200 })
  return JSON.parse(responseData)
}
