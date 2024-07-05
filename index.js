import { createServer } from 'http';
import express from 'express';
import Replicate from 'replicate';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import sharp from 'sharp';
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
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });
app.use('/upload_files', express.static(path.join(path.resolve(), 'uploads')));
createServer(app).listen(3000, () => {
  console.log('Server started on port 3000');
});


app.post("/upload_files", upload.single('face_image'), (req, res) => {
  const originalname = req.file.originalname;
  console.log(originalname);
  const filepath = req.file.path;
  const newfilepath = path.join(path.dirname(filepath), originalname);

  sharp(req.file.buffer)
    .resize(1024, 1024)
    .toFormat('jpeg')
    .toFile(newfilepath, async (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to resize and save file' });
      } else {
        const face_image = `https://hair.natestudio.my.id/upload_files/${originalname}`;
        const color_image = req.body.color_image;
        const shape_image = req.body.shape_image;

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