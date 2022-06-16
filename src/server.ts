import express from 'express'
import serveIndex from 'serve-index'
import path from 'path'

const app = express()

// Static files
app.use(express.static(path.join(__dirname, '/assets')))
app.use('/css', express.static(path.join(__dirname, '/assets/css')))
app.use('/img', express.static(path.join(__dirname, '/assets/img')))
app.use('/js', express.static(path.join(__dirname, '/assets/js')))
app.use('/processedimages', express.static(path.join(__dirname, '/assets/processedimages')), serveIndex(path.join(__dirname, '/assets/processedimages'), { icons: true }))

// Set View
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Routes
app.use(require('./routes'))

app.listen(3333)

module.exports = app
