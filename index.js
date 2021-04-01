const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Soon to be science curriculum planner');
});

app.listen(PORT, () => {
  console.log(`Initial server running`);
});
