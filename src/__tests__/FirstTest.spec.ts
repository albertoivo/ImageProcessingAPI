import request from 'supertest'
import express from 'express'

const app = express()

app.use(require('../routes'))

jest.useFakeTimers()
jest.setTimeout(30000)

describe('GET /health', () => {
  it('The app is online', (done) => {
    request(app).get('/health').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done)
  })
})

describe('GET /resize', () => {
  it('responds with 400 (Bad Request - Width or Height = 0)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&width=0&height=66&method=contain').expect(400, done)
  })
})

describe('GET /resize', () => {
  it('responds with 400 (Bad Request - Width or Height Not a Number)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&width=AAA&height=66&method=contain').expect(400, done)
  })
})

describe('GET /resize', () => {
  it('responds with 400 (Bad Request - Width or Height less then 1)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&width=-66&height=66&method=contain').expect(400, done)
  })
})

describe('GET /resize', () => {
  it('responds with 400 (Bad Request - Neither Width nor Height)', (done) => {
    request(app).get('/resize?fileInput=sunset.jpg&method=contain').expect(400, done)
  })
})

describe('GET /resize', () => {
  it('responds with 400 (Bad Request - No File)', (done) => {
    request(app).get('/resize?method=contain').expect(400, done)
  })
})
