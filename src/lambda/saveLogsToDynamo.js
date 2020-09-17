const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const bucket = 'randosbucket';

exports.handler = async (event) => {
  const { key } = event.Records[0].s3.object;

  const head = await s3.headObject({ Bucket: bucket, Key: key }).promise();
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  const params = {
    TableName: 'Files',
    Item: {
      hash: { S: key },
      name: { S: head.Metadata.filename },
      size: { S: head.ContentLength.toString() },
      type: { S: head.ContentType },
      expires_at : {N: (new Date(head.Expires).valueOf() / 1000).toString()},
    },
  };

  await ddb.putItem(params).promise();

  return {
    statusCode: 200,
    body: 'Object Added!',
  };
};
