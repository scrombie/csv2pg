const fs = require('fs');
const { db } = require('../config');
const { DATA_TYPE_MAP, copyFromCSV, rollbackUpload } = require('../utils/helpers');

const createDataSource = async (filePath, sourceName, schema) => {
  // create Client
  const client = await db.get().connect();

  try{
    await client.query('BEGIN');
    const tempTableName = `${sourceName}_tmp`
    
    // create temporary table with columns from schema
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tempTableName} (         
        ${schema.map(s => `${s.key.toLowerCase()} ${DATA_TYPE_MAP[s.type.toLowerCase()]}`).join(',')}
      );  
    `;
    await client.query(createTableQuery);
    
    // copy csv data into table
    await client.query("SET DATESTYLE to ISO,DMY;");
    await copyFromCSV(client, filePath, tempTableName);  

    // check if table exists, if yes drop
    await client.query(`DROP TABLE IF EXISTS "${sourceName}"; ` )

    // rename temp table

    await client.query(`ALTER TABLE ${tempTableName} RENAME TO ${sourceName};`);

    // create datasource record in ds table [ s_id|ds_table_name|ds_path ]
    // await client.query('INSERT INTO ds (ds_table_name, ds_path) VALUES ($1, $2, $3);', [sourceName, filePath, new Date()]);
    // return response

    await client.query('COMMIT');
    const res = await client.query(`SELECT * FROM ${sourceName}`);
    return res.rows;
  }catch(err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    rollbackUpload(filePath);
    client.release();
    console.log('Done');
  }
}

module.exports = {
  createDataSource
}