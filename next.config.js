/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para abrir o navegador automaticamente
  // Para usar, execute: npm run dev
  experimental: {
    // Outras configurações experimentais podem ser adicionadas aqui
  },
};

// Função para abrir o navegador automaticamente
if (process.env.NODE_ENV === 'development') {
  const { exec } = require('child_process');
  
  // Aguarda 3 segundos para o servidor iniciar e então abre o navegador
  setTimeout(() => {
    const url = 'http://localhost:3001';
    const start = process.platform === 'darwin' 
      ? 'open' 
      : process.platform === 'win32' 
      ? 'start' 
      : 'xdg-open';
    
    exec(`${start} ${url}`);
  }, 3000);
}

module.exports = nextConfig;
