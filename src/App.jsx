import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useReducer } from "react";

const api = axios.create({
  baseURL: "https://api.mercadopago.com",
});

api.interceptors.request.use(async (config) => {
  const token = process.env.REACT_APP_TOEN_MERCADO_PAGO_PUBLIC_KEY;
  config.headers.Authorization = `Bearer ${token}`;
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>PIX com API do Mercado Pago</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail:</label>
            <input onChange={handleChange} name="email" type="email" />
          </div>
          <div>
            <label>Nome:</label>
            <input onChange={handleChange} name="nome" type="text" />
          </div>
          <div>
            <label>CPF:</label>
            <input onChange={handleChange} name="cpf" type="text" />
          </div>
          <div>
            <button type="submit">Pagar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
