import { app } from 'electron'
import { join } from 'path'
import { existsSync, copyFileSync } from 'fs'
import Database from 'better-sqlite3'

const userDbPath = join(app.getPath('userData'), 'quotes.db')

const seedDbPath = app.isPackaged
  ? join(process.resourcesPath, 'seed.db') // production
  : join(__dirname, '../../resources/seed.db') // development

if (!existsSync(userDbPath)) {
  copyFileSync(seedDbPath, userDbPath)
}

const db = new Database(userDbPath)

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
  // For now, directly filter queries to user quotes
  return db.prepare("SELECT * FROM quotes WHERE tag = 'your'").all()
}

const getRandomQuote = (filterPreference) => {
  const activeTags = Object.entries(filterPreference)
    .filter(([_, isActive]) => isActive)
    .map(([tag]) => tag)

  if (activeTags.length === 0) return null

  const placeholders = activeTags.map(() => '?').join(', ')

  const stmt = db.prepare(
    `SELECT * FROM quotes WHERE tag IN (${placeholders}) ORDER BY RANDOM() LIMIT 1`
  )
  return stmt.get(...activeTags)
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
