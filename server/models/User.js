import { pool } from '../helper/db.js' 

const createUser = async (email, hashedPassword) => {
  return await pool.query(
    'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword],
  )
}

const findUserByEmail = async (email) => {
  return await pool.query(
    'SELECT id, email, password FROM account WHERE email = $1',
    [email],
  )
}

export { createUser, findUserByEmail }