from flask import Flask, jsonify, render_template, request, send_file
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sy_sys_usr:sy_sys_pwd@localhost/searchly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db = SQLAlchemy(app)

# Define the Document model
class Document(db.Model):
    tin_number = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    parent_dir = db.Column(db.String(255))
    file_path = db.Column(db.String(255))

    def __repr__(self):
        return f'<Document {self.tin_number}>'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search/<tin_number>')
def search(tin_number):

    print(tin_number)
    document = Document.query.filter_by(tin_number=tin_number).first()
    if not document:
        return "Document not found", 404
    result = {
        "tin_number": document.tin_number,
        "name": document.name,
        "location": document.location,
        "parent_dir": document.parent_dir,
        "file_path": document.file_path
    }

    return jsonify(result)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/pdf/<tin_number>')
def get_pdf(tin_number):
    document = Document.query.filter_by(tin_number=tin_number).first()
    if document:
        return send_file(document.file_path, as_attachment=False)
    else:
        return "Document not found", 404

if __name__ == '__main__':
    app.run(debug=True)