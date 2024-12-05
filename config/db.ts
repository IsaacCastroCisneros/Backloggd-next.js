import {createPool} from 'mysql2/promise';

const host = process.env.DB_HOST 
const user = process.env.DB_USER 
const password=process.env.DB_PASSWORD 
const port =Number(process.env.DB_PORT) 
const database= process.env.DB_DATABASE 


const pool = createPool(
    {
        host,
        user,
        password,
        port,
        database,
    }
)

/* const pool = createPool(
    {
        host:'localhost',
        user:'root',
        password:'root123',
        port:3306,
        database:'backloggd'
    }
) */

export default pool