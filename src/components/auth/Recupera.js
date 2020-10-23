import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import axios from "axios";

const Recupera = () => {
  const [enviado, setEnviado] = useState(false);

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const onSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      // send a POST request
      axios({
        method: "post",
        url: "/recovery",
        data: {
          email: email
        }
      }).then(
        response => {
          setEnviado(true);
        },
        error => {
          console.log(error);
          setAlert(
            "O Email Inserido nao Existe, Tente de Novo, ou Cadastre a sua Conte."
          );
        }
      );
    }
  };

  return (
    <React.Fragment>
      {!enviado && (
        <div className="sign-in segments-page">
          <div className="container">
            <div className="signin-contents center">
              <div className="pages-title">
                <h3>Insira o Seu Email</h3>
                <div className="line"></div>
              </div>
              <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" name="email" required />

                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#d81b60" }}
                >
                  <i className="fa"></i>Enviar Nova Senha
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {enviado && (
        <div className="sign-in segments-page">
          <div className="container">
            <div className="signin-contents center">
              <div className="pages-title">
                <h3>Email Enviado!</h3>
                <div className="line"></div>
              </div>
              <p>
                Enviamos uma mensagem para o email cadastrado em nosso site.
                Essa mensagem tem a nova senha de acesso a sua conta.
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Recupera;
