import AWS from 'aws-sdk';
import config from '../config/aws.json';

AWS.config.update(config);

const db = new AWS.DynamoDB.DocumentClient();

const paramBuilder = (custom) => ({ ...custom, TableName: 'Files' });
// eslint-disable-next-line import/prefer-default-export
export const getAll = async () => db.scan(paramBuilder()).promise();
