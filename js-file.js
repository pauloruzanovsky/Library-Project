let myLibrary = [];
const library = document.querySelector('#library');
const newBookButton = document.querySelector('#new-book-button');
const formCard = document.querySelector('.form-card');
const overlay = document.querySelector('.overlay');
const submitButton = document.querySelector('#submit-form');


class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// placeholder books
let book1 = new Book('Harry Potter and the Goblet of Fire', 'J. K. Rowling', 636,'Not Read')
let book2 = new Book('The Fellowship of the Ring','J. R. R. Tolkien',423,'Read')
let book3 = new Book('The Shining','Stephen King',447,'Not Read')
myLibrary.push(book1, book2, book3);

// Opens the form when user clicks the 'new book' button
function openForm() {
  formCard.classList.add('active');
  overlay.classList.add('active');
} 
newBookButton.addEventListener('click',openForm);

// Closes the form if ESC or mouse click on overlay
function closeForm() {
  formCard.classList.remove('active');
  overlay.classList.remove('active');
}
overlay.addEventListener('click', closeForm);
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeForm();
  }
})

/*This for loop creates elements for each book object in myLibrary array*/
function createLibrary() {
  for(let i=0; i < myLibrary.length; i++ ) {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    bookContainer.setAttribute('book-index',i);

    const bookTitle = document.createElement('div');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = myLibrary[i].title;
    bookContainer.appendChild(bookTitle);

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = myLibrary[i].author;
    bookContainer.appendChild(bookAuthor);

    const bookPages = document.createElement('div');
    bookPages.classList.add('book-pages');
    bookPages.textContent = myLibrary[i].pages + ' pages';
    bookContainer.appendChild(bookPages);

    const bookRead = document.createElement('button');
    bookRead.classList.add('book-read');
    bookRead.textContent = myLibrary[i].isRead;
    if(bookRead.textContent === 'Read') {
      bookRead.style.backgroundColor = 'aquamarine'
    } else {
      bookRead.style.backgroundColor = 'lightcoral'
    }
    bookContainer.appendChild(bookRead);
    library.appendChild(bookContainer);

    const removeBook = document.createElement('button');
    removeBook.classList.add('remove-book');
    removeBook.textContent = 'Remove';
    removeBook.setAttribute('index',i);
    bookContainer.appendChild(removeBook);
    library.appendChild(bookContainer);
  }

removeBook();
toggleRead();

}
// Deletes the library and creates it with updated new book
function updateLibrary() {
  const books = document.querySelectorAll('.book-container');
  books.forEach(book => {
    book.remove();
  })
    createLibrary();
  }

// Removes book when the user clicks the Remove button
function removeBook() {
const removeButton = document.querySelectorAll('.remove-book');
removeButton.forEach(function(button) {
  button.addEventListener('click', function() {
     myLibrary.splice(this.getAttribute('index'),1);
     console.log(myLibrary);
     updateLibrary();

    }
    )});

}

// Sends form input to library array when user presses submit
const addBook = (e) => {
  if(document.querySelector('form').checkValidity()){
  e.preventDefault();
  let book = new Book(
                        document.getElementById('new-title').value,
                        document.getElementById('new-author').value,
                        document.getElementById('new-pages').value,
                        document.getElementById('new-read').checked,
  )
  if(book.isRead) {
    book.isRead = 'Read';
  } else {
    book.isRead = 'Not Read';
  }
  myLibrary.push(book);
  document.forms[0].reset();
  closeForm();
  updateLibrary();
}
}
submitButton.addEventListener('click',addBook);

// Changes read status on click
function toggleRead() {
  const readButton = document.querySelectorAll('.book-read');
  readButton.forEach(function(button) {
    button.addEventListener('click', function () {
      if(button.textContent === 'Read') {
        button.style.backgroundColor = 'lightcoral';
        return button.textContent = 'Not Read'
      }
      button.style.backgroundColor = 'aquamarine';
      return button.textContent = 'Read'
      }
    )
  })
}


createLibrary();





  