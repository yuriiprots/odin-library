const modalForm = document.getElementById("modal__form");

const myLibrary = [];

/* ---------------------- BOOK CLASS ------------------------*/

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}
/* ---------------------- ADD BOOK ------------------------*/
const submitBtn = document.getElementById("submit__btn");

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readCheckbox = document.getElementById("read");
  const read = readCheckbox.checked ? "read" : "not read yet";

  if (title && author && pages) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    modalForm.reset();
    closeModal();
    displayBooks();
  } else {
    alert("Please fill in all the fields");
  }

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
      <h2 class="title">${book.title}</h2>
      <p class="author">by ${book.author}</p>
      <p class="pages">${book.pages} pages</p>
      <p class="read">${book.read}</p>
      <button class="remove">Remove</button>
    </div>`
    );
  });
};
displayBooks();
/* ---------------------- MODAL WINDOW AND OVERLAY ------------------------*/

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn__open-modal");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

openModalBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/* ---------------------- REMOVE BOOK ------------------------*/

const removeBook = (e) => {
  if (e.target.classList.contains("remove")) {
    const id = e.target.parentElement.dataset.id;
    e.target.parentElement.remove();
    myLibrary.splice(id, 1);
    displayBooks();
    console.log(myLibrary);
  }
};

bookContainer.addEventListener("click", (e) => removeBook(e));
