📚 Book Catalog Web App

A full-stack web application that allows users to add and search for books stored in a local SQLite database.
🔧 Tech Stack

    Backend: Node.js, Express, SQLite

    Frontend: HTML, CSS, JavaScript

✨ Features

    ✅ Add a book (title, author, genre, price)

    ✅ Search for books by title

    ✅ Stores data in a local SQLite database

    ✅ Input validation and error handling

🚀 Getting Started

Run the following commands in your terminal:

git clone https://github.com/ChristosLizos/book-catalog-web-app.git
cd book-catalog-web-app/backend
npm install
npm start

Then open your browser and go to:

http://localhost:3000/books
📁 Project Structure

book-catalog-web-app/
├── backend/            # Node.js server
│   ├── server.js       # Main backend logic
│   └── package.json    # Backend dependencies
├── front_end/          # Frontend HTML, CSS, and JS
├── README.md           # Project documentation

💡 Notes

    The app creates a SQLite database (BooksDatabase.sqlite3) and the books table automatically on startup.

    The server serves static files from front_end/.

    If port 3000 is already in use, edit server.js to use a different port.

📜 License

MIT © Christos Lizos
