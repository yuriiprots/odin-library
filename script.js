const modalForm = document.getElementById("modal__form");

let myLibrary = [];

/* ---------------------- BOOK CLASS ------------------------*/

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };

  this.toggleRead = () => {
    this.read = this.read === "Read" ? "Not read" : "Read";
  };
}
/* ---------------------- ADD BOOK ------------------------*/
const submitBtn = document.getElementById("submit__btn");

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readCheckbox = document.getElementById("read");
  console.log(readCheckbox);
  const read = readCheckbox.checked ? "Read" : "Not read";

  if (title && author && pages) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    modalForm.reset();
    closeModal();
    displayBooks();
  } else {
    alert("Please fill in all the fields");
  }
  saveLibraryToLocalStorage();
  console.log(myLibrary);
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

/* ---------------------- DISPLAY BOOKS ------------------------*/
const bookContainer = document.querySelector(".books__container");

const displayBooks = () => {
  bookContainer.innerHTML = "";
  myLibrary.forEach((book, index) => {
    bookContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="book-card" data-id="${index}">
      <h2 class="book-card__title">${book.title}</h2>
      <p class="book-card__author">by ${book.author}</p>
      <p class="book-card__pages">${book.pages} pages</p>
      <button class="btn book-card__read-btn-${
        book.read === "Read" ? "green" : "red"
      }">${book.read}</button>
      <button class="btn book-card__remove-btn">Remove</button>
    </div>`
    );
  });
};
displayBooks();
/* ---------------------- MODAL WINDOW AND OVERLAY ------------------------*/

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const addBookBtn = document.querySelector(".btn__add-book");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

addBookBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/* ---------------------- REMOVE BOOK ------------------------*/

const removeBookFromLibrary = (e) => {
  if (e.target.classList.contains("book-card__remove-btn")) {
    const id = e.target.parentElement.dataset.id;
    e.target.parentElement.remove();
    myLibrary.splice(id, 1);
    displayBooks();
    console.log(myLibrary);
    saveLibraryToLocalStorage();
  }
};

bookContainer.addEventListener("click", (e) => removeBookFromLibrary(e));

/* ---------------------- MARK READ OR UNREAD STATUS BOOK------------------------*/

const toggleReadBtn = (e) => {
  if (
    e.target.classList.contains("book-card__read-btn-red") ||
    e.target.classList.contains("book-card__read-btn-green")
  ) {
    const id = e.target.parentElement.dataset.id;
    console.log(id);
    console.log(myLibrary[id]);
    myLibrary[id].toggleRead();

    e.target.classList.toggle(
      "book-card__read-btn-red",
      myLibrary[id].read !== "Read"
    );
    e.target.classList.toggle(
      "book-card__read-btn-green",
      myLibrary[id].read === "Read"
    );

    displayBooks();
    console.log(myLibrary);
    saveLibraryToLocalStorage();
  }
};

bookContainer.addEventListener("click", (e) => toggleReadBtn(e));

/* ---------------------- LOCAL STORAGE ------------------------*/
const saveLibraryToLocalStorage = () => {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

const retrieveLibraryFromLocalStorage = () => {
  const storedLibrary = localStorage.getItem("myLibrary");
  console.log(storedLibrary);
  if (storedLibrary) {
    const storedBooks = JSON.parse(storedLibrary);
    console.log(storedBooks);
    myLibrary = storedBooks.map(
      ({ title, author, pages, read }) => new Book(title, author, pages, read)
    );
    console.log(myLibrary);
    displayBooks();
  }
};

window.addEventListener("load", retrieveLibraryFromLocalStorage);
