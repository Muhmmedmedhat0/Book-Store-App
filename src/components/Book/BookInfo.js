import React from 'react';
import { Fragment } from 'react';


function BookInfo({ bookInfo }) {
  // console.log(bookInfo);
  return (
    <Fragment>
      <h2>Book Details</h2>
      <div className='alert alert-secondary' role='alert'>
        There is no Books selected yet. Please select One!
      </div>
      {/* <div>
        <p className='fw-bold'>Title:</p>
        <p className='fw-light'>Description:</p>
        <p className='fst-italic'>Price:</p>
      </div> */}
    </Fragment>
  );
}

export default BookInfo;