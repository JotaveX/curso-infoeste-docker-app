/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera .next/standalone: um server.js com apenas o necessário para rodar,
  // o que deixa a imagem Docker final bem menor.
  output: "standalone",
};

export default nextConfig;
