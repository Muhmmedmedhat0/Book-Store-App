import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk is an helper function or #### action #### that can open a connection to an API and return a data.
export const getBooks = createAsyncThunk(
  'book/getBooks', async (_, thunkAPI) => {
    // handle the error in the thunkAPI.
    // rejectWithValue is method works on error happend;
    const { rejectWithValue } = thunkAPI;

    // Phase (2)
    try {
      // dispatch({type: 'book/getBooks/pending', payload: undefined });
      const response = await fetch('http://localhost:3005/books');
      const data = await response.json();
      return data;
      // dispatch({type: 'book/getBooks/fulfilled', payload: data });
    } catch (error) {
      // dispatch({type: 'book/getBooks/rejected', payload: error });
      return rejectWithValue(error.message);
    }
  });

/*  Phase (1)
        -------------dispatch getBooks -------------
  - getBooks is an asyncThunk function that handle the can open a connection to an API and return a data.
  - createAsyncThunk is created 3 type of action that is stored in
    function in toolkit is called createAction('type', (payload)=>{ return payload} );
    1- pending ---- createAction('book/getBooks/pending', (payload)=>{ return payload} );
    2- fulfilled ---- createAction('book/getBooks/fulfilled', (payload)=>{ return payload} );
    3- rejected  ---- createAction('book/getBooks/rejected', (payload)=>{ return payload} );
*/

// Insert Books
export const insertBooks = createAsyncThunk(
  // send the data to the API
  `book/insertBooks`, async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      bookData.userName = getState().auth.userName;
      const response = await fetch(('http://localhost:3005/books'), {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Books
export const deleteBooks = createAsyncThunk(
  `book/deleteBooks`, async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch((`http://localhost:3005/books/${book.id}`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      });
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

// get book data
export const getBook = createAsyncThunk(
  `book/getBook`, async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch((`http://localhost:3005/books/${book.id}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      });
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    bookInfo: [],
    isLoading: false,
    error: null
  },
  // the extraReducers used here cuz we have an action that crated outside the createSlice function.
  extraReducers: {
    // this is the action that we created outside the createSlice function.
    // Phase (3)
    // the extraReducer is going to listenUp as the dispatch has been done to know the outcome of the action.

    // get Books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // inser Books
    [insertBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete Books
    [deleteBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      // filter the books array and return the books that are not equal to the id that we want to delete.
      state.books = state.books.filter(book => book.id !== action.payload.id);
    },
    [deleteBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get book data
    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload;
    },
  },
});
export default bookSlice.reducer;