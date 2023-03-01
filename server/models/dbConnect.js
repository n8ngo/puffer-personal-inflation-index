const { Pool } = require('pg');
require("dotenv").config();
console.log('env', process.env.PG_URI_LINK)
// const PG_URI = 'postgres://goaokvzv:uDRe6r06P-_xgJ_E3UudAXGp1FxUrlUW@mahmud.db.elephantsql.com/goaokvzv';
const PG_URI = process.env.PG_URI_LINK;


const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
