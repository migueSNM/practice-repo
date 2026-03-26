// const users = [
//   { name: 'Ana', role: 'admin' },
//   { name: 'Bob', role: 'user' },
//   { name: 'Cal', role: 'admin' },
// ]
// groupBy(users, 'role')
// → { admin: [{...}, {...}], user: [{...}] }

/**
 * 
{admin: {user1}}
{admin: {user1}, user: {user2}}
{admin: {user1, user3}, user: {user2}}

 */
// const groupBy = (input, key) => {
//   return input.reduce((acc, cur) => {
//     let newValue = [];
//     console.log('cur', cur, 'acc', acc)
//     if (cur[key] in acc) {
//       newValue = acc[cur[key]].concat(cur);
//     } else {
//       newValue = [cur];
//     }
//     return { ...acc, [cur[key]]: newValue };
//   }, {});
// };

const groupBy = (input, key) => {
  return input.reduce((acc, cur) => {
    const group = cur[key]
    acc[group] = acc[group] ? acc[group].concat(cur) : [cur]
    return acc
  }, {})

};

const users = [
  { name: "Ana", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Cal", role: "admin" },
];

const output = groupBy(users, "role");

console.log("output", output);
