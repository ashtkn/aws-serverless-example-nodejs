import 'source-map-support/register'

import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { putBook } from '@libs/dynamodb'
import { middyfy } from '@libs/lambda'
import { Book } from '@libs/types'

import registerBookSchema from '../schema/register'

const registerBook: ValidatedEventAPIGatewayProxyEvent<typeof registerBookSchema> = async (event) => {
  const { isbn, title } = event.body
  const book = Book.init({ isbn, title })
  if (!book) {
    return formatJSONResponse(
      {
        message: `Invalid body: ${JSON.stringify(event.body)}`,
      },
      400
    )
  }
  await putBook(book)

  return formatJSONResponse({
    message: `OK`,
    book,
  })
}

export const main = middyfy(registerBook)
