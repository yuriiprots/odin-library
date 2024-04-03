const form = document.getElementById("form");
const submitBtn = document.getElementById("submit__btn");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

const book1 = new Book("The Hobbit", "Tolkien", 295, "not read yet");
const book2 = new Book("The Fellowship", "Tolkien", 1255, "not read yet");
const book3 = new Book("The Two Towers", "Tolkien", 300, "not read yet");

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readCheckbox = document.getElementById("read");
  const read = readCheckbox.checked ? "read" : "not read yet";

  if (title && author && pages) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    form.reset();
  } else {
    alert("Please fill in all the fields");
  }
  console.log(myLibrary);
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

console.log(myLibrary);
