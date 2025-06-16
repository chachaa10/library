export default class Book {
  constructor(title = 'Unknown', author = 'Unknown', pages = 0, isRead = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}
