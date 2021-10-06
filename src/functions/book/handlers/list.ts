import 'source-map-support/register'

import { scanAllBooks } from '@libs/dynamodb'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const listBook: APIGatewayProxyHandler = async () => {
  const books = await scanAllBooks()
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK',
      books: books.map((e) => e.toObject()),
    }),
  }
}

export const main = middyfy(listBook)
