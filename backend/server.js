const express = require('express');
const app = express();

const parser = require('body-parser');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('BooksDatabase.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the books.sqlite3 database.');
});

// Serve static files from sibling frontend folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.use(parser.json());

app.post('/books/', function(req, res) {
    const book = req.body;

    const sql = `INSERT INTO books(author, title, genre, price) VALUES(?, ?, ?, ?)`;
    const params = [book.author, book.title, book.genre, book.price];

    db.run(sql, params, (error) => {
        if (error) {
            res.status(500);
            res.send({'error': `DB error: ${error.message}`});
        } else {
            res.json({'result': 'OK'});
        }
    });

    console.log('Post request worked.');
});

app.get('/books/:keyword', function(req, res) {
    const keyword = req.params.keyword;
    const sql = `SELECT * FROM books WHERE title LIKE ?`;
    const param = [`%${keyword}%`];

    db.all(sql, param, (error, results) => {
        if (error) {
            res.status(500);
            res.send({'error': `Database error: ${error.message}`});
            console.log(`The response was sent with a 500 error code. Error: ${error.message}`);
        } else {
            if (results.length === 0) {
                res.status(404);
                res.send({'error': 'Resource does not exist.'});
                console.log('The resource does not exist.');
            } else {
                res.json(results);
                console.log('The response was sent successfully. Results:', results);
            }
        }
    });
});

app.listen(3000, function() {
    console.log('Server up and running on port 4000!');

    const query = `CREATE TABLE IF NOT EXISTS books (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        author VARCHAR(25) NOT NULL,
        title VARCHAR(40) NOT NULL,
        genre VARCHAR(20) NOT NULL,
        price FLOAT NOT NULL
    );`;

    db.run(query, (error) => {
        if (error) {
            console.log('Could not create the table.');
        }
    });
});

