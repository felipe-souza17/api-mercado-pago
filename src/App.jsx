import axios from "axios";
import "./App.css";
import { useState } from "react";

const api = axios.create({
  baseURL: "https://api.mercadopago.com/v1",
});

function App() {
  const [formData, setFormData] = useState({
    email: "",
    nome: "",
    cpf: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await criarPagamentoPIX(formData);
      console.log("Pagamento criado:", response);
      // Aqui você pode lidar com a resposta do pagamento, redirecionar o usuário para uma página de sucesso, etc.
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      // Aqui você pode lidar com erros, exibir uma mensagem para o usuário, etc.
    }
  };

  const criarPagamentoPIX = async (formData) => {
    const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC_KEY;

    const body = {
      additional_info: {
        items: [
          {
            id: "MLB2907679857",
            title: "Point Mini",
            description: "Point product for card payments via Bluetooth.",
            picture_url:
              "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
            category_id: "electronics",
            quantity: 1,
            unit_price: 58.8,
          },
        ],
        payer: {
          first_name: formData.nome.split(" ")[0], // Pega apenas o primeiro nome
          last_name: formData.nome.split(" ")[1], // Pega o sobrenome (se houver)
          email: formData.email,
          identification: {
            type: "CPF",
            number: formData.cpf.replace(/\D/g, ""), // Remove caracteres não numéricos do CPF
          },
        },
        shipments: {
          receiver_address: {
            zip_code: "12312-123",
            state_name: "Rio de Janeiro",
            city_name: "Buzios",
            street_name: "Av das Nacoes Unidas",
            street_number: 3003,
          },
        },
      },
      description: "Payment for product",
      external_reference: "MP0001",
      payment_method_id: "pix", // Indica que é um pagamento via PIX
      transaction_amount: 58.8,
    };

    const response = await api.post("/payments", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
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
            <input onChange={handleChange} name="email" type="email" required />
          </div>
          <div>
            <label>Nome:</label>
            <input onChange={handleChange} name="nome" type="text" required />
          </div>
          <div>
            <label>CPF:</label>
            <input onChange={handleChange} name="cpf" type="text" required />
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
