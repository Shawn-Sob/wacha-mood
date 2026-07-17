import "./globals.css";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Wacha Mood",
  description: "Commande en ligne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
