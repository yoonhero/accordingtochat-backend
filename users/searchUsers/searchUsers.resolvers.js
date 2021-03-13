import client from "../../client";

export default {
    Query: {
        searchUsers: async (_, { keyword }) => {
            const users = await client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
                take: 10,
            });
            return users;
        },
    },
}