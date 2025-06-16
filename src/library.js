import { loadFromStorage, saveToStorage } from './storage.js';
export default class Library {
  constructor() {
    this.books = loadFromStorage('books') || [];
  }

  addBook(book) {
    this.books.push(book);
    saveToStorage('books', this.books);
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    saveToStorage('books', this.books);
  }

  toggleRead(id) {
    const book = this.books.find((book) => book.id === id);
    book.isRead = !book.isRead;

    saveToStorage('books', this.books);
  }
}
