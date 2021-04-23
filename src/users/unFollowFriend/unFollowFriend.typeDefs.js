import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unFollowFriend(username: String!): MutationResponse
  }
`;
