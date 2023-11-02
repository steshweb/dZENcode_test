const { Pool } = require('pg');

const dbConfig = {
  user: 'tbamhowh',
  host: 'flora.db.elephantsql.com',
  database: 'tbamhowh',
  password: 'vDfqiIIqjAUJwoeWFlAZV8UsXg7kN6On',
  port: 5432,
}; 

const pool = new Pool(dbConfig);

const addMessage = async (req, res) => {
  const { user_name, message, email, parent_id, password, captcha, home_page } = req.body;

  try {
    const insertQuery = 'INSERT INTO messages (user_name, email, password, parent_id, message, captcha, home_page) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const insertedData = await pool.query(insertQuery, [user_name, email, password, parent_id, message, captcha, home_page]);

    const createdMessage = insertedData.rows[0];

    res.json(createdMessage);
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = addMessage;
