import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CarrinhoState from "./context/carrinho/CarrinhoState";
import AuthState from "./context/auth/AuthState";
import PedidosState from "./context/pedidos/PedidosState";
import AlertState from "./context/alert/AlertState";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Home from "./components/views/Home";
import Pedidos from "./components/views/Pedidos";
import Cadastro from "./components/auth/Cadastro";
import Recupera from "./components/auth/Recupera";
import Finalizado from "./components/views/Finalizado";
import Cardapio from "./components/views/Cardapio";
import Carrinho from "./components/views/Carrinho";
import Dados from "./components/views/Dados";
import ScrollTopTop from "./ScrollTopTop";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <CarrinhoState>
          <PedidosState>
            <Router>
              <ScrollTopTop>
                <React.Fragment>
                  <Navbar />
                  <Alerts />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/cardapio" component={Cardapio} />
                    <Route exact path="/carrinho" component={Carrinho} />
                    <Route exact path="/finalizado" component={Finalizado} />
                    <Route exact path="/pedidos" component={Pedidos} />
                    <Route exact path="/recupera" component={Recupera} />
                    <Route exact path="/dados" component={Dados} />
                  </Switch>
                  <Footer />
                </React.Fragment>
              </ScrollTopTop>
            </Router>
          </PedidosState>
        </CarrinhoState>
      </AlertState>
    </AuthState>
  );
};

export default App;
