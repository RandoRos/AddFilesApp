import express from 'express';
import multer from 'multer';

import middleware from './utils/middleware';
import getList from './routes/getList';
import uploadFile from './routes/uploadFile';

const app = express();
const port = process.env.PORT || 3000;

middleware(app);

const upload = multer({
  preservePath: true,
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.post('/upload', upload.single('file'), uploadFile);
app.get('/list', getList);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
