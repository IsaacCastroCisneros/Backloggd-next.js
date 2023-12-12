import {createPool} from 'mysql2/promise';

const pool = createPool(
    {
        host:'localhost',
        user:'root',
        password:'root123',
        port:3306,
        database:'backloggd'
    }
)

export default pool