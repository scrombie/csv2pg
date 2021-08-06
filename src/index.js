const dotenv = require('dotenv');
const config = require('./config');
const app = require('./app');

dotenv.config();

let server;

config.db.init().then((msg) => {  
  console.log(msg);
  server = app.listen(process.env.PORT, () => {
    console.log(`app running on port ${process.env.PORT}`);
  })
})