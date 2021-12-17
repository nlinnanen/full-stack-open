const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total+blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce((currentFavorite, blog) => currentFavorite.likes<blog.likes ? blog : currentFavorite)
    : null
}

const mostBlogs = (blogs) => {
  const authorsByBlogs = _.countBy(blogs, blog => blog.author)
  return _.size(authorsByBlogs) !== 0
    ? _.maxBy(_.toPairs(authorsByBlogs), author => author[1])[0]
    : null
}

module.exports = {
  mostBlogs,
  favoriteBlog,
  totalLikes,
  dummy
}