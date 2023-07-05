const readlineSync = require("readline-sync");

const showBook = (book) => {
    console.log(`\n\n##Book ${book.id}\n`);

    console.log(`${book.title}`);
    console.log(`${book.description}`);
    console.log(`${book.author}`);
    console.log(`${book.year} year`);
    console.log(`${book.price}$`);
}

const showAllBooks = (books) => {
    for (let i = 0; i < books.length; i++) {
        showBook(books[i]);
    }
}

const createBook = () => {
    let book = {
        title: "",
        description: "",
        author: "",
        year: 0,
        price: 0
    }

    book.title = readlineSync.question("Enter a book name: ");
    book.description = readlineSync.question("Enter a book description: ");
    book.author = readlineSync.question("Enter a book author: ");
    book.year = readlineSync.questionInt("Enter a book year: ");
    book.price = readlineSync.questionFloat("Enter a book price: ");
    console.clear();

    return book;
}

module.exports = { readlineSync, showBook, showAllBooks, createBook }