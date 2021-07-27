const app = require('./app');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

//подключение к серверу Mongo
async function start() {
  try{
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
    });
    await mongoose.connect('mongodb://localhost:27017/moviesdb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch(error) {
    //поменять на статус ошибки
    return `Init application error: status 500 ${error}`;
  }
  return null;
}

start();
