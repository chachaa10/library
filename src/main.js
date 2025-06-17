import Book from './book.js';
import Library from './library.js';

const library = new Library();

const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const bookModal = document.getElementById('addBookModal');
const bookForm = document.getElementById('addBookForm');
const booksGrid = document.getElementById('booksGrid');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formIsRead = document.getElementById('isRead');
const errorMsg = document.getElementById('errorMsg');

openModalButton.addEventListener('click', () => {
  resetModal();
  openModal();
});

closeModalButton.addEventListener('click', (event) => {
  event.preventDefault();
  closeModal();
});

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = formTitle.value.trim();
  const author = formAuthor.value.trim();
  const pages = formPages.value;
  const isRead = formIsRead.checked;

  if (!validateFormInput(title, author, pages)) {
    return;
  }

  const book = new Book(title, author, pages, isRead);
  library.addBook(book);
  displayBooks();
  closeModal();
});

function validateFormInput(title, author, pages) {
  if (!title || !author || !pages) {
    errorMsg.textContent = 'Please fill in all fields';
    return false;
  }
  return true;
}

function displayBooks() {
  const books = library.books;

  booksGrid.innerHTML = '';

  books.forEach((book) => {
    const bookCard = document.createElement('li');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <h2 class="book-title">${book.title}</h2>
      <p class="book-author">${book.author}</p>
      <p class="book-pages">${book.pages === '1' ? `${book.pages} page` : `${book.pages} pages`}</p>

      <button class="toggleRead ${book.isRead ? 'read' : 'not-read'}" data-bookId="${book.id}">
      ${book.isRead ? 'Read' : 'Not read'}
      </button>
      <button class="remove-book-btn" data-bookId="${book.id}">Remove</button>
    `;
    booksGrid.appendChild(bookCard);

    const toggleRead = bookCard.querySelector('.toggleRead');
    toggleRead.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-bookId');
      handleToggleRead(bookId);
    });

    const removeBookButton = bookCard.querySelector('.remove-book-btn');
    removeBookButton.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-bookId');
      handleRemoveBook(bookId);
    });
  });
}

function handleRemoveBook(bookId) {
  library.removeBook(bookId);
  displayBooks();
}

function handleToggleRead(bookId) {
  library.toggleRead(bookId);
  displayBooks();
}

// Modal Functions
function openModal() {
  bookModal.showModal();
  // document.body.classList.add('no-scroll');
  // noteModal.classList.remove('hidden');
  // modalTitle.focus();
}

function closeModal() {
  bookModal.close();
  // document.body.classList.remove('no-scroll');
  // noteModal.classList.add('hidden');
}

function resetModal() {
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formIsRead.checked = false;
  errorMsg.textContent = '';
}

displayBooks();
