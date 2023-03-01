const { Pool } = require('pg');

const PG_URI = 'postgres://goaokvzv:uDRe6r06P-_xgJ_E3UudAXGp1FxUrlUW@mahmud.db.elephantsql.com/goaokvzv';


const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
