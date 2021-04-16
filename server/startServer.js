
const app = require("./mongoCaller.js");
server =app.listen(8080, () => {
  console.log("Server has started!");
});
// module.exports = server;