import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
        title,
        release_year: releaseYear,
    };
    try {
    const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData),
    });

    const data = await response.json();
    setBooks((prev) => [...prev, data])
}
catch(err) {
    console.log(err)
}
  }

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "DELETE",
      });

      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div class='content-center mt-[25%]'>
        <h1 class='mb-6'> Book Website </h1>

    <div class="relative w-full inline-flex space-x-6 mb-6">
        <input type="text" id="title-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Book Title..."
        onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" id="number-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Release Year..."
        onChange={(e) => setReleaseYear(e.target.value)}/>
    </div>
    <button onClick={addBook} type="submit" class="inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
        Add Book
    </button>
    </div>

    {books.map((book) =>
    <div class='mt-6'>
        <p>Title: {book.title}</p>
        <p>Release Year: {book.release_year}</p>
        <div>
        <input type="text" id="set-new-title-btn" class="w-1/2 ml-[25%] mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Title..."
        onChange={(e) => setNewTitle(e.target.value)}/>

        <button onClick={() => updateTitle(book.id, book.release_year)} type="submit" class="mt-6 ms-2 inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
        Change Title
        </button>

        <button onClick={() => deleteBook(book.id)} type="submit" class="mt-6 inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Delete</button>

        </div>

    </div>
    )}






    </>
  )
}

export default App
