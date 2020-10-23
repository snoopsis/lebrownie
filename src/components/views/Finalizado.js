import React from "react";

const Finalizado = ({ pedido }) => {
  return (
    <React.Fragment>
      <div className="segments-page">
        <div className="container">
          <div className="pages-title">
            <h3>Finalizado</h3>
            <p>
              Obrigado pela preferencia, recebemos os seu pedido e estamos
              separando para voce.
            </p>
            <div className="line"></div>
          </div>
          <div className="checkout">
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
                <div className="col s4">
                  <div className="contents">
                    <p>Nome:</p>
                  </div>
                </div>
                <div className="col s8">
                  <div className="contents right">
                    <p>{pedido.nome}</p>
                  </div>
                </div>
                <div className="col s4">
                  <div className="contents">
                    <p>Email:</p>
                  </div>
                </div>
                <div className="col s8">
                  <div className="contents right">
                    <p>{pedido.contato_email}</p>
                  </div>
                </div>
                <div className="col s4">
                  <div className="contents">
                    <p>Telefone:</p>
                  </div>
                </div>
                <div className="col s8">
                  <div className="contents right">
                    <p>{pedido.contato}</p>
                  </div>
                </div>
                <div className="col s4">
                  <div className="contents">
                    <p>Entrega:</p>
                  </div>
                </div>
                <div className="col s8">
                  <div className="contents right">
                    <p>{pedido.endereco}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="total-pay">
            <div className="row">
              <div className="col s12">
                <div className="contents">
                  <p>{pedido.produtos}</p>
                </div>
              </div>

              <div className="col s8">
                <div className="contents">
                  <h5>Total</h5>
                </div>
              </div>
              <div className="col s4">
                <div className="contents right">
                  <h5>
                    {"R$ "}
                    {pedido.valor}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {/* <button className="button checkout-button">
            <i className="fa fa-send"></i>Chekcout
          </button> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Finalizado;
