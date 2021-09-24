import 'source-map-support/register'

import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const hi: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello world!`,
    }),
  }
}

export const main = middyfy(hi)
