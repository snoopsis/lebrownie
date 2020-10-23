import React, { useReducer } from "react";
// import axios from "axios";
import CarrinhoContext from "./CarrinhoContext";
import CarrinhoReducer from "./CarrinhoReducer";
import {
  GET_PRODUTOS,
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  UPDATE_CART,
  REMOVE_ALL_CART,
  GET_CARRINHO,
  DECREASE_ITEM
} from "../types";

const CarrinhoState = props => {
  const initialState = {
    produtos: [
      {
        id: 1,
        nome: "Trio Maravilha",
        desc: "Delicioso Brownie Tradicional em Tripla",
        img:
          "https://img.elo7.com.br/product/zoom/1EBEC6F/mini-brownie-bolo.jpg",
        valor: 15,
        quantidade: 1,
        carrinho: false
      },
      {
        id: 2,
        nome: "Brownie Caramelo",
        desc: "Recheado de Caramelo Salgado",
        img:
          "https://i1.wp.com/comsaborperfeito.com/wp-content/uploads/2017/07/brownie-recheado-de-caramelo.jpg?fit=700%2C467&ssl=1",
        valor: 1,
        quantidade: 1,
        carrinho: false
      },
      {
        id: 3,
        nome: "Negao",
        desc: "Brownie Meio Amargo, Chocolate Intenso.",
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZJlBk1_nUvG3crMqSiYdKgnyo4Q0sc2h5Gib2cmZIMrmfoPmH&usqp=CAU",
        valor: 7,
        quantidade: 1,
        carrinho: false
      },
      {
        id: 4,
        nome: "LowCarb",
        desc: "Delicioso e Sem Culpa, Brownie com Nozes",
        img:
          "https://img.cybercook.com.br/receitas/690/brownie-low-carb-com-nozes-623x350.jpeg",
        valor: 9,
        quantidade: 1,
        carrinho: false
      }
    ],
    carrinho: []
  };

  const [state, dispatch] = useReducer(CarrinhoReducer, initialState);

  // Get Produtos
  const getProdutos = () => {
    // let cart;
    // if (localStorage.getItem("cart") === null) {
    //   cart = [];
    // } else {
    //   cart = JSON.parse(localStorage.getItem("cart"));
    // }

    // let comprados = state.produtos.filter(function(item) {
    //   return cart.map(i => i.id).indexOf(item.id);
    // });

    let prods = state.produtos;

    dispatch({
      type: GET_PRODUTOS,
      payload: prods
    });
  };

  // Get Carrinho
  const getCart = () => {
    let cart;
    if (localStorage.getItem("cart") === null) {
      cart = [];
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    dispatch({
      type: GET_CARRINHO,
      payload: cart
    });
  };

  // Add product to cart
  const addItem = item => {
    let cart = [];

    if (localStorage.getItem("cart") === null) {
      cart = [];
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    let { length } = cart;
    let id = length + 1;

    const encontrado = cart.some(el => el.nome === item.nome);
    const filtrado = cart.filter(el => el.nome === item.nome);

    if (!encontrado)
      cart.push({
        id,
        nome: item.nome,
        quantidade: 1,
        desc: item.desc,
        img: item.img,
        valor: item.valor,
        carrinho: item.carrinho
      });
    if (encontrado) {
      cart.pop();
      cart.push({
        id: filtrado[0].id,
        nome: filtrado[0].nome,
        quantidade: filtrado[0].quantidade + 1,
        desc: item.desc,
        img: item.img,
        valor: item.valor,
        carrinho: item.carrinho
      });
    }

    // cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_PRODUCT_CART,
      payload: cart
    });
  };

  // Remove product from cart
  const remCart = item => {
    let cart;
    if (localStorage.getItem("cart") === null) {
      cart = [];
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.forEach(function(tarefa, index) {
      if (item.id === tarefa.id) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: REMOVE_PRODUCT_CART,
      payload: item
    });
  };

  // Decrease Product Quantity
  const decreaseItem = item => {
    let cart = [];

    if (localStorage.getItem("cart") === null) {
      cart = [];
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const encontrado = cart.some(el => el.nome === item.nome);
    const filtrado = cart.filter(el => el.nome === item.nome);

    if (encontrado) {
      cart.pop();
      cart.push({
        id: filtrado[0].id,
        nome: filtrado[0].nome,
        quantidade: filtrado[0].quantidade > 1 && filtrado[0].quantidade - 1,
        desc: item.desc,
        img: item.img,
        valor: item.valor,
        carrinho: item.carrinho < 1 && false
      });
    }

    // cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: DECREASE_ITEM,
      payload: cart
    });
  };

  // Remove all products from cart
  const remAllCart = () => {
    localStorage.removeItem("cart");
    dispatch({
      type: REMOVE_ALL_CART
    });
  };

  // Atualiza Carrinho
  const updateItem = carrinho => {
    dispatch({
      type: UPDATE_CART,
      payload: carrinho
    });
  };

  return (
    <CarrinhoContext.Provider
      value={{
        produtos: state.produtos,
        carrinho: state.carrinho,
        getProdutos,
        remAllCart,
        addItem,
        remCart,
        updateItem,
        getCart,
        decreaseItem
      }}
    >
      {props.children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoState;
