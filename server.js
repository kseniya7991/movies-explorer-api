const mongoose = require('mongoose');
const app = require('./app');

const { DB, NODE_ENV } = process.env;

const { PORT = 3000 } = process.env;

// подключение к серверу Mongo
async function start() {
  try {
    app.listen(PORT, () => `Server is running on port ${PORT}`);
    await mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviesdb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    // поменять на статус ошибки
    return `Init application error: status 500 ${error}`;
  }
  return null;
}

start();
