// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  // A porta 3000 é a do seu backend
  baseURL: 'http://localhost:3000/uni7',
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de forma consistente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro com resposta do servidor (4xx, 5xx)
      const status = error.response.status;
      const message = error.response.data?.erro || error.response.data?.message || 'Erro no servidor';
      const details = error.response.data?.detalhes || '';
      
      if (status === 503) {
        console.error('❌ Erro 503 - Serviço Indisponível:', message);
        throw new Error('Banco de dados não está acessível. Verifique a conexão com o SQL Server.');
      } else if (status === 500) {
        console.error('❌ Erro 500 - Servidor:', message);
        throw new Error(details || 'Erro no servidor. Verifique se o banco de dados está conectado.');
      } else if (status === 404) {
        console.error('❌ Erro 404 - Não encontrado:', message);
        throw new Error('Recurso não encontrado.');
      } else if (status >= 400 && status < 500) {
        console.error(`❌ Erro ${status}:`, message);
        throw new Error(message);
      }
      
      throw new Error(message);
    } else if (error.request) {
      // Requisição foi feita mas sem resposta (servidor offline)
      console.error('❌ Servidor não está respondendo. Verifique se o backend está rodando.');
      throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 3000.');
    } else {
      // Erro na configuração da requisição
      console.error('❌ Erro na requisição:', error.message);
      throw new Error(error.message);
    }
  }
);

export default api;