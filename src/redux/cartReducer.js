const initialState = {
  cartItems: [],
  items: [],
  filteredItems: [],
  sort: "" 
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_TO_CART' : {
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
    }
    }
    case 'DELETE_FROM_CART' : {
      return{
        ...state ,
        cartItems : state.cartItems.filter(obj=>obj.id !== action.payload.id)
      }
    }
    case 'ADD_QUANTITY':{
      return {
        ...state,
        cartItems: AddExistingItemToCart(state.cartItems, action.payload)
    }}
    case 'SUB_QUANTITY':{
      return {
        ...state,
        cartItems: RemoveExistingItemFromCart(state.cartItems, action.payload)
    };}
    case 'ORDER_PRODUCTS_BY_PRICE':{
      return {
        ...state,
        filteredItems: action.payload.items,
        sort: action.payload.sort,
      };}
    default:
      return state;
  }
};

const AddExistingItemToCart = ((cartItems, itemToAdd) => {
  return cartItems.map(item =>
      item.id === itemToAdd.id ? { ...item, count: item.count + 1 } : item
  )
});

const RemoveExistingItemFromCart = ((cartItems, itemToRemove) => {

  const existingItem = cartItems.find(item => item.id === itemToRemove.id);
  console.log(existingItem);
  let newItem = [];
  if (existingItem.count <= 1) {
      newItem = cartItems.filter((item) => (item.id !== existingItem.id))
  }
  else {
      newItem = cartItems.map(item =>
          item.id === itemToRemove.id ? { ...item, count: item.count - 1 } : item
      )
  }
  return newItem;
});

const addItemToCart = ((cartItems, itemToAdd) => {
  const existingItem = cartItems.find(item => item.id === itemToAdd.id);

  if (existingItem) {
      return cartItems.map(item =>
          item.id === itemToAdd.id ? { ...item, count: item.count + 1 } : item
      )
  }
  else {
      return [...cartItems, { ...itemToAdd, count: 1 }]
  }
});

export default cartReducer;