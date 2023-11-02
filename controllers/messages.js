const pgp = require('pg-promise')();

const dbConfig = {
  connectionString: 'postgres://tbamhowh:vDfqiIIqjAUJwoeWFlAZV8UsXg7kN6On@flora.db.elephantsql.com/tbamhowh',
};

const db = pgp(dbConfig);

const addMessage = async (req, res) => {
  const { user_name, message, email, parent_id, password, captcha, home_page } = req.body;

  try {
    const insertQuery = 'INSERT INTO messages (user_name, email, password, parent_id, message, captcha, home_page) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const insertedData = await db.one(insertQuery, [user_name, email, password, parent_id, message, captcha, home_page]);

    res.json({ message: 'Message created successfully', insertedData });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = addMessage;