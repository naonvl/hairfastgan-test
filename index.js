import { createServer } from 'http';
import express from 'express';
import Replicate from 'replicate';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
});

const model = 'camenduru/hairfastgan:c467265bc832a51093a26edd7d224eef88de0415659a8a2858b4aa20ccf194c1';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const face_image = req.file.path;
  const color_image = "https://replicate.delivery/pbxt/Kl7S0cEYqgQdTpSnNLnstLsdzInYA6ou1NDCNZQimnmYn0Xj/8.png";
  const shape_image = "https://replicate.delivery/pbxt/Kl7S0E0Cnrp568SMImXpZJij0jQDB0VdPplQGAuFnjtJg3wQ/1.png";

  const input = {
    face_image: face_image,
    color_image: color_image,
    shape_image: shape_image
  };

  console.log('Using model: %s', model);
  console.log('With input: %O', input);

  console.log('Running...');
  const output = await replicate.run(model, { input });
  console.log('Done!', output);

  res.send(output);
});
app.post('/upload-face-image', async (req, res) => {
  const face_image = req.body.face_image;
  const color_image = "https://replicate.delivery/pbxt/Kl7S0cEYqgQdTpSnNLnstLsdzInYA6ou1NDCNZQimnmYn0Xj/8.png";
  const shape_image = "https://replicate.delivery/pbxt/Kl7S0E0Cnrp568SMImXpZJij0jQDB0VdPplQGAuFnjtJg3wQ/1.png";

  const input = {
    face_image: face_image,
    color_image: color_image,
    shape_image: shape_image
  };

  console.log('Using model: %s', model);
  console.log('With input: %O', input);

  console.log('Running...');
  const output = await replicate.run(model, { input });
  console.log('Done!', output);
  res.send(output);
});
createServer(app).listen(3000, () => {
  console.log('Server started on port 3000');
});