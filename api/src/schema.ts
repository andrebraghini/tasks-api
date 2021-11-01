import { gql } from 'apollo-server';

export const typeDefs = gql`
  type LoginResponse {
    access_token: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: Status!
  }

  "Task Status"
  enum Status {
    TODO
    IN_PROGRESS
    DONE
    ARCHIVED
  }

  type Query {
    login(username: String!, password: String!): LoginResponse
    
    task(id: ID!): Task

    tasks: [Task]
  }

  type Mutation {
    signUp(username: String!, password: String!): Boolean!

    addTask(title: String!, description: String!, status: Status!): ID!

    updateTask(id: ID! title: String, description: String, status: Status): Task!
  }
`;
