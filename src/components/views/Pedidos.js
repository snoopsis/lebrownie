import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import PedidosContext from "../../context/pedidos/PedidosContext";

const Pedidos = () => {
  const authContext = useContext(AuthContext);
  const pedidosContext = useContext(PedidosContext);

  const { loadCliente } = authContext;
  const { getPedidos, pedidos } = pedidosContext;

  // Ciclo
  useEffect(() => {
    loadCliente();
    getPedidos();
    // eslint-disable-next-line
  }, []);
  // # Ciclo

  return (
    <React.Fragment>
      <div className="segments-page">
        <div className="container">
          <div className="pages-title">
            <h3>Pedidos</h3>
            <p>Obrigado pela preferencia, recebemos o seu pedido.</p>
            <div className="line"></div>
          </div>
          {pedidos !== null &&
            pedidos.length > 0 &&
            pedidos.map(pedido => (
              <div className="checkout" key={pedido._id}>
                <div className="product-choosed center">
                  <div className="row">
                    <div class="col s12">
                      <div
                        class="chip"
                        style={{ backgroundColor: "#f06292", color: "#fff" }}
                      >
                        Estamos Separando o seu Pedido
                      </div>
                    </div>
                    <div class="col s12">
                      <div
                        class="btn-floating btn-large scale-transition"
                        style={{ backgroundColor: "#fce4ec" }}
                      >
                        <i class="material-icons" style={{ color: "#000" }}>
                          add
                        </i>
                      </div>
                    </div>
                    <div class="col s12" style={{ marginTop: "10px" }}>
                      <div class="chip" style={{ backgroundColor: "#eee" }}>
                        O seu Produto esta a Caminho
                      </div>
                    </div>
                    <div class="col s12">
                      <div
                        class="btn-floating btn-large scale-transition"
                        style={{ backgroundColor: "#eee" }}
                      >
                        <i class="material-icons" style={{ color: "#000" }}>
                          add
                        </i>
                      </div>
                    </div>
                    <div class="col s12" style={{ marginTop: "10px" }}>
                      <div class="chip" style={{ backgroundColor: "#eee" }}>
                        Entregue, Obrigado!
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-choosed">
                  <div className="row">
                    <div className="col s8">
                      <div className="contents">
                        <p>Numero do Pedido:</p>
                      </div>
                    </div>
                    <div className="col s4">
                      <div className="contents right">
                        <p>{pedido.numero_pedido}</p>
                      </div>
                    </div>
                    <div className="col s8">
                      <div className="contents">
                        <p>Status Pagamento:</p>
                      </div>
                    </div>
                    <div className="col s4">
                      <div className="contents right">
                        <p> {pedido.status_pagamento}</p>
                      </div>
                    </div>
                    <div className="col s12">
                      <div className="contents">
                        <p>
                          {"Produtos: "}
                          {pedido.produtos}
                        </p>
                      </div>
                    </div>

                    <div className="col s8" style={{ marginTop: 10 }}>
                      <div className="contents">
                        <h5>Total</h5>
                      </div>
                    </div>
                    <div className="col s4" style={{ marginTop: 10 }}>
                      <div className="contents right">
                        <h5>
                          {"R$ "}
                          {pedido.valor}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* <button className="button checkout-button">
            <i className="fa fa-send"></i>Chekcout
          </button> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pedidos;
