# Bory Hair Style Changed API

This is an API to send request to replicate server for hairfastgan model

## Installation

- Install dependencies: `npm install`
- Run the app : `npm run dev`

## Project Structure

- `uploads` uploaded face images
- `index.js` express js app
- `.env` it holds the replicate api token

## Usage

This app runs hairfastgan model from [Camenduru](https://replicate.com/camenduru/hairfastgan) which is publicly available
Any request to this model will have to boot first, which result the API returns after 3 minutes

- To change the model used by replicate in this app
```js
const model = 'camenduru/hairfastgan:c467265bc832a51093a26edd7d224eef88de0415659a8a2858b4aa20ccf194c1';
```

- To create `REPLICATE_API_TOKEN` please go to `https://replicate.com/` -> sign up -> click your profile on the left -> api token -> there you can create your tokens
- To change replicate toke open `.env` change `REPLICATE_API_TOKEN` value
- To change the image url for `face_image` change `https://hair.natestudio.my.id/` to your domain, PS: it needs to be https


## Modules
[Camenduru Replicate](https://replicate.com/camenduru/hairfastgan)
[Replicate](https://www.npmjs.com/package/replicate)
[Express](https://www.npmjs.com/package/express)
[Hairfastgan Source Code](https://github.com/AIRI-Institute/HairFastGAN)