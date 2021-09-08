const app = require("./mongoCaller.js");

const PORT = process.env.PORT || 8080;


server =app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// module.exports = server;