"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  table_number: number;
  total: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function chargerCommandes() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  }

  async function changerStatut(
    orderId: number,
    nouveauStatut: string
  ) {
    const { error } = await supabase
      .from("orders")
      .update({
        status: nouveauStatut,
      })
      .eq("id", orderId);

    if (error) {
      alert("Erreur lors de la modification de la commande.");
      console.error(error);
      return;
    }

    chargerCommandes();
  }

  useEffect(() => {
    chargerCommandes();

    const interval = setInterval(() => {
      chargerCommandes();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">
          Chargement des commandes...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              👨‍🍳 Commandes
            </h1>

            <p className="text-gray-600 mt-2">
              Gestion des commandes du restaurant
            </p>
          </div>

          <button
            onClick={chargerCommandes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-bold"
          >
            🔄 Actualiser
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-xl">
              Aucune commande pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold">
                    🍽️ Table {order.table_number}
                  </h2>

                  <span className="text-sm text-gray-500">
                    #{order.id}
                  </span>

                </div>

                <div className="mb-4">
                  {order.order_items?.map((item) => (

                    <div
                      key={item.id}
                      className="flex justify-between border-b py-2"
                    >
                      <span>
                        {item.quantity} × {item.product_name}
                      </span>

                      <span className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>

                  ))}
                </div>

                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total</span>
                  <span>
                    {Number(order.total).toFixed(2)} €
                  </span>
                </div>

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-2 rounded-full font-semibold ${
                      order.status === "En attente"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "En préparation"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">

                  {order.status === "En attente" && (
                    <button
                      onClick={() =>
                        changerStatut(
                          order.id,
                          "En préparation"
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold"
                    >
                      👨‍🍳 Préparer
                    </button>
                  )}

                  {order.status === "En préparation" && (
                    <button
                      onClick={() =>
                        changerStatut(
                          order.id,
                          "Terminée"
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold"
                    >
                      ✅ Terminée
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}