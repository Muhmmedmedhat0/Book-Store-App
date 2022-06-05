import React from 'react';
function BooksList({ isLoading, books, isLoggedIn, deleteBooks, dispatch, getBook  }) {
  // render the books list.
  const bookList = books && books.length > 0 ? books.map(book => {
    return (
      <li className="list-group-item d-flex  justify-content-between align-items-center" key={book.id} >
        <div className='h6'>{book.title}</div>
        <div className="btn-group" role="group">
          <button disabled={!isLoggedIn} type="button" className="btn btn-primary"
            onClick={ ()=>{ dispatch(getBook({ id: book.id })) } }
          >Read</button>
          <button disabled={!isLoggedIn} type="button" className="btn btn-danger"
            onClick={() => {
              // handle the returned data from the API and dispatch the action to delete the book.
              dispatch(deleteBooks(book)).unwrap()
                .then((originalPromiseResult) => {
                  // handle result here
                  alert(`${book.title} is deleted`);
                })
                .catch((rejectedValueOrSerializedError) => {
                  // handle error here
                  console.log(rejectedValueOrSerializedError);
                })
            }}>Delete</button>
        </div>
      </li>
    );
  }) : <div className='h6 text-danger'>No books found :( </div>;
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? 'Loading...' : <ul className="list-group">{bookList}</ul>}
    </div>
  );
}

export default BooksList;
