"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  table_number: number;
  total: number;
  status: string;
  created_at: string;
};

type OrderItem = {
  id: number;
  order_id: number;
  product_name: string;
  quantity: number;
  price: number;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function chargerCommandes() {
    setLoading(true);

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .order("id", { ascending: true });

    if (ordersError) {
      console.error("Erreur commandes :", ordersError);
    }

    if (itemsError) {
      console.error("Erreur articles :", itemsError);
    }

    setOrders(ordersData || []);
    setOrderItems(itemsData || []);
    setLoading(false);
  }

  async function changerStatut(orderId: number, nouveauStatut: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status: nouveauStatut })
      .eq("id", orderId);

    if (error) {
      alert("Erreur lors de la modification du statut.");
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

  function articlesDeLaCommande(orderId: number) {
    return orderItems.filter((item) => item.order_id === orderId);
  }

  function couleurStatut(status: string) {
    if (status === "En attente") {
      return "bg-yellow-100 text-yellow-800";
    }

    if (status === "En préparation") {
      return "bg-blue-100 text-blue-800";
    }

    if (status === "Prête") {
      return "bg-green-100 text-green-800";
    }

    if (status === "Terminée") {
      return "bg-gray-200 text-gray-700";
    }

    return "bg-gray-100 text-gray-800";
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700">
              Wacha Mood Admin
            </h1>

            <p className="text-gray-600 mt-2">
              Gestion des commandes du restaurant
            </p>
          </div>

          <button
            onClick={chargerCommandes}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            🔄 Actualiser
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-xl">
              Chargement des commandes...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-xl">
              Aucune commande pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {orders.map((order) => {
              const items = articlesDeLaCommande(order.id);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >

                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">

                    <div>
                      <h2 className="text-2xl font-bold">
                        🧾 Commande #{order.id}
                      </h2>

                      <p className="text-xl font-semibold text-green-700 mt-2">
                        🍽️ Table {order.table_number}
                      </p>

                      <p className="text-gray-500 mt-1">
                        {new Date(order.created_at).toLocaleString("fr-FR")}
                      </p>
                    </div>

                    <div className="text-left md:text-right">

                      <p className="text-2xl font-bold mb-3">
                        {Number(order.total).toFixed(2)} €
                      </p>

                      <span
                        className={`inline-block px-4 py-2 rounded-full font-bold ${couleurStatut(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>

                  <div className="border-t pt-4">

                    <h3 className="text-xl font-bold mb-3">
                      🍔 Articles commandés
                    </h3>

                    <div className="space-y-2">

                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="font-semibold">
                            {item.quantity} × {item.product_name}
                          </span>

                          <span>
                            {(Number(item.price) * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>

                  <div className="border-t mt-5 pt-5">

                    <h3 className="font-bold mb-3">
                      Modifier le statut :
                    </h3>

                    <div className="flex flex-wrap gap-3">

                      <button
                        onClick={() =>
                          changerStatut(order.id, "En attente")
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        ⏳ En attente
                      </button>

                      <button
                        onClick={() =>
                          changerStatut(order.id, "En préparation")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        👨‍🍳 En préparation
                      </button>

                      <button
                        onClick={() =>
                          changerStatut(order.id, "Prête")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        ✅ Prête
                      </button>

                      <button
                        onClick={() =>
                          changerStatut(order.id, "Terminée")
                        }
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        ✔️ Terminée
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}