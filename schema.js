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

"User of a complete Video or a Module"
type User {
     id: ID!
     name: String!
     email: String!
}

"Get video array for homepage grid"
type Query { 
     videosForHome: [Video!]!  
     video(id: ID!): Video!
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
`

export default typeDefs