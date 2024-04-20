import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "https://api.mercadopago.com",
});

api.interceptors.request.use(async (config) => {
  const token = process.env.REACT_APP_TOEN_MERCADO_PAGO_PUBLIC_KEY;
  config.headers.Authorization = `Bearer ${token}`;
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PIX com API do Mercado Pago</p>
      </header>
      <main>
        <form>
          <div>
            <label>E-mail:</label>
            <input name="email" type="email" />
          </div>
          <div>
            <label>Nome:</label>
            <input name="nome" type="text" />
          </div>
          <div>
            <label>CPF:</label>
            <input name="cpf" type="text" />
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
