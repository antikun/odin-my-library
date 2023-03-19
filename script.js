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

        const statusBtns = document.querySelectorAll(".status-btn");
        for (const statusBtn of statusBtns) {
            if (statusBtn.checked) {
                this.status = statusBtn.value;
                break;
            }
        }

        const ratingBtns = document.querySelectorAll(".rating-btn");
        for (const ratingBtn of ratingBtns) {
            if (ratingBtn.checked) {
                this.rating = ratingBtn.value;
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
    // INPUT FORM POPUP
    const addBookBtn = document.querySelector(".add-book-btn");

    function toggleDisplay() {
        const formContainer = document.querySelector(".form-container");
        formContainer.classList.toggle("no-display");
    }

    addBookBtn.addEventListener("click", toggleDisplay);

    //SUBMIT BOOK 

    const submitBtn = document.querySelector("#submit-book-btn");
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        userInput.update();
        userInput.addBookToLibrary();
        toggleDisplay();
    })
}

function main() {
    setEventListeners();
}

main();


