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

console.log(book1.info());