import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import CarrinhoContext from "../../context/carrinho/CarrinhoContext";

const Cadastro = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const carrinhoContext = useContext(CarrinhoContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { carrinho } = carrinhoContext;

  useEffect(() => {
    if (error === "Ja se Cadastrou? Esse email ja existe, tente fazer login!") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [client, setClient] = useState({
    primeiroNome: "",
    ultimoNome: "",
    email: "",
    telefone: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    password: "",
    password2: "",
    cep: ""
  });

  const {
    primeiroNome,
    ultimoNome,
    email,
    telefone,
    rua,
    numero,
    bairro,
    complemento,
    cidade,
    estado,
    password,
    password2,
    cep
  } = client;

  const onChange = e =>
    setClient({ ...client, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      primeiroNome === "" ||
      ultimoNome === "" ||
      telefone === "" ||
      rua === "" ||
      numero === "" ||
      bairro === "" ||
      complemento === "" ||
      cidade === "" ||
      estado === "" ||
      email === "" ||
      password === "" ||
      cep === ""
    ) {
      setAlert("Por favor preencha todos os campos", "danger");
    } else if (password !== password2) {
      setAlert(
        "A Senha nao esta igual na confirmacao, digite de novo por favor.",
        "danger"
      );
    } else {
      register({
        primeiroNome,
        ultimoNome,
        email,
        telefone,
        rua,
        numero,
        bairro,
        cep,
        complemento,
        cidade,
        estado,
        password
      });
    }
  };

  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
  }

  function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById("rua").value = conteudo.logradouro;
      document.getElementById("bairro").value = conteudo.bairro;
      document.getElementById("cidade").value = conteudo.localidade;
      document.getElementById("uf").value = conteudo.uf;
    } //end if.
    else {
      //CEP não Encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
    }
  }

  function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep !== "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById("rua").value = "...";
        document.getElementById("bairro").value = "...";
        document.getElementById("cidade").value = "...";
        document.getElementById("uf").value = "...";

        //Cria um elemento javascript.
        var script = document.createElement("script");

        //Sincroniza com o callback.
        fetch(`https://viacep.com.br/ws/41650035/json`)
          .then(response => response.json())
          .then(data => {
            script.src = meu_callback(data);
          });

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  }

  return (
    <div className="sign-up segments-page">
      <div className="container">
        <div className="signup-contents">
          <div className="pages-title">
            {carrinho.length > 0 ? (
              "Para continuar e comprar os seus Produtos, por favor preencha os dados abaixo:"
            ) : (
              <h3>Cadastro</h3>
            )}
            <div className="line"></div>
          </div>
          {}
          <Link to="/login">
            <div className="pages-title">
              <h3>
                Ja e Cliente?{" "}
                <strong style={{ color: "#c62828 " }}>Faca Login</strong>
              </h3>
            </div>
          </Link>
          <form onSubmit={onSubmit} method="get" action=".">
            <label>Primeiro Nome</label>
            <input
              type="text"
              name="primeiroNome"
              onChange={onChange}
              required
            />
            <label>Ultimo Nome</label>
            <input type="text" name="ultimoNome" onChange={onChange} required />
            <label>Email</label>
            <input type="email" name="email" onChange={onChange} required />
            <label>Celular</label>
            <input type="text" name="telefone" onChange={onChange} required />
            <label>CEP</label>
            <input
              type="text"
              name="cep"
              onChange={onChange}
              id="cep"
              size="10"
              maxLength="9"
              onBlur={() => pesquisacep(client.cep)}
              required
            />
            <label>Rua</label>
            <input
              type="text"
              name="rua"
              id="rua"
              onChange={onChange}
              required
            />
            <label>Numero</label>
            <input type="text" name="numero" onChange={onChange} required />
            <label>Bairro</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              onChange={onChange}
              required
            />
            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              onChange={onChange}
              required
            />
            <label>Cidade</label>
            <input
              type="text"
              name="cidade"
              id="cidade"
              onChange={onChange}
              required
            />
            <label>Estado</label>
            <input
              type="text"
              name="estado"
              id="uf"
              onChange={onChange}
              required
            />
            <label>Senha</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              required
            />
            <label>Confirme Senha</label>
            <input
              type="password"
              name="password2"
              onChange={onChange}
              required
            />
            <button type="submit" className="btn">
              <i className="fa fa-send"></i>Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
