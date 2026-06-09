import { app } from 'electron'
import { join } from 'path'
import { existsSync, copyFileSync } from 'fs'
import Database from 'better-sqlite3'

const userDbPath = join(app.getPath('userData'), 'quotes.db')

const seedDbPath = app.isPackaged
  ? join(process.resourcesPath, 'seed.db') // production
  : join(__dirname, '../../resources/seed.db') // development

if (!existsSync(userDbPath)) {
  console.log(true)
  console.log(seedDbPath, userDbPath)
  copyFileSync(seedDbPath, userDbPath)
}

const db = new Database(userDbPath)

db.prepare(
  'CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT, tag TEXT)'
).run()
db.pragma('journal_mode = WAL')

const getQuoteFromTag = (tag) => {
  return db.prepare('SELECT * from quote WHERE tag = ?').get(tag)
}

const getQuoteFromId = (id) => {
  return db.prepare('SELECT * FROM quotes WHERE id = ?').get(id)
}

const getAllQuotes = () => {
  return db.prepare('SELECT * FROM quotes').all()
}

const createQuote = (title, body, tag) => {
  db.prepare('INSERT INTO quotes (title, body, tag) VALUES (?, ?, ?)').run(title, body, tag)
}

const deleteQuote = (id) => {
  db.prepare('DELETE FROM quotes WHERE id = ?').run(id)
}

export { db, getQuoteFromTag, getQuoteFromId, createQuote, getAllQuotes, deleteQuote }
