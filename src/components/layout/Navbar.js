import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CarrinhoContext from "../../context/carrinho/CarrinhoContext";
import AuthContext from "../../context/auth/authContext";
import PedidosContext from "../../context/pedidos/PedidosContext";

const Navbar = props => {
  const carrinhoContext = useContext(CarrinhoContext);
  const authContext = useContext(AuthContext);
  const pedidosContext = useContext(PedidosContext);

  const { carrinho, remAllCart } = carrinhoContext;
  const { client, logout, isAuthenticated, loadCliente } = authContext;
  const { getPedidos, pedidos } = pedidosContext;

  useEffect(() => {
    loadCliente();
    getPedidos();
    // eslint-disable-next-line
  }, []);

  const offAll = () => {
    logout();
    remAllCart();
    localStorage.clear();
    document.location.reload();
    document.querySelector(".sidebar").click();
  };

  const infoUsuario = () => {
    return (
      <li>
        <div className="user-view">
          <div className="background">
            <img src="images/bg-user.png" alt="" />
          </div>
          <img
            className="circle responsive-img"
            src="images/profile.png"
            alt=""
          />
          <span className="white-text name">
            Bem vindo/a, {client.primeiroNome}
          </span>
        </div>
      </li>
    );
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          <div className="row">
            <div className="col s3">
              <div className="content-left">
                <a
                  href="#slide-out"
                  data-activates="slide-out"
                  className="sidebar"
                >
                  <i className="fa fa-bars"></i>
                </a>
              </div>
            </div>
            <div className="col s6">
              <div className="content-center">
                <Link to="/">
                  {client ? (
                    <h1>Oi, {client.primeiroNome} </h1>
                  ) : (
                    <h1>LeBrownie</h1>
                  )}
                </Link>
              </div>
            </div>
            <div className="col s3">
              <div className="content-right">
                <a
                  href="https://wa.me/5571985090609"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa fa-whatsapp"
                    style={{
                      color: "#2e7c31",
                      marginRight: 2,
                      fontSize: 22,

                      fontWeight: 600
                    }}
                  ></i>
                </a>
                {carrinho.length > 0 && (
                  <Link to={isAuthenticated ? "/carrinho" : "/login"}>
                    <i className="fa fa-shopping-cart"></i>
                    <sup>:D</sup>
                  </Link>
                )}
                {carrinho.length === 0 && (
                  <i className="fa fa-shopping-cart"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-panel">
        <ul id="slide-out" className="collapsible side-nav">
          {client ? infoUsuario() : ""}
          <li>
            <Link
              to="/"
              onClick={() => document.querySelector(".sidebar").click()}
            >
              <i className="fa fa-home"></i>Inicio
            </Link>
          </li>
          <li>
            {pedidos !== null && pedidos.length !== 0 && client && (
              <Link
                to="/pedidos"
                onClick={() => document.querySelector(".sidebar").click()}
              >
                <i className="material-icons">local_mall</i>Pedidos
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/cardapio"
              onClick={() => document.querySelector(".sidebar").click()}
            >
              <i className="material-icons">store</i>Produtos
            </Link>
          </li>
          <li>
            {client && (
              <Link
                to="/dados"
                onClick={() => document.querySelector(".sidebar").click()}
              >
                <i className="material-icons">person</i>Meus Dados
              </Link>
            )}
          </li>
          <li>
            {!client && (
              <Link
                to="/login"
                onClick={() => document.querySelector(".sidebar").click()}
              >
                <i className="fa fa-sign-in"></i>Entrar
              </Link>
            )}
          </li>
          <li>
            {!client && (
              <Link
                to="/cadastro"
                onClick={() => document.querySelector(".sidebar").click()}
              >
                <i className="fa fa-user-plus"></i>Cadastro
              </Link>
            )}
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/" onClick={() => offAll()}>
                <i className="fa fa-share"></i>Sair
              </Link>
            </li>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
