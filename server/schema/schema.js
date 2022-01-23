const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

var books = [
    { name: 'Book1', genre: 'Genre1', id: '1' },
    { name: 'Book2', genre: 'Genre2', id: '2' },
    { name: 'Book3', genre: 'Genre3', id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
            return _.find(books, { id:args.id })
          // code to get data from dvb/ other source
      }
    },
  },
})

module.exports = new GraphQLSchema({
   query: RootQuery
})