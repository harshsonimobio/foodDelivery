import { ORDER_PRODUCTS_BY_PRICE } from "../types";
export const AddToCart = item => ({
    type: 'Add_To_Cart',
    payload: item
});

export const Increase = item => ({
    type: 'ADD_QUANTITY',
    payload: item
})

export const Decrease = item => ({
    type: 'SUB_QUANTITY',
    payload: item
})

export const sortProducts = (items, sort) => (dispatch) => {
    const products = items.slice();
    if (sort !== "") {
      products.sort((a, b) =>
        sort === "lowestprice"
          ? a.price > b.price
            ? 1
            : -1
          : a.price < b.price
          ? 1
          : -1
      );
    } else {
      products.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    // dispatch({
    //   type: ORDER_PRODUCTS_BY_PRICE,
    //   payload: {
    //     sort: sort,
    //     items: products,
    //   },
    // });
  };