# Accept file App
This is a test assignment.

App will allow to upload file and case file is PE (Portable Executable) it will be stored into server side storage and its metric data will be stored in fast NoSQL database.

Duplicate files are not allowed.

#### Stack
- NodeJS/Express (ES6)
- React + React-Bootstrap
- Bable/Webpack integration
- AWS integration (S3, DynamoDB, Lambda, ECS, EC2)
- Docker ready

API and Front End will run on same container/instance.

#### API

API is simple and using 2 endpoints:

`/upload` - POST endpoint for file uploading. Maximum allowed file size is 10MB.
`/list` - GET endpoint to get all records from DynamoDB

#### Get Started

1. Install dependencies `npm install`.
2. Add AWS credentials into `/config/aws.example.js` and remove keyword `example` from file name.
2. Build `bundle.js` with using webpack, for React front-end. `npm run build`.
3. Run App and Express server `npm start`.

##
### Integration with AWS

We know that integration with AWS nowadays is way to move forward. I could've implement everything using regular server based architecture in mind. Instead I think we should move forward towards serverless and so I decided to use AWS integration.

AWS integration is done using `AWS S3` for file storage using *Expire rule*. Once file is uploaded into Storage, it will fire event for `AWS Lambda`, which will automatically write file metric data into `AWS DynamoDB`.

Reason choosing DynamoDB is that my initial idea was to use some kind of hash table in terms of access speed. I thought about using Redis but then when I started to think about AWS integration and about using S3 for files I thought why not use DynamoDB as well.

#### Lambda

Lambda function that will be triggered once S3 write event triggers, which is writing file logs into DynamoDB.

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

### Questions?

Contact me or via [LinkedIn](https://www.linkedin.com/in/rando-rostok-msc-a1118a161)
