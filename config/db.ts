import {createPool} from 'mysql2/promise';

const pool = createPool(
    {
        host:'junction.proxy.rlwy.ne',
        user:'root',
        password:'UaRFWktUQCjmrrmDhIVtyPnIujBzOwlG',
        port:24065,
        database:'railway'
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