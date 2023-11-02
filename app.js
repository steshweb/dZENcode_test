const express = require('express');
const messagesRouter = require('./routes/messages.js');


const app = express();
const port = 3000;
app.use(express.json());

app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});