import { DynamoDB } from 'aws-sdk'

import { Book, BookSelectQuery } from './types'

const dynamoDbTableName = process.env.DYNAMODB_TABLE_NAME || ''
console.log('dynamoDbTableName', dynamoDbTableName)

const client = new DynamoDB()

export const scanAllBooks = async (): Promise<Book[]> => {
  const params: DynamoDB.Types.ScanInput = {
    TableName: `${dynamoDbTableName}`,
  }
  return new Promise<Book[]>((resolve, reject) => {
    client.scan(params, (err, data) => {
      if (err) {
        console.error('Error at scanAllBooks:', err)
        reject(err)
      } else {
        console.log('Successfully finished scanAllBooks:', JSON.stringify(data, null, 2))
        if (!data.Items) {
          resolve([])
        } else {
          const books = data.Items.flatMap(({ isbn, title }) => {
            if (!isbn.S || !title.S) {
              console.error('Warning: isbn or title is undefined')
              return []
            }
            const book = Book.init({
              isbn: isbn.S,
              title: title.S,
            })
            if (!book) {
              console.error('Constructor failed')
              return []
            }
            return [book]
          })
          resolve(books)
        }
      }
    })
  })
}

export const selectBook = async (query: BookSelectQuery): Promise<Book | null> => {
  // TODO:
  const { isbn } = query
  const params: DynamoDB.Types.GetItemInput = {
    TableName: `${dynamoDbTableName}`,
    Key: {
      isbn: { S: isbn },
    },
  }
  console.log('params', params)
  return new Promise<Book | null>((resolve, reject) => {
    client.getItem(params, (err, data) => {
      if (err) {
        console.error('Error at selectBook:', err)
        reject(err)
      } else {
        console.log('Successfully finished selectBook:', JSON.stringify(data, null, 2))
        if (!data.Item) {
          resolve(null)
        } else {
          const { isbn, title } = data.Item
          if (!isbn.S || !title.S) {
            console.error('Warning: isbn or title is undefined')
            resolve(null)
          } else {
            const book = Book.init({
              isbn: isbn.S,
              title: title.S,
            })
            if (!book) {
              console.error('Constructor failed')
            }
            resolve(book)
          }
        }
      }
    })
  })
}

export const putBook = async (book: Book): Promise<void> => {
  const { isbn, title } = book
  const params: DynamoDB.Types.PutItemInput = {
    TableName: `${dynamoDbTableName}`,
    Item: {
      isbn: { S: isbn },
      title: { S: title },
    },
  }
  return new Promise<void>((resolve, reject) => {
    client.putItem(params, (err, data) => {
      if (err) {
        console.error('Error at registerBook:', err)
        reject(err)
      } else {
        console.log('Successfully finished registerBook:', JSON.stringify(data, null, 2))
        resolve()
      }
    })
  })
}
