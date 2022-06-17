# Image Processing API

## Table of contents

-   [Prerequisites](#prerequisites)
-   [Quick start](#quick-start)
-   [Build for production](#build-for-production)
-   [Lint](#lint)
-   [Limitations](#limitations)
-   [Developed with](#developed-with)
-   [Contributing](#contributing)
-   [Author](#author)

## Prerequisites

1.  Node
1.  NPM or Yarn

## Quick start

1. Clone it: `git clone https://github.com/albertoivo/ImageProcessingAPI.git`
1. Enter the directory: `cd ImageProcessingAPI`
1. Install the dependencies: `npm install`
1. Start it: `npm run dev`

It will open your browser at `http://localhost:3333`

## Endpoints for testing

After running the project, copy and paste the URLs below in your browser or run the `cURL` on terminal:

1. [http://localhost:3333/resize?fileInput=sunset.jpg&width=100&height=100&method=contain']()
1. `curl --request GET --url 'http://localhost:3333/resize?fileInput=sunset.jpg&width=500&height=50&method=contain'`

The result of the resizing operation you can see at <a href='http://localhost:3333/processedimages/'>http://localhost:3333/processedimages/</a>

## Tests

Tests have been made with Jest and SuperTest.

To run the tests:

`npm run test`

## Build for production

1. `npm run build`
1. `npm start`

It will open your browser at `http://localhost:3333`

## Lint

1. `npm run lint`

## Limitation

[Sharp](https://sharp.pixelplumbing.com/) is a powerful and fast module to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions. But here i use only a very few tools of it.

## Developed with

* [Node.js](https://nodejs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/)
* [Sharp](https://sharp.pixelplumbing.com/)

## Contributing

I welcome contributions to this project!

-   ⇄ Pull requests and ★ Stars are always welcome.

## Author

* **Alberto Ivo Vieira** - [Github](https://github.com/albertoivo) | [LinkedIn](https://www.linkedin.com/in/alberto-ivo-vieira/)
