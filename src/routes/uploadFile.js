import * as S3 from '../S3';
import { isPeFile, generateHash } from '../utils/util';

export default async (req, res) => {
  if (isPeFile(req.file.buffer)) {
    const fileHash = generateHash(req.file.buffer);

    if (await S3.getObject(fileHash)) {
      res.status(500).send('File already exists');
    } else {
      try {
        await S3.putObject({
          hash: fileHash,
          buffer: req.file.buffer,
          mimetype: req.file.mimetype,
          originalname: req.file.originalname,
        });
      } catch (e) {
        res.send(e);
      }
      res.send('File successfully received');
    }
  } else {
    res.status(500).send('File is not Portable Executable');
  }
};
