import client from "../../client";

export default {
  Query: {
    seeFriendRequest: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          take: 20,
          skip: page ? 1 : 0,
          ...(page && { cursor: { id: page } }),
        });
      console.log(following);
      return {
        ok: true,
        following,
      };
    },
  },
};
