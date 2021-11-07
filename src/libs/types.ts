type BookIsbn = string
type BookTitle = string

type BookArgs = { isbn: string; title: string }

export class Book {
  private _isbn: BookIsbn
  private _title: BookTitle
  private constructor({ isbn, title }: BookArgs) {
    this._isbn = isbn
    this._title = title
  }

  get isbn(): BookIsbn {
    return this._isbn
  }
  get title(): BookTitle {
    return this._title
  }
  toJSON(): { isbn: BookIsbn; title: BookTitle } {
    return { isbn: this._isbn, title: this._title }
  }

  static init({ isbn, title }: BookArgs): Book | null {
    // TODO: Validate arguments
    if (isbn.length === 13 || title.length > 0) {
      return new Book({ isbn, title })
    }
    return null
  }
}

export type BookSelectQuery = {
  isbn: BookIsbn
}
