import { Pool } from 'pg'

const { DB_HOST, DB_USER, DB_PWD, DB_NAME } = process.env

export const db = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    // port: '5432'
})