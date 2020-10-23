import { GET_PEDIDOS, ADD_PEDIDO, ERRO_PEDIDO } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload
      };
    case ADD_PEDIDO:
      return {
        ...state,
        pedidos: action.payload,
        isLoading: false
      };
    case ERRO_PEDIDO:
      return {
        ...state,
        erro: action.payload
      };
    default:
      return state;
  }
};
