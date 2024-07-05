import { createServer } from 'http';
import express from 'express';
import Replicate from 'replicate';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
});

const model = 'camenduru/hairfastgan:c467265bc832a51093a26edd7d224eef88de0415659a8a2858b4aa20ccf194c1';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });

// app.post('/upload-face-image', upload.single('face_image'), async (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.file.originalname);
//   console.log(filePath);
//   res.send('output');
// });
createServer(app).listen(3000, () => {
  console.log('Server started on port 3000');
});

app.post("/upload_files", upload.single('face_image'), (req, res) => {
  const originalname = req.file.originalname;
  const filepath = path.join(path.resolve(), 'uploads/', originalname);
  const newfilepath = path.join(path.resolve(), 'uploads/', originalname);
  const face_image = `http://47.237.84.27:4000/upload/${originalname}`;
  const color_image = req.body.color_image;
  const shape_image = "https://d3ss46vukfdtpo.cloudfront.net/static/media/img_thumbnails_hairstyle1.cf36955e.jpg";

  fs.rename(filepath, newfilepath, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Failed to rename file' });
    } else {
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
      res.send({ message: 'File uploaded successfully' });
    }
  });
});