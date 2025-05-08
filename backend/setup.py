# setup_db.py
import sqlite3
import pandas as pd
import json
import os
# Load CSV
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

df = pd.read_csv(os.path.join(BASE_DIR, "data/parsed.txt"))

# Create DB and FTS5 table
conn = sqlite3.connect(os.path.join(BASE_DIR, "data/data.db"))
c = conn.cursor()

# Drop and re-create FTS table
c.execute("DROP TABLE IF EXISTS card_data")
c.execute("DROP TABLE IF EXISTS card_names")

c.execute('''
CREATE TABLE card_data (
    id INTEGER PRIMARY KEY,
    name TEXT,
    artwork TEXT,
    description TEXT,
    keywords TEXT,
    chapter INTEGER,
    dice TEXT,
    range TEXT,
    rarity TEXT,
    cost INTEGER
);
''')
c.execute('''
CREATE VIRTUAL TABLE card_names USING fts5(
    name,
    content='card_data',
    content_rowid='id'
);
''')

# Maintain consistency (only supports insertions)
c.execute('''
CREATE TRIGGER card_ai AFTER INSERT ON card_data BEGIN
    INSERT INTO card_names(rowid, name) VALUES (new.id, new.name);
END; 
''')

# Insert data
for _, row in df.iterrows():
    c.execute("INSERT INTO card_data (id, name, artwork, description, keywords, chapter, dice, range, rarity, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
              (row['ID'], row['LocalizedName'], row['Artwork'], row['Ability'], json.dumps(row['Keywords']), int(row['Chapter']), json.dumps(row['BehaviourList']), row['Spec_Range'], row['Rarity'], int(row['Spec_Cost'])))

conn.commit()
conn.close()
