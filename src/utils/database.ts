import {Pool} from 'pg';

let conn: any;

if(!conn){
    conn = new Pool({
        user: 'postgres',
        password: 'Creagh123*',
        host: 'localhost',
        port: 5432,
        database: 'task_bd'
    })
}

export{conn};

