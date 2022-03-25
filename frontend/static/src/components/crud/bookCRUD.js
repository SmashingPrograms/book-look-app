import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardGroup, Form, Button, Modal, ModalTitle } from 'react-bootstrap';

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
  const [show, setShow] = useState(false);
  // console.log('book detail', book)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [title, setTitle] = useState(book.title);
  // const [description, setDescription] = useState(book.description);


  const handleSave = async (event) => {
    event.preventDefault();
    const updatedBook = {...book};
    delete updatedBook.id;
   
    setShow(false);
    const response = await fetch(`/api/v1/books/${book.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(updatedBook),
    });
    
    const json = await response.json();
    const updatedBooks = [...props.books];
    const index = updatedBooks.findIndex(item => item.id === book.id);
    updatedBooks[index] = json;
    props.setBooks(updatedBooks);
    console.log('here')
   
  }

  const handleInput = (event) => {
    setBook({...book, [event.target.name]: event.target.value})
  }

  const editingHTML = (

      
        <Form className="book-form-edit" onSubmit={handleSave}>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter title" onChange={handleInput} value={book.title} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" placeholder="Enter author" onChange={handleInput} value={book.author} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" name="year" placeholder="Enter year" onChange={handleInput} value={book.year} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" name="genre" placeholder="Enter genre" onChange={handleInput} value={book.genre} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="url" name="url" placeholder="Enter url" onChange={handleInput} value={book.url} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="start">
          <Form.Label>Beginning text</Form.Label>
          <Form.Control type="text" name="start" placeholder="Enter beginning text" onChange={handleInput} value={book.start} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="end">
          <Form.Label>Ending</Form.Label>
          <Form.Control type="text" name="end" placeholder="Enter ending text" onChange={handleInput} value={book.end} required />
        </Form.Group>

          <Button variant="primary" type="submit" id="custom-hint" className='btn btn-success'>
            Save
          </Button>
          <Button className="mx-2" variant="primary" type="button" id="custom-hint" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Form>

  )
  
  
  const detailsHTML = (
    <Col>
      <Card className="myCard">
        <Card.Body>
          <Card.Title><span data-name='title'>{book.title}</span> (<span data-name='year'>{book.year}</span>)</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">by <span data-name='author'>{book.author}</span></Card.Subtitle>
            <Card.Text className="mb-2"><b>Genre:</b> <span data-name='genre'>{book.genre}</span></Card.Text>
            <div><b>URL:</b><p><a href={book.url} data-name='url'>{book.url}</a></p></div>
            <Card.Text className="mb-2"><b>Start:</b> <span data-name='start'>{book.start}</span></Card.Text>
            <Card.Text className="mb-2"><b>End: </b><span data-name='end'>{book.end}</span></Card.Text>
            <Button id="custom-hint" onClick={handleShow}>
              Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit book details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {editingHTML}
              </Modal.Body>
             
            </Modal>
            <button className="btn btn-danger m-2" type="button" onClick={() => props.handleDelete(book.id)}>Delete</button>
    
        </Card.Body>
      </Card>
    </Col>
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
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      throw new Error('Network response for books get request not ok!');
    } else {
      // console.log(dataToGet)
      // Cookies.set('Authorization', `Token ${dataToGet.key}`);
      console.log(dataToGet);
      // setBooks(dataToGet.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())));
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
    console.log(newBook, "is the new book")
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
      // Cookies.set('Authorization', `Token ${data.key}`);
      // getBooks();
      const updatedBooks = [...books];
      updatedBooks.push(data);
      updatedBooks.sort((a, b) => {
        console.log(a.title, b.title)
        if(a.title < b.title) {
          return -1;
        } else if(a.title > b.title){
          return 1;
        } else {
          return 0;
        }
        
      });
      setBooks(updatedBooks);
      setShow(false);
    };
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

  const handleDelete = async (id) => {
    const response = await fetch(`/api/v1/books/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });

    if (!response.ok) {
      throw new Error('Network response for book delete request not ok!');
    } else {
      const updatedBooks = [...books];
      const index = updatedBooks.findIndex(book => book.id === id);
      updatedBooks.splice(index, 1);
      setBooks(updatedBooks);
    }

    const updatedBooks = [...books];
    console.log('firing before', id, updatedBooks);
    const index = updatedBooks.findIndex(book => book.id === id);
    updatedBooks.splice(index, 1);
    console.log('firing after', id, updatedBooks);
    setBooks(updatedBooks);
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

  const bookPostsHTML = books.map((book) => (
    <BookDetail key={book.id} book={book} handleDelete={handleDelete} handleChange={handleChange} books={books} getBooks={getBooks} setBooks={setBooks}/>
    ));

  return (
    <>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
          <Modal.Title>Add new book</Modal.Title>
        </Modal.Header>
    <Modal.Body>
      <Form className="book-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter title" onChange={handleInput} value={book.title} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" placeholder="Enter author" onChange={handleInput} value={book.author} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" name="year" placeholder="Enter year" onChange={handleInput} value={book.year} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" name="genre" placeholder="Enter genre" onChange={handleInput} value={book.genre} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="url" name="url" placeholder="Enter url" onChange={handleInput} value={book.url} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="start">
          <Form.Label>Beginning text</Form.Label>
          <Form.Control type="text" name="start" placeholder="Enter beginning text" onChange={handleInput} value={book.start} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="end">
          <Form.Label>Ending</Form.Label>
          <Form.Control type="text" name="end" placeholder="Enter ending text" onChange={handleInput} value={book.end} required />
        </Form.Group>
        <Button variant="primary" type="submit" id="custom-hint" className='btn btn-success'>
          Submit
        </Button>
        <Button className="mx-2" variant="primary" type="button" id="custom-hint"  onClick={() => setShow(false)}>
          Cancel
        </Button>
      </Form>
    </Modal.Body>

    </Modal>
    
    
  
     <div className="book-new-header">
     <h1 className="booksTitle">Total Books ({books.length})</h1><Button id="custom-hint" className="mx-2" variant="primary" onClick={handleShow}>+</Button>
     </div>
      
      
      <Container>
        <Row>
          <CardGroup>
          {bookPostsHTML}
          </CardGroup>
        </Row>
      </Container>
    </>
  )
}

export default BookCRUD;