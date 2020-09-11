import AWS from 'aws-sdk';
import moment from 'moment';
import awsConfig from '../config/aws.json';

const BUCKET_NAME = 'randosbucket';
const s3 = new AWS.S3(awsConfig);

export const putObject = async ({
  hash, buffer, mimetype, originalname,
}) => s3.putObject({
  Bucket: BUCKET_NAME,
  Key: hash,
  Body: buffer,
  ContentType: mimetype,
  Metadata: {
    Filename: originalname,
  },
  Expires: moment().add(1, 'hour').toISOString(),
}).promise();

export const getObject = async (hash) => s3.getObject({
  Bucket: BUCKET_NAME,
  Key: hash,
}).promise()
  .then((res) => res)
  .catch(() => null);
