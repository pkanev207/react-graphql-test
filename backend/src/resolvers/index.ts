import { usersQuery, usersMutation } from "./user.ts";
import { kittensQuery, kittensMutation } from "./kittens.ts";

const Query = { ...usersQuery, ...kittensQuery };
const Mutation = { ...usersMutation, ...kittensMutation };

export { Query, Mutation };

// const UserQuery = {
//   Query: {
//     ...usersQuery,
//   },
//   Mutation: {
//     ...usersMutation,
//   },
// };

// const KittenQuery = {
//   Query: {
//     ...kittensQuery,
//   },
//   Mutation: {
//     ...kittensMutation,
//   },
// };

// export default { ...UserQuery, ...KittenQuery };
// export default {
//   Query: { ...usersQuery, ...kittensQuery },
//   Mutation: { ...usersMutation, ...kittensMutation },
// };
