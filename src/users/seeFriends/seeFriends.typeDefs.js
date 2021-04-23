import { gql } from "apollo-server";

export default gql`
  type seeFriendsResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFriends(username: String!, page: Int!): seeFriendsResult
  }
`;
