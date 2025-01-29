import express from 'express';

const app = express();
const port = 5000;

app.listen(port, () => {
  console.log('DevTest API is running on port ' + port);
});
