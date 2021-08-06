const { Pool } = require('pg');

// Connects using credentials in environment variables
const pool = new Pool();

const get = () => {
  return pool;
}
const init = () => new Promise(async (resolve, reject) => {
  // testing connection
  const client = await pool.connect();
  try{
    resolve("Connection Successful!");
  }catch (err) {
    reject(err);  
  } finally {
    client.release();    
  }
});

module.exports = {
  get,
  init
};