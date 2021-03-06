import { getBook, hello, hi, listBook, registerBook } from '@functions/index'
import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-example-nodejs',
  frameworkVersion: '2',
  custom: {
    defaultStage: 'dev',
    dynamoDbTableName: 'aws-serverless-example-nodejs-dynamodb-${self:provider.stage}',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    stage: '${opt:stage, self:custom.defaultStage}',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMODB_TABLE_NAME: '${self:custom.dynamoDbTableName}',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem'],
            // Resource: {'Fn::Sub': 'arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/*'},
            Resource: { 'Fn::GetAtt': ['DynamoDbTable', 'Arn'] },
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { hello, hi, getBook, listBook, registerBook },
  resources: {
    Resources: {
      DynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            { AttributeName: 'isbn', AttributeType: 'S' },
            // { AttributeName: 'title', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'isbn', KeyType: 'HASH' },
            //{ AttributeName: 'title', KeyType: 'RANGE' },
          ],
          // ProvisionedThroughput: {
          //   ReadCapacityUnits: 1,
          //   WriteCapacityUnits: 1,
          // },
          BillingMode: 'PAY_PER_REQUEST',
          TableName: '${self:custom.dynamoDbTableName}',
        },
      },
    },
  },
}

module.exports = serverlessConfiguration
