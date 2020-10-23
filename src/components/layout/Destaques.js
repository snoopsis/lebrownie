import React, { useContext, useEffect } from "react";
import CarrinhoContext from "../../context/carrinho/CarrinhoContext";

const Cardapio = () => {
  const carrinhoContext = useContext(CarrinhoContext);

  const { produtos, addItem, getProdutos, getCart } = carrinhoContext;

  useEffect(() => {
    getProdutos();
    getCart();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="product-list" style={{ marginTop: 20 }}>
        <div className="container">
          {produtos.map(i => (
            <div className="content" key={i.id}>
              <div className="product-image">
                <img src={i.img} alt={i.nome} style={{ maxHeight: "72px" }} />
                <div style={{ marginTop: 5 }}>
                  <button
                    className="button button-white z-depth-1"
                    color="secondary"
                  >
                    {"R$ "}
                    {i.valor}
                    {".00"}
                  </button>
                </div>
              </div>
              <div className="product-text">
                <a href="#home">
                  <h6>{i.nome}</h6>
                  <p>{i.desc}</p>
                </a>
                <button
                  className="btn"
                  id="adicionar"
                  style={{ backgroundColor: "#d81b60 ", height: 33 }}
                  onClick={() =>
                    addItem({
                      id: i.id,
                      nome: i.nome,
                      desc: i.desc,
                      img: i.img,
                      valor: i.valor,
                      quantidade: i.quantidade,
                      carrinho: true
                    })
                  }
                >
                  Quero!
                </button>

                {/* <button
                    className="button"
                    style={{
                      float: "right",
                      width: 50,
                      backgroundColor: "#7cb342"
                    }}
                  >
                    <i className="fa fa-shopping-cart"></i>
                  </button> */}
              </div>
              <div className="clear"></div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cardapio;
