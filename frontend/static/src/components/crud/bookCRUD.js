import Cookies from 'js-cookie';
import { useState, useEffect } from "react";

/*
"title": "Winnie-the-Pooh",
"author": "A. A. Milne",
"year": 1926,
"genre": "Juvenile",
"url": "https://www.gutenberg.org/files/67098/67098-h/67098-h.htm",
"start": "Here is Edward Bear",
"end": "going up the stairs behind him.",


Title: 
A Modest Proposal
Author: 
Jonathan Swift
Year: 
1729
Genre: 
Nonfiction
URL: 
https://gutenberg.org/files/1080/1080-h/1080-h.htm
Start: 
It is a melancholy
End: 
child-bearing.

*/

function BookDetail(props) {
  const [book, setBook]  = useState({...props.book});
  const [isEditing, setEditing] = useState(false);
  // const [title, setTitle] = useState(book.title);
  // const [description, setDescription] = useState(book.description);


  const handleSave = async (event) => {
    event.preventDefault();
    // props.handleChange(props.index, title, description);
    // console.log(book)
    const updatedBook = {...book};
    delete updatedBook.id;

    const response = await fetch(`/api/v1/books/${book.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(updatedBook),
    });

    setEditing(false);

    const json = await response.json();

    const updatedBooks = [...props.books];
    const index = updatedBooks.findIndex(item => item.id === book.id);
    updatedBooks[index] = json;
    props.setBooks(updatedBooks);
  }

  const handleInput = (event) => {
    setBook({...book, [event.target.name]: event.target.value})
  }
  
  
  const detailsHTML = (
    <li>
      <p>Title: </p>
      <p data-name='title'>{book.title}</p>
      <p>Author: </p>
      <p data-name='author'>{book.author}</p>
      <p>Year: </p>
      <p data-name='year'>{book.year}</p>
      <p>Genre: </p>
      <p data-name='genre'>{book.genre}</p>
      <p>URL: </p>
      <p data-name='url'>{book.url}</p>
      <p>Start: </p>
      <p data-name='start'>{book.start}</p>
      <p>End: </p>
      <p data-name='end'>{book.end}</p>
      <button type="button" onClick={() => setEditing(true)}>Edit</button>
      <button type="button" onClick={() => props.handleDelete(props.index)}>Delete</button>
    </li>
  )

  const editingHTML = (
    <form className="form" onSubmit={handleSave}>
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" onChange={handleInput} value={book.title} required />
      </div>
      <div>
        <label htmlFor="author">Author: </label>
        <input type="text" id="author" name="author" onChange={handleInput} value={book.author} required />
      </div>
      <div>
        <label htmlFor="year">Year: </label>
        <input type="number" id="year" name="year" onChange={handleInput} value={book.year} required />
      </div>
      <div>
        <label htmlFor="genre">Genre: </label>
        <input type="text" id="genre" name="genre" onChange={handleInput} value={book.genre} required />
      </div>
      <div>
        <label htmlFor="url">URL: </label>
        <input type="url" id="url" name="url" onChange={handleInput} value={book.url} required />
      </div>
      <div>
        <label htmlFor="start">Start: </label>
        <input type="text" id="start" name="start" onChange={handleInput} value={book.start} required />
      </div>
      <div>
        <label htmlFor="end">End: </label>
        <input type="text" id="end" name="end" onChange={handleInput} value={book.end} required />
      </div>
      <button type="submit" onSubmit={props.handleSubmit}>Save</button>
      <button type="button" onClick={() => setEditing(false)}>Cancel</button>
    </form>
  )
  
  
  return(
    <>
     {isEditing ? editingHTML : detailsHTML}
    </>
  )
}

function BookCRUD() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: 0,
    genre: '',
    url: '',
    start: '',
    end: '',
  })
  // const [bookTitle, setBookTitle] = useState('');
  // const [bookPost, setBookPost] = useState('');
  // setBook([1, 2])

  useEffect(() => {
    // const dataToPush = {...profile};
    // dataToPush.points = points;
    // setProfile(dataToPush)
    getBooks();
  }, [])

  const getBooks = async () => {
    const response = await fetch(`/api/v1/books/`)
      // body: JSON.stringify(dataToPush),

    const dataToGet = await response.json();

    if (!response.ok) {
      throw new Error('Network response for profile get request not ok!');
    } else {
      // console.log(dataToGet)
      // Cookies.set('Authorization', `Token ${dataToGet.key}`);
      // console.log(dataToGet);
      setBooks(dataToGet);
    }
  }

  const handleChange = (event) => {
    console.log('did I eve nget here?')
    const target = event.target;
    console.log(target)
    let value;
    if (target.value) {
      value = target.value;
    } else {
      value = target.defaultValue;
    }
    console.log(value)
    const name = target.name;

    setBook({...book, [name]: value})
    console.log(book)
    // const bookClone = {...book}
    // // console.log((state === undefined) ? '' : state)
    // bookClone['title'] = event.target.value ? event.target.value : ''
    // setBook(bookClone);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newBook = {...book}
    // console.log(newBook, "is the new book")
    const response = await fetch('/api/v1/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(newBook),
    });
    
    if (!response.ok) {
      throw new Error('Network response not ok!');
    } else {
      // console.log(response)
      const data = await response.json();
      Cookies.set('Authorization', `Token ${data.key}`);
      getBooks();
    };

    // console.log(newBook)
    setBooks([newBook, ...books])
  }

  const handleInput = (event) => {
    console.log('did I eve nget here?')
    const target = event.target;
    console.log(target)
    let value;
    if (target.value) {
      value = target.value;
    } else {
      value = target.defaultValue;
    }
    console.log(value)
    const name = target.name;

    setBook({...book, [name]: value})
    console.log(book)
    // const bookClone = {...book}
    // // console.log((state === undefined) ? '' : state)
    // bookClone['title'] = event.target.value ? event.target.value : ''
    // setBook(bookClone);
  }

  // const handleTitleInput = (e) => {
  //   setBookTitle(e.target.value);
  // }

  // const handlePostInput = (e) => {
  //   setBookPost(e.target.value);
  // }

  const handleDelete = async (index) => {
    const responsePut = await fetch(`/api/v1/books/${books[index].id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });

    if (!responsePut.ok) {
      throw new Error('Network response for book delete request not ok!');
    } else {
      const booksCopy = [...books];
      console.log(booksCopy[index].id)
      booksCopy.splice(index, 1);
      setBooks(booksCopy);
    }
  }

  // const handleChange = (index, event) => {
  //   // const booksCopy = [...books];
  //   // booksCopy[index] = {...booksCopy[index], title, description};
  //   const target = event.target;
  //   console.log(target)
  //   const value = target.value;
  //   console.log(value)
  //   const name = target.name;

  //   setBook({...book, [name]: value})
  //   // setBooks(booksCopy);
  // }

  const bookPostsHTML =  books.map((book, index) => (
      <BookDetail key={index} index={index} book={book} handleDelete={handleDelete} handleChange={handleChange} books={books} setBooks={setBooks}/>
    ));

  return (
    <>
      <h1>Books ({books.length})</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" onChange={handleInput} value={book.title} required />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input type="text" id="author" name="author" onChange={handleInput} value={book.author} required />
        </div>
        <div>
          <label htmlFor="year">Year: </label>
          <input type="number" id="year" name="year" onChange={handleInput} value={book.year} required />
        </div>
        <div>
          <label htmlFor="genre">Genre: </label>
          <input type="text" id="genre" name="genre" onChange={handleInput} value={book.genre} required />
        </div>
        <div>
          <label htmlFor="url">URL: </label>
          <input type="url" id="url" name="url" onChange={handleInput} value={book.url} required />
        </div>
        <div>
          <label htmlFor="start">Start: </label>
          <input type="text" id="start" name="start" onChange={handleInput} value={book.start} required />
        </div>
        <div>
          <label htmlFor="end">End: </label>
          <input type="text" id="end" name="end" onChange={handleInput} value={book.end} required />
        </div>
        <button type="submit" onClick={handleSubmit}>Post</button>
      </form>
      <ul>
        {bookPostsHTML}
      </ul>
       
      {/* <BookList title={title} /> */}
    </>
  )
}

export default BookCRUD;