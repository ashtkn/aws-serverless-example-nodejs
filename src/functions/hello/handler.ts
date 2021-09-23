import 'source-map-support/register'

import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const hello: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world!`,
      event,
    }),
  }
}

export const main = middyfy(hello)
