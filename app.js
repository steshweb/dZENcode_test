require("dotenv").config();
const express = require('express');
const commentRouter = require('./routers/commentRouter');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/storage', express.static('storage'));


app.use('/api', commentRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({ message: message })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
