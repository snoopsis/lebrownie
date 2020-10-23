import React, { useReducer } from "react";
import axios from "axios";
import PedidosContext from "./PedidosContext";
import PedidosReducer from "./PedidosReducer";
import { GET_PEDIDOS, ADD_PEDIDO, ERRO_PEDIDO } from "../types";

const PedidosState = props => {
  const initialState = {
    pedidos: null,
    erro: null,
    pagamento: {
      id: "Nao Defenido",
      status: "Cartao Nao Foi Aceite"
    },
    filtro: null
  };

  const [state, dispatch] = useReducer(PedidosReducer, initialState);

  // Get Pedidos Por Cliente
  const getPedidos = async () => {
    try {
      const res = await axios.get("/api/pedidos");

      dispatch({
        type: GET_PEDIDOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRO_PEDIDO,
        payload: err.response.msg
      });
    }
  };

  // Adicionar Pedido
  const addPedido = async pedido => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/pedidos", pedido, config);

      dispatch({
        type: ADD_PEDIDO,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRO_PEDIDO,
        payload: err
      });
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos: state.pedidos,
        pagamento: state.pagamento,
        filtro: state.filtro,
        getPedidos,
        addPedido
      }}
    >
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidosState;
