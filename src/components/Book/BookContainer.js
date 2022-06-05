import React, { Fragment, useEffect } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, deleteBooks, getBook } from '../../store/bookSlice';

function BookContainer() {
  // useSelector is a hook that is used to get the data from the store.
  const { isLoading, books, bookInfo} = useSelector(state => state.books);
  const { isLoggedIn } = useSelector(state => state.auth);
  console.log(bookInfo);

  const dispatch = useDispatch();
  // after the component is mounted, we dispatch the action to get the books.
  useEffect(() => {
    dispatch(getBooks({ id: 1 }));
  }, [dispatch]);
  return (
    <Fragment>
      <hr />
      <div className='row mb-5'>
        <div className='col'>
          <BooksList isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBooks={deleteBooks}
            getBook={getBook}
            dispatch={dispatch} />
        </div>
        <div className='col side-line'>
          <BookInfo bookInfo={bookInfo} />
        </div>
      </div>
    </Fragment>
  );
}

export default BookContainer;