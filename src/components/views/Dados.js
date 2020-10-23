import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Dados = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    updateClient,
    error,
    isAuthenticated,
    updateDados,
    client,
    updatePassword
  } = authContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [novaSenha, setNovaSenha] = useState([]);

  const onChange = e => {
    updateClient({ ...client, [e.target.name]: e.target.value });
    setNovaSenha({ ...novaSenha, [e.target.name]: e.target.value });
  };

  const verificaMudanca = () => {
    if (novaSenha.pass1 !== novaSenha.pass2) {
      setAlert("A Senha Nao esta Igual, Confira e Digite Novamente.", "danger");
    } else {
      return novaSenha.pass1;
    }
  };

  const alteraDados = e => {
    e.preventDefault();

    let atualiza = {
      _id: client._id,
      primeiroNome: client.primeiroNome,
      ultimoNome: client.ultimoNome,
      email: client.email,
      telefone: client.telefone,
      rua: client.rua,
      bairro: client.bairro,
      complemento: client.complemento,
      cidade: client.cidade,
      estado: client.estado,
      cep: client.cep
    };

    updateDados(atualiza);
    props.history.push("/");
  };

  const alteraSenha = e => {
    e.preventDefault();
    if (verificaMudanca()) {
      setNovaSenha(verificaMudanca());
      let atualiza = {
        _id: client._id,
        primeiroNome: client.primeiroNome,
        ultimoNome: client.ultimoNome,
        email: client.email,
        telefone: client.telefone,
        rua: client.rua,
        bairro: client.bairro,
        complemento: client.complemento,
        cidade: client.cidade,
        estado: client.estado,
        password: novaSenha.pass1,
        cep: client.cep
      };
      updatePassword(atualiza);
      props.history.push("/");
    }
  };

  return (
    <div className="sign-up segments-page">
      <div className="container">
        <div className="signup-contents">
          <div className="pages-title">
            <h3>Meus Dados Pessoais</h3>
          </div>
          <form onSubmit={alteraDados}>
            <label>Primeiro Nome</label>
            <input
              type="text"
              name="primeiroNome"
              value={client.primeiroNome}
              onChange={onChange}
              required
            />
            <label>Ultimo Nome</label>
            <input
              type="text"
              name="ultimoNome"
              value={client.ultimoNome}
              onChange={onChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={client.email}
              onChange={onChange}
              required
            />
            <label>Celular</label>
            <input
              type="text"
              name="telefone"
              value={client.telefone}
              onChange={onChange}
              required
            />
            <label>Cep</label>
            <input
              type="text"
              name="cep"
              value={client.cep}
              onChange={onChange}
              required
            />
            <label>Rua</label>
            <input
              type="text"
              name="rua"
              value={client.rua}
              onChange={onChange}
              required
            />
            <label>Numero</label>
            <input
              type="text"
              name="numero"
              value={client.numero}
              onChange={onChange}
              required
            />
            <label>Bairro</label>
            <input
              type="text"
              name="bairro"
              value={client.bairro}
              onChange={onChange}
              required
            />
            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              value={client.complemento}
              onChange={onChange}
              required
            />
            <label>Cidade</label>
            <input
              type="text"
              name="cidade"
              value={client.cidade}
              onChange={onChange}
              required
            />
            <label>Estado</label>
            <input
              type="text"
              name="estado"
              value={client.estado}
              onChange={onChange}
              required
            />
            <div className="col sm12 center">
              <button
                type="submit"
                className="btn center"
                style={{ height: 33 }}
              >
                <i className="fa fa-save"></i>Atualizar Meus Dados
              </button>
            </div>
          </form>
          <div className="pages-title" style={{ marginTop: 20 }}>
            <h3>Trocar a Senha</h3>
          </div>
          <form onSubmit={alteraSenha} className="center">
            <input type="password" name="pass1" onChange={onChange} required />
            <input type="password" name="pass2" onChange={onChange} required />
            <button type="submit" className="btn center" style={{ height: 33 }}>
              <i className="fa fa-key"></i> Atualizar Senha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dados;
