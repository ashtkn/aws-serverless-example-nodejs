import 'source-map-support/register'

import { formatJSONResponse } from '@libs/apiGateway'
import { selectBook } from '@libs/dynamodb'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyHandler } from 'aws-lambda'

const getBook: APIGatewayProxyHandler = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.isbn) {
    return formatJSONResponse(
      {
        message: `Invalid query: ${JSON.stringify(event.queryStringParameters)}`,
      },
      400
    )
  }
  const { isbn } = event.queryStringParameters
  const book = await selectBook({ isbn })
  if (!book) {
    return formatJSONResponse(
      {
        message: `Not found: ${isbn}`,
      },
      404
    )
  }
  return formatJSONResponse({
    message: 'OK',
    book: book.toObject(),
  })
}

export const main = middyfy(getBook)
