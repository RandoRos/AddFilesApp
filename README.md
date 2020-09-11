# Accept file app
This is a test assignment for `Senior Javascript Engineer` position.

App will allow to upload file and case file is PE (Portable Executable) it will be stored into server side storage and its metric data will be stored in fast NoSQL database.

Duplicate files are not allowed.

#### Integration with AWS

We know that integration with AWS nowadays is way to move forward. I could've implement everything using regular server based architecture in mind. Instead I think we should move forward towards serverless and so I decided to use AWS integration.

AWS integration is done using `AWS S3` for file storage using *Expire rule*. Once file is uploaded into Storage, it will fire event for `AWS Lambda`, which will automatically write file metric data into `AWS DynamoDB`.

Reason choosing DynamoDB is that my initial idea was to use some kind of hash table in terms of access speed. I thought about using Redis but then when I started to think about AWS integration and about using S3 for files I thought why not use DynamoDB as well.

#### Lambda

Lambda function that will be triggered once S3 put event triggers will look like:

```javascript
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
      expires_at: { S: head.Expires.toString() },
    },
  };

  await ddb.putItem(params).promise();

  return {
    statusCode: 200,
    body: 'Object Added!',
  };
};
```
App also has `Dockerfile` to create docker container.

App has also simple React front page

### API
