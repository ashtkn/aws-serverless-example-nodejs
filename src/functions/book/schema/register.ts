export default {
  type: 'object',
  properties: {
    isbn: { type: 'string' },
    title: { type: 'string' },
  },
  required: ['isbn', 'title'],
} as const
