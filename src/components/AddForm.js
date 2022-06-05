import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBooks } from '../store/bookSlice';

function AddForm() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // catch the input value with useRef
  const tittleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  // handleSubmit and send the data to the API
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      title: tittleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
    }
    dispatch(insertBooks(bookData));
    // reset the form after submit the data to the API 
    tittleRef.current.value = null;
    priceRef.current.value = null;
    descriptionRef.current.value = null;
  }
  return (
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title' >Title</label>
            <input type='text' ref={tittleRef} className='form-control' id='title' required />
          </div>
          <div className='form-group'>
            <label htmlFor='price' >Price</label>
            <input type='number' ref={priceRef} className='form-control' id='price' required />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              ref={descriptionRef}
              className='form-control'
              id='Description'
              rows='3'
              required
            ></textarea>
          </div>
          <button disabled={!isLoggedIn} type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
