import request from 'supertest'
import express, { Response } from 'express'
import { resize } from '../sharp'
import assert from 'assert'

const app = express()
app.use(require('../routes'))

jest.useFakeTimers()
jest.setTimeout(10000)

describe('GET /health', () => {
  it('The app is online', (done) => {
    request(app).get('/health').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done)
  })
})

describe('GET /resize (Bad Request)', () => {
  it('responds with 400 (Bad Request - Width or Height = 0)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&width=0&height=66&method=contain').expect(400, done)
  })

  it('responds with 400 (Bad Request - Width or Height Not a Number)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&width=AAA&height=66&method=contain').expect(400, done)
  })

  it('responds with 400 (Bad Request - Width or Height less then 1)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&width=-66&height=66&method=contain').expect(400, done)
  })

  it('responds with 400 (Bad Request - Neither Width nor Height)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&method=contain').expect(400, done)
  })

  it('responds with 400 (Bad Request - No File)', (done) => {
    request(app).get('/resize?method=contain').expect(400, done)
  })
})

describe('Service resize (Success)', () => {
  it('You can see the image created on: http://localhost:3333/processedimages/sunset-300x100-fill.png. Do not forget to start the project', (done) => {
    const r: JSON = resize('sunset.jpg', 300, 100, 'fill')
    expect(r).toMatchObject({ status: 200 })
    done()
  })

  it('You can see the image created on: http://localhost:3333/processedimages/sunset-300x100-cover.png. Do not forget to start the project', (done) => {
    const r: JSON = resize('sunset.jpg', 300, 100, 'cover')
    expect(r).toMatchObject({ status: 200 })
    done()
  })

  it('You can see the image created on: http://localhost:3333/processedimages/sunset-300x100-contain.png. Do not forget to start the project', (done) => {
    const r: JSON = resize('sunset.jpg', 300, 100, 'contain')
    expect(r).toMatchObject({ status: 200 })
    done()
  })
})

describe('Service resize (Error)', () => {
  it('responds with status: 400', (done) => {
    const r: JSON = resize('sunset.jpg', -10, 30, 'fill')
    expect(r).toMatchObject({ status: 400 })
    done()
  })

  it('responds with status: 400', (done) => {
    const r: JSON = resize('sunset.jpg', parseInt('a'), 30, 'fill')
    expect(r).toMatchObject({ status: 400 })
    done()
  })
})
