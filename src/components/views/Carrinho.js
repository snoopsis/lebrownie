import React, { useContext, useState, useEffect } from "react";
import CarrinhoContext from "../../context/carrinho/CarrinhoContext";
import AuthContext from "../../context/auth/authContext";
import PedidosContext from "../../context/pedidos/PedidosContext";
import AlertContext from "../../context/alert/alertContext";
import Finalizado from "./Finalizado";
import axios from "axios";

const Carrinho = () => {
  // Contexto
  const carrinhoContext = useContext(CarrinhoContext);
  const authContext = useContext(AuthContext);
  const pedidosContext = useContext(PedidosContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const {
    carrinho,
    remCart,
    updateItem,
    getCart,
    remAllCart,
    decreaseItem,
    addItem
  } = carrinhoContext;
  const { client, updateClient, loadCliente } = authContext;
  const { addPedido, getPedidos } = pedidosContext;
  // # Contexto

  // Ciclo
  useEffect(() => {
    loadCliente();
    getCart();
    getPedidos();
    // eslint-disable-next-line
  }, []);
  // # Ciclo

  const [loading, setLoading] = useState(false);
  const [finalizado, setFinalizado] = useState();

  // Carrinho e Pedido
  const totalCarrinho = () => {
    const valores = carrinho.map(i => i.valor * i.quantidade);
    var total = valores.reduce((total, numero) => total + numero, 0);
    return total;
  };

  const onChange = e => {
    updateClient({ ...client, [e.target.name]: e.target.value });
    updateItem({ ...carrinho, [e.target.name]: e.target.value });
    guessPaymentMethod();
  };

  const totalProdutos = () => {
    return carrinho.map(produto => `${produto.nome} x${produto.quantidade}`);
  };

  const pedido = {
    dadosPedido: totalProdutos().toString(),
    nome: `${client.primeiroNome} ${client.ultimoNome}`,
    email: `${client.email}`,
    telefone: `${client.telefone}`,
    endereco: `Rua ${client.rua}, ${client.numero}, ${client.complemento}, ${client.bairro}, ${client.cidade} - ${client.estado} `
  };

  window.Mercadopago.setPublishableKey(
    "APP_USR-239a06cd-0a66-4e78-991b-dbb6255d6339"
    // "TEST-f6654274-0c49-4d91-a807-b03070868a4c"
  );

  window.Mercadopago.getIdentificationTypes();

  function guessPaymentMethod() {
    let cardnum = document.getElementById("cardNumber").value;
    if (cardnum.length >= 6) {
      let bin = cardnum.substring(0, 6);
      window.Mercadopago.getPaymentMethod(
        {
          bin: bin
        },
        setPaymentMethod
      );
    }
  }

  function setPaymentMethod(status, response) {
    if (status === 200) {
      let paymentMethodId = response[0].id;
      let element = document.getElementById("payment_method_id");
      element.value = paymentMethodId;
      getInstallments();
    } else {
      alert(`payment method info error: ${response}`);
    }
  }

  function getInstallments() {
    window.Mercadopago.getInstallments(
      {
        payment_method_id: document.getElementById("payment_method_id").value,
        amount: parseFloat(document.getElementById("transaction_amount").value)
      },
      function(status, response) {
        if (status === 200) {
          document.getElementById("installments").options.length = 0;
          response[0].payer_costs.forEach(installment => {
            let opt = document.createElement("option");
            opt.text = installment.recommended_message;
            opt.value = installment.installments;
            document.getElementById("installments").appendChild(opt);
          });
        } else {
          alert(`installments method info error: ${response}`);
        }
      }
    );
  }

  function doPay(e) {
    e.preventDefault();
    var $form = document.querySelector("#pay");

    window.Mercadopago.createToken($form, sdkResponseHandler);

    return false;
  }

  function sdkResponseHandler(status, response) {
    if (status !== 200 && status !== 201) {
      alert("Dados Incorretos, Confira e Insira Novamente.");
      localStorage.setItem(
        "cartaoErro",
        "O seu cartao nao foi aceite, nenhuma cobranca sera feita. Tente Novamente."
      );
      window.location.reload();
    } else {
      var form = document.querySelector("#pay");
      var card = document.createElement("input");
      card.setAttribute("name", "token");
      card.setAttribute("type", "hidden");
      card.setAttribute("value", response.id);
      form.appendChild(card);

      window.doSubmit = true;

      axios({
        method: "post",
        url: "/pay",
        data: {
          token: response.id,
          transaction_amount: totalCarrinho(),
          installments: document.getElementById("installments").value,
          payment_method_id: document.getElementById("payment_method_id").value,
          email: pedido.email,
          description: pedido.dadosPedido
        }
      })
        .then(function(response) {
          const pag = {
            id: response.data.response.id,
            status: response.data.response.status
          };
          registoPedido(pag);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  // Finalizar Pedido
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    // updateDados(client);
    doPay(e);
  };

  const registoPedido = pag => {
    if (pag.status === "rejected") {
      setAlert("O Seu Cartao nao Foi Aceite, Tente Novamente.", "danger");
      document.getElementById("cardNumber").value = "";
      document.getElementById("cardholderName").value = "";
      document.getElementById("cardExpirationMonth").value = "";
      document.getElementById("cardExpirationYear").value = "";
      document.getElementById("securityCode").value = "";
      document.getElementById("docNumber").value = "";
      // console.log(`Status: ${pag.status}`);
      localStorage.setItem(
        "cartaoErro",
        "O seu cartao nao foi aceite, nenhuma cobranca sera feita. Tente Novamente."
      );
      setTimeout(() => window.location.reload(), 6000);
    } else {
      addPedido({
        numero_pedido: pag.id,
        status_pagamento: pag.status,
        produtos: pedido.dadosPedido,
        valor: totalCarrinho(),
        nome: pedido.nome,
        endereco: pedido.endereco,
        contato: pedido.telefone,
        contato_email: pedido.email
      });
      setFinalizado({
        numero_pedido: pag.id,
        status_pagamento: pag.status,
        produtos: pedido.dadosPedido,
        valor: totalCarrinho(),
        nome: pedido.nome,
        endereco: pedido.endereco,
        contato: pedido.telefone,
        contato_email: pedido.email
      });
      localStorage.removeItem("cartaoErro");
      remAllCart();
    }

    setLoading(false);
  };

  const seguirCompra = () => {
    return (
      <React.Fragment>
        <div className="pages-title">
          <h3>Pedido</h3>
          <div className="line"></div>
        </div>
        <div className="cart">
          {carrinho.map(i => (
            <div className="cart-product first" key={i.id}>
              <div className="row">
                <div className="col s4">
                  <div className="contents">
                    <img src={i.img} alt="" />
                  </div>
                </div>
                <div className="col s6">
                  <div className="contents">
                    <strong>{i.nome}</strong>
                  </div>
                  <div className="contents" style={{ marginTop: 20 }}>
                    <strong>
                      {" "}
                      {i.valor * i.quantidade}
                      {".00"}
                    </strong>
                  </div>
                </div>
                <div className="col s2">
                  <div className="contents remove">
                    <i
                      className="fa fa-remove"
                      onClick={() =>
                        remCart({
                          id: i.id,
                          nome: i.nome,
                          valor: i.valor,
                          img: i.img,
                          desc: i.desc,
                          quantidade: i.quantidade
                        })
                      }
                    ></i>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col s4">
                    <div className="contents">
                      <p>Valor</p>
                    </div>
                  </div>
                  <div className="col s8" style={{ marginBottom: 5 }}>
                    <div className="contents">
                      <p name="valor" onChange={onChange}>
                        {i.valor * i.quantidade}
                        {".00"}
                      </p>
                    </div>
                  </div> */}
                <div className="col s4">
                  <div className="contents">
                    <p>Quantidade</p>
                  </div>
                </div>
                <div className="col s8">
                  <div className="contents">
                    <button
                      class="btn-floating btn-small scale-transition"
                      style={{ backgroundColor: "#fce4ec", marginRight: 5 }}
                      onClick={() =>
                        decreaseItem({
                          id: i.id,
                          nome: i.nome,
                          desc: i.desc,
                          img: i.img,
                          valor: i.valor,
                          quantidade: i.quantidade
                        })
                      }
                    >
                      <i class="material-icons" style={{ color: "#000" }}>
                        remove
                      </i>
                    </button>

                    <input
                      name="quantidade"
                      type="number"
                      readOnly
                      style={{ width: 30, textAlign: "center" }}
                      value={i.quantidade}
                    ></input>
                    <button
                      class="btn-floating btn-small scale-transition"
                      style={{ backgroundColor: "#fce4ec", marginLeft: 5 }}
                      onClick={() =>
                        addItem({
                          id: i.id,
                          nome: i.nome,
                          desc: i.desc,
                          img: i.img,
                          valor: i.valor,
                          quantidade: i.quantidade
                        })
                      }
                    >
                      <i class="material-icons" style={{ color: "#000" }}>
                        add
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total-pay">
          {carrinho.map(i => (
            <div className="row" key={i.id}>
              <div className="col s8">
                <div className="contents">
                  <p>{i.nome}</p>
                </div>
              </div>
              <div className="col s4">
                <div className="contents right">
                  <p>
                    {i.valor * i.quantidade}
                    {".00"}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="col s8" style={{ marginBottom: 10 }}>
            <div className="contents">
              <h5>Total</h5>
            </div>
          </div>
          <div className="col s4">
            <div className="contents right">
              <h5>
                {totalCarrinho()}
                {".00"}
              </h5>
            </div>
          </div>
          <br />
          <br />
        </div>
        <form onSubmit={onSubmit} id="pay" name="pay">
          <div className="pages-title">
            <h3>Dados para Entrega</h3>
            <div className="line"></div>
          </div>
          <div className="signup-contents">
            <label>Celular</label>
            <input
              type="text"
              name="telefone"
              value={client.telefone}
              required
              onChange={onChange}
            />
            <label>Rua</label>
            <input
              type="text"
              name="rua"
              value={client.rua}
              required
              onChange={onChange}
            />
            <label>Numero</label>
            <input
              type="text"
              name="numero"
              value={client.numero}
              required
              onChange={onChange}
            />
            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              value={client.complemento}
              required
              onChange={onChange}
            />
            <label>Bairro</label>
            <input
              type="text"
              name="numero"
              value={client.bairro}
              required
              onChange={onChange}
            />
            <label>Cidade</label>
            <input
              type="text"
              name="cidade"
              value={client.cidade}
              required
              onChange={onChange}
            />
            <label>Estado</label>
            <input
              type="text"
              name="numero"
              value={client.estado}
              required
              onChange={onChange}
            />
          </div>
          <div className="pages-title">
            <h3>Pagamento</h3>
            <div className="line"></div>
            <p>{localStorage.getItem("cartaoErro")}</p>
          </div>
          <div className="signup-contents">
            <p>
              <input
                type="hidden"
                id="description"
                value={totalProdutos()}
                onChange={onChange}
              />
            </p>
            <p>
              <input
                id="transaction_amount"
                value={pedido.dadosPedido}
                type="hidden"
                onChange={onChange}
              />
            </p>
            <p>
              <label htmlFor="cardNumber">Número do cartão</label>
              <input
                type="text"
                id="cardNumber"
                data-checkout="cardNumber"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <label htmlFor="cardholderName">Nome Igual ao Cartao</label>
              <input
                type="text"
                id="cardholderName"
                data-checkout="cardholderName"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <label htmlFor="cardExpirationMonth">Mês de vencimento</label>
              <input
                type="text"
                id="cardExpirationMonth"
                data-checkout="cardExpirationMonth"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <label htmlFor="cardExpirationYear">Ano de vencimento</label>
              <input
                type="text"
                id="cardExpirationYear"
                data-checkout="cardExpirationYear"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <label htmlFor="securityCode">Código de segurança</label>
              <input
                type="text"
                id="securityCode"
                data-checkout="securityCode"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <select
                type="hidden"
                id="installments"
                className="form-control"
                onChange={onChange}
              ></select>
            </p>
            <p>
              <select
                id="docType"
                data-checkout="docType"
                type="hidden"
              ></select>
            </p>
            <p>
              <label htmlFor="docNumber">CPF</label>
              <input
                type="text"
                id="docNumber"
                data-checkout="docNumber"
                required
              />
            </p>
            <p>
              <input
                type="hidden"
                id="email"
                value={pedido.email}
                onChange={onChange}
              />
            </p>
            <input type="hidden" id="payment_method_id" onChange={onChange} />
            {!loading && (
              <button type="submit" className="btn">
                <i className="fa fa-send"></i>Fazer Pedido
              </button>
            )}
            {loading && <button className="button">Aguarde...</button>}
          </div>
        </form>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {finalizado && <Finalizado pedido={finalizado} />}
      <div className="segments-page">
        <div className="container">{carrinho.length > 0 && seguirCompra()}</div>
      </div>
    </React.Fragment>
  );
};

export default Carrinho;
