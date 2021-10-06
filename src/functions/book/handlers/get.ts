import 'source-map-support/register'

import { selectBook } from '@libs/dynamodb'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const getBook: APIGatewayProxyHandler = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.isbn) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Invalid query: ${JSON.stringify(event.queryStringParameters)}`,
      }),
    }
  }
  const { isbn } = event.queryStringParameters
  const book = await selectBook({ isbn })
  if (!book) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Not found: ${isbn}`,
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK',
      book: book.toObject(),
    }),
  }
}

export const main = middyfy(getBook)
