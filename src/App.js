import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// items
import cartItems from "./cart-items";
// redux stuff
import { createStore } from "redux";
import {Provider} from 'react-redux';
import reducer from "./reducer";

const initialStore = {
  cart:cartItems,
  total:104,
  amount:5
};

const store = createStore(reducer, initialStore,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  // cart setup
  return (
    <Provider store={store}>
      <Navbar cart={store.getState()} />
      <CartContainer />
    </Provider>
  );
}

export default App;
