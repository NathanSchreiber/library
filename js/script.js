const container = document.getElementById('container');
const bookList = document.querySelector('.book-list');
const newBookButton = document.getElementById('new-book-button');
const form = document.getElementById('form');
const submit = document.getElementById('submit');

const bookForm = document.createElement('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

let myLibrary = [
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        pages: 320,
        read: "Read"
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        pages: 251,
        read: "Not Read"
    }
];

// Object Constructor for books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Adds info function to objects created with constructor
Object.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

// Puts form elements onto page
newBookButton.addEventListener('click', (e) => {
    form.style.display = "block";
});

// Takes user inputs from form when submit button is pressed
submit.addEventListener('click', (e) => {
    let bookTitle = titleInput.value;
    let bookAuthor = authorInput.value;
    let bookPages = pagesInput.value;
    let bookRead = readInput.value;
    if (bookTitle == "" || bookAuthor == "" || bookPages == "" || bookRead == "") {
        
    } else {
        addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    }
    displayBooks();
    resetForm();
});

// Adds entered book to myLibrary array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

// Puts book info onto page
function displayBooks() {
    bookList.textContent = "";
    myLibrary.forEach((book, i) => {
        let newestEntry = document.createElement('li')
        newestEntry.textContent = book.info();
        newestEntry.setAttribute('data-index', i);
        bookList.appendChild(newestEntry);

        // Create read button with data-index
        let readButton = document.createElement('button');
        readButton.classList.add("read-button");
        readButton.textContent = "Read Status";
        readButton.setAttribute('data-index', i);
        bookList.appendChild(readButton);

        // Create delete button with data-index
        let deleteButton = document.createElement('button');
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "X";
        deleteButton.setAttribute('data-index', i);
        bookList.appendChild(deleteButton);

        // Delete book that is connected to button clicked
        deleteButton.addEventListener('click', (e) => {
            buttonNumber = deleteButton.getAttribute('data-index');
            if (deleteButton.getAttribute('data-index') ===         newestEntry.getAttribute('data-index')) {
                myLibrary.splice(buttonNumber, 1);
            };
            console.log(buttonNumber);
            console.log(myLibrary);
            displayBooks();
        });

        // Change read status depending on current status
        readButton.addEventListener('click', (e) => {
            buttonNumber = readButton.getAttribute('data-index');
            if (readButton.getAttribute('data-index') === newestEntry.getAttribute('data-index')) {
                if (myLibrary[buttonNumber].read === "Read") {
                    myLibrary[buttonNumber].read = "Not Read";
                } else if (myLibrary[buttonNumber].read === "Not Read") {
                    myLibrary[buttonNumber].read = "Read";
                };
            };
            displayBooks();
        });
    })
};

// Resets form to default styles
function resetForm() {
    form.reset();
    form.style.display = "none";
};