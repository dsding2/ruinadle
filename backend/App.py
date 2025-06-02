from flask import Flask, request, jsonify, send_from_directory
import os
import sqlite3

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route("/api/cards")
def getAllCards():
    conn = sqlite3.connect(os.path.join(BASE_DIR, "data/data.db"))
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    sql = """
    SELECT m.*
    FROM card_data m
    """
    cur.execute(sql)
    results = [dict(row) for row in cur.fetchall()]
    conn.close()

    return jsonify(results)

@app.route('/images/icons/<path:image_name>')
def serve_icon(image_name):
    print(image_name)
    return send_from_directory(os.path.join(BASE_DIR, "data/icons"), image_name)

@app.route('/images/<image_name>')
def get_image(image_name):
    return send_from_directory(os.path.join(BASE_DIR, "data/images"), image_name)

if __name__ == '__main__':
    app.run(debug=True)