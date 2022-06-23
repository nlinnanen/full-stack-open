const {
  UserInputError,
  AuthenticationError
} = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author');
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments, 
    authorCount: async () => Author.collection.countDocuments, 
    allBooks: async (root, {author, genre}) => {
      const books = await Book
        .find(genre ? {genres: {$in: [genre]}} : {})
        .populate('author')
      return books.filter(book => !author || book.author.name === author)
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: async (root, args, context) => context.currentUser 
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

module.exports = resolvers