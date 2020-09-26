import {
  CLEAR_CART,
  DECREASE,
  GET_TOTALS,
  INCREASE,
  REMOVE,
  TOGGLE_AMOUNT,
} from "./actions";
import cartItems from "./cart-items";
import CartItem from "./components/CartItem";

function reducer(state, action) {
  if (action.type === DECREASE) {
    let tempCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload.id,
    );
    tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }
  if (action.type === GET_TOTALS) {
    console.log("totals");
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        console.log(cartItem);
        return cartTotal;
      },
      {
        amount: 0,
        total: 0,
      },
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if(action.type === TOGGLE_AMOUNT){
    return({...state, cart:state.cart.map(cartItem => {
      if(cartItem.id === action.payload.id){
        if(action.payload.toggle === "inc"){
          return {...cartItem,amount:cartItem.amount+1}
        }
        if(action.payload.toggle === "dec"){
          return {...cartItem,amount:cartItem.amount-1}
        }
      }
      return cartItem
    })})
  }

  if(action.type === CLEAR_CART){
    return {...state, cart:state.cart = []}
  }
  return state;
}

export default reducer;
