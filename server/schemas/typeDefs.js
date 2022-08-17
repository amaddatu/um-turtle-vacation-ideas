const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tech {
    _id: ID!
    name: String!
  }

  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    # no password field, need to keep passwords hidden
  }
  type TokenUser {
    token: ID!
    user: User
  }
  type Dog{
    _id: ID!
    name: String
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]

    users: [User]
    user(_id: String!): User

    me: User
    test: Dog
  }


  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup

    createUser(name: String!, email: String!, password: String!): TokenUser
    createUserNoToken(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): TokenUser
  }
`;

module.exports = typeDefs;
