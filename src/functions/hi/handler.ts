import 'source-map-support/register'

import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const hi: APIGatewayProxyHandler = async () => {
  return formatJSONResponse({
    message: `Hello world!`,
  })
}

export const main = middyfy(hi)
