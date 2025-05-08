from flask import Flask, request, jsonify, send_from_directory
import os
import sqlite3

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@app.route("/search")
def search():
    query = request.args.get("q", "")
    if not query:
        return jsonify({"error": "Missing 'q' parameter"}), 400

    conn = sqlite3.connect(os.path.join(BASE_DIR, "data/data.db"))
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    sql = """
    SELECT m.*
    FROM card_names f
    JOIN card_data m ON f.rowid = m.id
    WHERE card_names MATCH ? COLLATE NOCASE;
    """
    cur.execute(sql, (f'"{query}"*',))
    results = [dict(row) for row in cur.fetchall()]
    conn.close()

    return jsonify(results)

@app.route('/images/<image_name>')
def get_image(image_name):
    return send_from_directory(os.path.join(BASE_DIR, "data/RenamedPages"), image_name)

if __name__ == '__main__':
    app.run(debug=True)