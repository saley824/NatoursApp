const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('succeseeeeeeeeeeeeeeeeeeeeee'));

mongoose.connection.on('error', (err) => {
  console.log(err);
});
const app = require('./app');

// console.log(process.env);
const { port } = process.env;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
