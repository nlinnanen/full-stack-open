const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config();

const Book = require('./models/book')
const Author = require('./models/author');
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://nikkenakke:${process.env.MONGODB_PASSWORD}@cluster0.q4xss.mongodb.net/?retryWrites=true&w=majority`
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int,
    bookCount: Int
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author]!
  me: User
}


type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]
  ): Book

  editAuthor(
    name: String!, 
    setBornTo: Int!
  ): Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  
  login(
    username: String!
    password: String!
  ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments, 
    authorCount: async () => Author.collection.countDocuments, 
    allBooks: async (root, {author, genre}) => {
      const books = await Book
        .find({genres: {$in: [genre]}})
        .populate('author')
      return books.filter(book => !author || book.author.name === author)
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: { $eq: args.author}})
      if(author){
        author = await Author.findByIdAndUpdate(author._id, {$inc: {bookCount: 1}})
      } else {
        author = new Author({ name: args.author, bookCount: 1 })
      }

      const book = new Book({ ...args, author})

      try {
        await author.save()
        await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (root, {name, setBornTo}, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOneAndUpdate({name}, {born: setBornTo})
      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      try {
        await user.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})