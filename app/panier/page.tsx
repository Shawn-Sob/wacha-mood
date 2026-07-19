"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

function PanierContent() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const table = searchParams.get("table");

  async function envoyerCommande() {
    if (cart.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    const tableNumber = Number(table);

    if (!tableNumber) {
      alert("Numéro de table introuvable.");
      return;
    }

    setLoading(true);

    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          table_number: tableNumber,
          total: total,
          status: "En attente",
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      const items = cart.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) {
        throw itemsError;
      }

      clearCart();

      alert("✅ Votre commande a été envoyée avec succès !");
    } catch (error: any) {
      console.error(error);
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          🛒 Mon panier
        </h1>

        {table && (
          <p className="text-lg text-green-700 font-semibold mb-6">
            🍽️ Table {table}
          </p>
        )}

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-lg">
              Votre panier est vide.
            </p>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-5 mb-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>

                  <p>
                    Quantité : {item.quantity}
                  </p>

                  <p className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Retirer
                </button>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow p-6 mt-6">

              <h2 className="text-3xl font-bold mb-6">
                Total : {total.toFixed(2)} €
              </h2>

              <button
                onClick={envoyerCommande}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold disabled:opacity-50"
              >
                {loading
                  ? "Envoi en cours..."
                  : "✅ Valider la commande"}
              </button>

            </div>
          </>
        )}

        <Link
          href={table ? `/?table=${table}` : "/"}
          className="inline-block mt-8 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
        >
          ← Retour au menu
        </Link>

      </div>
    </main>
  );
}

export default function PanierPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-xl">
            Chargement du panier...
          </p>
        </main>
      }
    >
      <PanierContent />
    </Suspense>
  );
}