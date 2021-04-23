import { gql } from "apollo-server";

export default gql`
  type seeFriendRequestResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFriendRequest(username: String!, page: Int): seeFriendRequestResult!
  }
`;
