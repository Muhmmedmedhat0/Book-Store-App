import React, { Fragment } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { islogIn } from '../store/authSlice';

function Header() {
  const { error } = useSelector(state => state.books);
  const { isLoggedIn } = useSelector(state => state.auth);
const dispatch = useDispatch();

  return (
    <Fragment>
      {error && (<div className='alert alert-danger mb-0 text-danger h6' role="alert">{error}</div>)}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand mb-0 h1" href="#">Book Store</a>
          <button className='btn btn-outline-primary' type='submit' onClick={() => { dispatch(islogIn())}}>
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </button>
        </div>
      </nav >
    </Fragment>

  );
};

export default Header;