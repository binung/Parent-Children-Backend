const db = require('../config/db');

const createUser = async (username, email, password) => {
  const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const findChildren = async (id) => {
  const parentID = Number(id);
  const [parent_email] = await db.query('SELECT email FROM users WHERE id = ?', [parentID]);
  const [rows] = await db.query('SELECT * FROM users WHERE parent_email = ?', [parent_email[0].email]);
  return rows;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findChildren
};
