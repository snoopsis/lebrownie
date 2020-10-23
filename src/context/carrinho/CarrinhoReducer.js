import {
  GET_PRODUTOS,
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  UPDATE_CART,
  REMOVE_ALL_CART,
  GET_CARRINHO,
  DECREASE_ITEM
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUTOS:
      return {
        ...state,
        produtos: action.payload
      };
    case GET_CARRINHO:
      return {
        ...state,
        carrinho: action.payload
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
        carrinho: action.payload
      };
    case DECREASE_ITEM:
      return {
        ...state,
        carrinho: action.payload
      };
    case REMOVE_PRODUCT_CART:
      return {
        ...state,
        carrinho: state.carrinho.filter(
          produto => produto.id !== action.payload.id
        )
      };
    case REMOVE_ALL_CART:
      return {
        ...state,
        carrinho: []
      };
    case UPDATE_CART:
      return {
        ...state,
        carrinho: state.carrinho.map(produto =>
          produto.id === action.payload.id ? action.payload : produto
        )
      };
    default:
      return state;
  }
};
