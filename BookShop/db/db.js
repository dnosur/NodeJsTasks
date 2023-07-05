const fs = require("fs");

//Не зашкварно ли так делать? 🤔
const { validateBook } = require("../utils/validator");

const FILE_PATH = "db/database.js";

const getAllBooks = () => {
    let data = fs.readFileSync(FILE_PATH, { encoding: "utf-8", flag: fs.constants.O_CREAT });
    return (data.length > 0) ? JSON.parse(data) : [];
}

const addBook = (book, books) => {

    if (!validateBook()) {
        console.log("Book data is invalid!");
        return;
    }

    book.id = books.length + 1;
    books.push(book);
    fs.writeFileSync(FILE_PATH, JSON.stringify(books));
}

const updateBook = (id, book, books) => {

    if (!validateBook()) {
        console.log("Book data is invalid!");
        return;
    }

    book.id = books[id].id;
    books[id] = book;
    fs.writeFileSync(FILE_PATH, JSON.stringify(books));
}

const deleteBook = (id, books) => {
    books.splice(id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(books));
}

const findBook = (param, books) => {
    return books.filter(book => {
        if (book.title.toLowerCase().indexOf(param.title.toLowerCase()) > -1 ||
            book.description.toLowerCase().indexOf(param.description.toLowerCase()) > -1 ||
            book.author.toLowerCase().indexOf(param.author.toLowerCase()) > -1 ||
            book.year === param.year ||
            book.price === param.price) {
            return book;
        }
    });
}

module.exports = { getAllBooks, addBook, updateBook, deleteBook, findBook }