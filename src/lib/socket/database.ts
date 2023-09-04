import * as sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./database.db', (err)=>{
    if (err) throw err;
    console.log('Connected to database');
});

export function initializeDatabase(){
    createTable();
}

export function createTable(){
    db.run(`CREATE TABLE IF NOT EXISTS userdata (
        id TEXT PRIMARY KEY,
        bots TEXT,
        current TEXT,
        tasks TEXT,
        settings TEXT
    )`);
}

export function setData(id: string, field: string, data: string){
    db.run(`INSERT OR IGNORE INTO userdata (id) VALUES (?);`, [id])
      .run(`UPDATE userdata SET ${field} = ? WHERE id = ?;`, [data, id]);
}

export function getData(id: string, field: string): Promise<string>{
    return new Promise((resolve, reject)=>{
        db.get(`SELECT ${field} FROM userdata WHERE id = ?`, [id], (err, row:{[field:string]: string})=>{
            if (err) reject(err);
            if (row == undefined) {
                resolve("")
                return
            }
            resolve(row[field]);
        });
    });
}

