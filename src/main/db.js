import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'

const db = new Database(join(app.getPath('userData'), 'quotes.db'))

db.prepare(
  'CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT, tag TEXT)'
).run()

const getQuoteFromTag = (tag) => {
  return db.prepare('SELECT * from quote WHERE tag = ?').get(tag)
}

const getQuoteFromId = (id) => {
  return db.prepare('SELECT * FROM quotes WHERE id = ?').get(id)
}

const getAllQuotes = () => {
  return db.prepare('SELECT * FROM quotes').all()
}

const getRandomQuote = () => {
  return db.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1').get()
}

const createQuote = (title, body, tag) => {
  db.prepare('INSERT INTO quotes (title, body, tag) VALUES (?, ?, ?)').run(title, body, tag)
}

const deleteQuote = (id) => {
  db.prepare('DELETE FROM quotes WHERE id = ?').run(id)
}

export {
  db,
  getQuoteFromTag,
  getQuoteFromId,
  createQuote,
  getAllQuotes,
  deleteQuote,
  getRandomQuote
}
