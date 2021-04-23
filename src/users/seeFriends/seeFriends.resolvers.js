import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFriends: protectedResolver(async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist.",
        };
      }
      const friends = await client.user
        .findUnique({
          where: { username },
        })
        .followers({
          take: 10,
          skip: (page - 1) * 10,
        });
      return {
        ok: true,
        followers: friends,
      };
    }),
  },
};
