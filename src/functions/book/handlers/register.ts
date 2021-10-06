import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { putBook } from '@libs/dynamodb'
import { middyfy } from '@libs/lambda'
import { Book } from '@libs/types'

import registerBookSchema from '../schema/register'

const registerBook: ValidatedEventAPIGatewayProxyEvent<typeof registerBookSchema> = async (event) => {
  const { isbn, title } = event.body
  const book = Book.init({ isbn, title })
  if (!book) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Invalid body: ${JSON.stringify(event.body)}`,
      }),
    }
  }
  await putBook(book)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `OK`,
      book: book.toObject(),
    }),
  }
}

export const main = middyfy(registerBook)
