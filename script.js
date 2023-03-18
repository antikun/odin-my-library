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
    title: "",
    author: "",
    pages: "",
    status: "",
    rating: "",
    library: [],

    update() {
        this.title = document.querySelector("#title").value;
        this.author = document.querySelector("#author").value;
        this.pages = document.querySelector("#pages").value;
        this.rating = document.querySelector("#rating").value;

        const radioBtns = document.querySelectorAll(".status-btn");
        for (let i = 0; i < radioBtns.length; i++) {
            if (radioBtns[i].checked) {
                this.status = radioBtns[i].labels[i].textContent;
                break;
            }
        }
    },

    addBookToLibrary() {
        const { title, author, pages, status, rating, library } = this;
        const newBook = new Book(title, author, pages, status, rating);
        library.push(newBook);
    }
}

function setEventListeners(e) {
    document.querySelector("#submit-book-btn").addEventListener("click", (e) => {
        e.preventDefault();
        userInput.update();
        userInput.addBookToLibrary();
    })
}

function main() {
    setEventListeners();
}

main();


