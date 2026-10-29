import "./globals.css";

export const metadata = {
  title: "Todo List",
  description: "Exemplo de CRUD com Next.js + MongoDB rodando no Docker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
