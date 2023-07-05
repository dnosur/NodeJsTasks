
const { getAllBooks, addBook, updateBook, deleteBook, findBook } = require("./db/db");
const { readlineSync, showBooks, createBook } = require("./utils/menuFunctions");

let books = getAllBooks();

while (true) {
    console.log("1. Add a new book");
    console.log("2. View list of books");
    console.log("3. Update existed book");
    console.log("4. Delete a book");
    console.log("5. Find a book");
    console.log("0. Exit");

    let action = readlineSync.questionInt(": ");
    console.clear();

    if (!action) break;

    if (action === 1) {
        addBook(createBook(), books);
    }

    if (action === 2) {
        showBooks(books)

        readlineSync.question("");
        console.clear();
    }

    if (action === 3) {
        showBooks(books)

        let id = readlineSync.questionInt("Enter book id to change: ");
        console.clear();

        id--;

        if(id >= books.length){
            console.log("Id is incorrect!");
            continue;
        }

        console.log("Old book data\n");
        showBooks(books[id]);

        updateBook(id, createBook(), books);
    }

    if(action === 4){
        showBooks(books)

        let id = readlineSync.questionInt("Enter book id to delete: ");
        console.clear();

        id--;

        if(id >= books.length){
            console.log("Id is incorrect!");
            continue;
        }

        deleteBook(id, books);
    }

    if(action === 5){
        const result = findBook(createBook(), books);
        showBooks(result);
    }
}