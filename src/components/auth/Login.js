import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Link } from "react-router-dom";
// import CarrinhoContext from "../../context/carrinho/CarrinhoContext";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  // const carrinhoContext = useContext(CarrinhoContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  // const { carrinho } = carrinhoContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Dados Incorretos") {
      setAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [client, setClient] = useState({
    email: "",
    password: ""
  });

  const { email, password } = client;

  const onChange = e =>
    setClient({ ...client, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <React.Fragment>
      <div className="sign-in segments-page">
        <div className="container">
          <div className="signin-contents">
            <div className="pages-title">
              <h3>Log In</h3>
              <div className="line"></div>
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                required
              />

              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={onChange}
                required
              />

              <button type="submit" className="btn" style={{ height: 33 }}>
                <i className="fa"></i>Entrar
              </button>
              <Link
                to="/recupera"
                style={{ color: "blue", float: "right", fontWeight: 500 }}
              >
                Esqueceu a Senha?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
