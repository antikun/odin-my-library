class Book {
    constructor(title, author, pages, status, rating) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.rating = rating;
    }
}

const userInput = {
    title: '',
    author: '',
    pages: '',
    status: '',
    rating: '',
    library: [],

    addBookToLibrary() {
        const { title, author, pages, status, rating, library } = this;
        const newBook = new Book(title, author, pages, status, rating);
        library.push(newBook);
    }
}


