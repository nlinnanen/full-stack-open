import { gql  } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails  on Book {
    title,
    genres,
    published,
    author {
      name
    },
  }
`


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int! $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    id
  }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`