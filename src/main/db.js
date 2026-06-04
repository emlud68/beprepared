import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'

const db = new Database(join(app.getPath('userData'), 'quotes.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT
  )
`)

export default db
