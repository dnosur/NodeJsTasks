const readlineSync = require("readline-sync");

const showBooks = (books) => {
    console.table(books);
}

const createBook = () => {
    let book = {
        title: readlineSync.question("Enter a book name: "),
        description: readlineSync.question("Enter a book description: "),
        author: readlineSync.question("Enter a book author: "),
        year: readlineSync.questionInt("Enter a book year: "),
        price: readlineSync.questionFloat("Enter a book price: ")
    }
    
    console.clear();

    return book;
}

module.exports = { readlineSync, showBooks, createBook }