import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name, 
      born,
      bookCount: books
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title,
      published,,
      author
    }
  }
`