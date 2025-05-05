import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { Metadata } from "next";
import Menu from '@/componentes/Menu';

export const metadata: Metadata = {
  title: "eShop - NextJS 15 - TypeScript - API - React Bootstrap",
  description: "Usando Next 15 com API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Menu />
        {children}
      </body>
    </html>
  );
}
