import { gql } from 'apollo-server-core'
const typeDefs = gql`

"A track is a group of Modules that teaches about a specific topic"
type Video {
     id: ID!
     title: String!
     description: String
     owner: User!
     thumbnail: String
     length: Int
}
type User {
     id: ID!
     name: String!
     email: String!
}

input AddVideoInput {
  title: String!
  description: String
  ownerId: ID!
  thumbnail: String
  length: Int
}

type AddVideoResponse {
  success: Boolean!
  message: String!
  video: Video
}

type Mutation {
  addVideo(input: AddVideoInput!): AddVideoResponse!
}

"Query"
type Query { 
     videosForHome: [Video!]!  
     video(id: ID!): Video!
}
`

export default typeDefs