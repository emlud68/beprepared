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

// Run on every launch after first install
function syncSeedQuotes() {
  const currentVersion = app.getVersion()

  // Read what version we last synced
  db.prepare('CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)').run()

  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get('lastSyncedVersion')
  const lastSyncedVersion = row?.value ?? null

  // Skip if we already synced this version
  if (lastSyncedVersion === currentVersion) return

  // Open seed db and pull all non-'your' quotes
  const seedDb = new Database(seedDbPath, { readonly: true })
  const seedQuotes = seedDb
    .prepare(
      `
    SELECT * FROM quotes WHERE tag != 'your'
  `
    )
    .all()
  seedDb.close()

  // Delete old seeded quotes (non-'your') and replace with new ones
  db.prepare(`DELETE FROM quotes WHERE tag != 'your'`).run()

  const insert = db.prepare(`
    INSERT INTO quotes (title, body, tag) VALUES (?, ?, ?)
  `)

  const insertMany = db.transaction((quotes) => {
    for (const quote of quotes) {
      insert.run(quote.title, quote.body, quote.tag)
    }
  })

  insertMany(seedQuotes)

  // Remember we synced this version
  db.prepare(
    `
    INSERT OR REPLACE INTO meta (key, value) VALUES ('lastSyncedVersion', ?)
  `
  ).run(currentVersion)
}

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
  getRandomQuote,
  syncSeedQuotes
}
