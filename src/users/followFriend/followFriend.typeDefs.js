import { gql } from "apollo-server";

export default gql`
  type Mutation {
    followFriend(username: String!): MutationResponse
  }
`;
