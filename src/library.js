import { loadFromStorage, saveToStorage } from './storage.js';

const mockdataBooks = [
  { id: '1', title: 'Don Quixote', author: 'Miguel de Cervantes', pages: 1072, isRead: false },
  { id: '2', title: 'A Tale of Two Cities', author: 'Charles Dickens', pages: 496, isRead: true },
  { id: '3', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', pages: 1178, isRead: false }, // Often listed as one work, though published as a trilogy
  { id: '4', title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', pages: 96, isRead: true },
  { id: '5', title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', pages: 309, isRead: false },
  { id: '6', title: 'And Then There Were None', author: 'Agatha Christie', pages: 272, isRead: true },
  { id: '7', title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, isRead: false },
  { id: '8', title: '1984', author: 'George Orwell', pages: 328, isRead: true },
  { id: '9', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 180, isRead: false },
  { id: '10', title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281, isRead: true },
];

const MOCK_DATA_INITIALIZED_KEY = 'mockDataInitialized';

export default class Library {
  constructor() {
    this.books = loadFromStorage('books');

    const mockDataInitialized = loadFromStorage(MOCK_DATA_INITIALIZED_KEY);

    if (!mockDataInitialized && (!this.books || this.books.length === 0)) {
      this.books = mockdataBooks;
      saveToStorage('books', this.books);
      saveToStorage(MOCK_DATA_INITIALIZED_KEY, true);
    } else if (!this.books) {
      this.books = [];
    }
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
