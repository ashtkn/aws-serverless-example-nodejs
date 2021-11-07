import 'source-map-support/register'

import { formatJSONResponse } from '@libs/apiGateway'
import { scanAllBooks } from '@libs/dynamodb'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const listBook: APIGatewayProxyHandler = async () => {
  const books = await scanAllBooks()
  return formatJSONResponse({
    message: 'OK',
    books: books.map((e) => e.toObject()),
  })
}

export const main = middyfy(listBook)
