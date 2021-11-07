import { handlerPath } from '@libs/handlerResolver'

import registerBookSchema from './schema/register'

export const listBook = {
  handler: `${handlerPath(__dirname)}/handlers/list.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'book/list',
        cors: true,
      },
    },
  ],
}

export const getBook = {
  handler: `${handlerPath(__dirname)}/handlers/get.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'book/get',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              isbn: true,
            },
          },
        },
      },
    },
  ],
}

export const registerBook = {
  handler: `${handlerPath(__dirname)}/handlers/register.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'book/register',
        cors: true,
        request: {
          schemas: {
            'application/json': registerBookSchema,
          },
        },
      },
    },
  ],
}
