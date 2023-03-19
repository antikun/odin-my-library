class Book {
    constructor(title, author, pages, dateRead, status, rating) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.dateRead = dateRead;
        this.status = status;
        this.rating = rating;
    }
}

const userInput = {
    title: "",
    author: "",
    pages: "",
    dateRead: "",
    status: "",
    rating: "",
    library: [],

    updateInputs() {
        this.title = document.querySelector("#title").value;
        this.author = document.querySelector("#author").value;
        this.pages = document.querySelector("#pages").value;
        this.dateRead = document.querySelector("#date-read").value;

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
        const { title, author, pages, dateRead, status, rating, library } = this;
        const newBook = new Book(title, author, pages, dateRead, status, rating);
        library.push(newBook);
    }
}

function resetInputs() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(input => {
        input.value = "";
        input.checked = false;
    })
    const labels = document.querySelectorAll(".label-normal");
    labels.forEach(label => label.classList.remove("label-move"));
}

function setEventListeners(e) {
    // INPUT FORM POPUP
    const addBookBtn = document.querySelector(".add-book-btn");

    function toggleDisplay() {
        const formContainer = document.querySelector(".form-container");
        formContainer.classList.toggle("no-display");
    }

    addBookBtn.addEventListener("click", toggleDisplay);

    // TEXT INPUTS

    const form = document.querySelector(".form");
    const textInputs = document.querySelectorAll(".text-input");
    const textInputsArr = [...textInputs];

    function moveLabels(e) {
        if (textInputsArr.includes(e.target)) {
            if (e.target === document.querySelector("#date-read")) {
                e.target.type = "date";
            }
        }
        const formLabels = document.querySelectorAll(".label-normal");
        for (const label of formLabels) {
            if (label === e.target.labels[0]) {
                label.classList.add("label-move");
                break;
            }
        }
    }

    function reverseMoveLabels(e) {
        const formLabels = document.querySelectorAll(".label-normal");
        for (const label of formLabels) {
            if (label === e.target.labels[0]) {
                label.classList.remove("label-move");
            }
        }
    }

    form.addEventListener("focusin", (e) => {
        if (textInputsArr.includes(e.target)) {
            moveLabels(e);
        }
    })

    form.addEventListener("focusout", (e) => {
        if (textInputsArr.includes(e.target)) {
            let found = textInputsArr.find(el => el === e.target);
            if (found.value === "") {
                if (e.target === document.querySelector("#date-read")) {
                    e.target.type = "text";
                }
                reverseMoveLabels(e);
            }
        }
    })

    //SUBMIT BOOK 

    const submitBtn = document.querySelector("#submit-book-btn");
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        userInput.updateInputs();
        userInput.addBookToLibrary();
        resetInputs();
        toggleDisplay();
    })
}


function main() {
    setEventListeners();
}

main();


