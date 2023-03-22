class Book {
    constructor(title, author, pages, dateRead, status, rating) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.dateRead = dateRead;
        this.status = status;
        this.rating = rating;
        this.id = this.generateId();
    }
    generateId() {
        return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36);
    }
}

const userInput = {
    title: "",
    author: "",
    pages: "",
    dateRead: "",
    status: "",
    rating: "",
    bookId: "",
    isEmpty: true,
    library: [],

    resetUserData() {
        let { title, author, pages, dateRead, status, rating, bookId } = this;
        title = "";
        author = "";
        pages = "";
        dateRead = "";
        status = "";
        rating = "";
        bookId = "";
    },

    updateInputs() {
        this.title = document.querySelector("#title").value;
        this.author = document.querySelector("#author").value;
        this.pages = document.querySelector("#pages").value;

        const dateInput = document.querySelector("#date-read");
        if (dateInput.value === "") {
            this.dateRead = "not set"
        } else {
            this.dateRead = new Date(dateInput.value).toLocaleDateString();
        }

        const statusBtns = document.querySelectorAll(".status-btn");
        for (const statusBtn of statusBtns) {
            if (statusBtn.checked) {
                this.status = statusBtn.value;
            }
        }

        const ratingBtns = document.querySelectorAll(".rating-btn");
        for (const ratingBtn of ratingBtns) {
            if (ratingBtn.checked) {
                this.rating = ratingBtn.value;
            }
        }
    },

    addBookToLibrary() {
        const { title, author, pages, dateRead, status, rating, library } = this;
        const newBook = new Book(title, author, pages, dateRead, status, rating);
        this.bookId = newBook.id;
        library.push(newBook);
    },

    addBookToCard() {
        const htmlMarkup = `
            <h3>"<span class="card-title">${this.title}</span>"</h3>
            <p><span>by</span><span class="card-author">${this.author}</span></p>
            <ul>
                <li>Rated at: <span class="card-data card-rating">${this.rating}</span></li>
                <li>Total of <span class="card-data card-pages">${this.pages} pages</span></li>
                <li>Status: <span class="card-data card-status">${this.status}</span></li>
                <li>Date read: <span class="card-data card-date">${this.dateRead}</span></li>
            </ul>
            <button class="primary-btn remove-book-btn">Remove book</button>
        `;
        return htmlMarkup;
    },

    appendBookToDOM() {
        const bookGrid = document.querySelector(".book-cards-container");
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.dataset.bookId = this.bookId;
        newCard.innerHTML = this.addBookToCard();
        bookGrid.append(newCard);
    },

    removeBookFromLibrary(idnum) {
        const isCorrectBook = (element) => element.id === idnum;
        const found = this.library.findIndex(isCorrectBook);
        this.library.splice(found, 1);
    }
}

function checkRequiredFields() {
    const radioLegend = document.querySelector(".radio-legend");
    const generalLegend = document.querySelector(".general-legend");
    const textInputs = document.querySelectorAll(".required-text");
    const radioInputs = [...document.querySelectorAll(".required-radio")];
    const checked = (element) => element.checked === true;

    const emptyFields = [];

    // reset everything
    userInput.isEmpty = true;
    textInputs.forEach(input => input.labels[0].classList.remove("alert"));
    generalLegend.classList.remove("alert");
    radioLegend.classList.remove("alert");

    // evaluate
    textInputs.forEach(input => {
        if (input.value === "") {
            emptyFields.push(input);
        }
    })

    if (emptyFields.length === 0 && radioInputs.some(checked)) {
        userInput.isEmpty = false;
        return;
    }

    emptyFields.forEach((field, index) => {
        if (index === 0) {
            field.focus();
        }
        field.labels[0].classList.add("alert");
        generalLegend.classList.add("alert");
    })

    if (!radioInputs.some(checked)) {
        radioLegend.classList.add("alert");
        generalLegend.classList.add("alert");
    }

    emptyFields.splice(0, emptyFields.length);
}

function resetInputs() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(input => {
        if (input.type === "radio") {
            input.checked = false;
        } else {
            input.value = "";
        }

    })
    const labels = document.querySelectorAll(".label-normal");
    labels.forEach(label => label.classList.remove("label-move"));
    const dateRead = document.querySelector("#date-read");
    dateRead.type = "text";
}

// EVENT LISTENERS

function setEventListeners(e) {
    // INPUT FORM POPUP
    const addBookBtn = document.querySelector(".add-book-btn");

    function toggleDisplay() {
        const formContainer = document.querySelector(".form-container");
        formContainer.classList.toggle("no-display");
    }

    addBookBtn.addEventListener("click", toggleDisplay);

    // INPUT FORM CLOSE

    const formCloseBtn = document.querySelector(".close-form-btn");
    formCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDisplay();
        resetInputs();
    })

    // TEXT INPUTS

    const form = document.querySelector(".form");
    const textInputs = document.querySelectorAll(".text-input");
    const textInputsArr = [...textInputs];
    const formLabels = document.querySelectorAll(".label-normal");

    function moveLabels(e) {
        if (textInputsArr.includes(e.target)) {
            if (e.target === document.querySelector("#date-read")) {
                e.target.type = "date";
            }
        }
        for (const label of formLabels) {
            if (label === e.target.labels[0]) {
                label.classList.add("label-move");
                break;
            }
        }
    }

    function reverseMoveLabels(e) {
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

    // update label color if inputs are filled
    form.addEventListener("change", checkRequiredFields)

    //SUBMIT BOOK 

    const submitBtn = document.querySelector("#submit-book-btn");
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkRequiredFields();
        if (userInput.isEmpty === true) {
            return;
        }
        userInput.updateInputs();
        userInput.addBookToLibrary();
        userInput.addBookToCard();
        userInput.appendBookToDOM();
        resetInputs();
        toggleDisplay();
        userInput.resetUserData();
    })

    // REMOVE CARD FROM DOM AND BOOK FROM LIBRARY

    const bookContainer = document.querySelector(".book-cards-container");
    bookContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-book-btn")) {
            e.preventDefault();
            const idnum = e.target.parentNode.dataset.bookId;
            userInput.removeBookFromLibrary(idnum);
            e.target.parentNode.remove();
        } else {
            return;
        }
    })
}


function main() {
    setEventListeners();
}

main();


