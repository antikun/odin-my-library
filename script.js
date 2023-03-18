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
        for (const radioBtn of radioBtns) {
            if (radioBtn.checked) {
                this.status = radioBtn.value;
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
        document.querySelector(".form-container").classList.toggle("no-display");
        addBookBtn.classList.toggle("no-display");
    }

    addBookBtn.addEventListener("click", toggleDisplay);

    //SUBMIT BOOK 

    document.querySelector("#submit-book-btn").addEventListener("click", (e) => {
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


