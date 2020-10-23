import React, { useContext, useEffect } from "react";
// import AuthContext from "../../context/auth/authContext";
import PedidosContext from "../../context/pedidos/PedidosContext";
import Hero from "../layout/Hero";
import Destaques from "../layout/Destaques";
import Sobre from "../layout/Sobre";

const Home = () => {
  // const authContext = useContext(AuthContext);
  const pedidosContext = useContext(PedidosContext);

  const { getPedidos } = pedidosContext;

  useEffect(() => {
    // authContext.loadCliente();
    getPedidos();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Hero />
      <Destaques />
      <Sobre />
    </div>
  );
};

export default Home;
