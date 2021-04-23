import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unFollowFriend: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.fineUnique({ where: username });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow your friend",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
