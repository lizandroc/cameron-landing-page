-- Cameron Cruz landing page — D1 schema

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'contact',   -- 'contact' | 'newsletter' | 'booking'
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  notes TEXT,
  slot_date TEXT NOT NULL,     -- YYYY-MM-DD
  slot_time TEXT NOT NULL,     -- HH:MM (24h)
  status TEXT NOT NULL DEFAULT 'pending',   -- 'pending' | 'confirmed' | 'cancelled'
  zoom_link TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (slot_date, slot_time)
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (slot_date);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts (created_at);
