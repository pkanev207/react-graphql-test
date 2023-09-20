import { usersQuery, usersMutation } from "./user.js";
import { kittensQuery, kittensMutation } from "./kittens.js";

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
const Query = { ...usersQuery, ...kittensQuery };
const Mutation = { ...usersMutation, ...kittensMutation };

export { Query, Mutation };
