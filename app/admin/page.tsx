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
  const [connecte, setConnecte] = useState(false);
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);

  function seConnecter() {
    if (motDePasse === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setConnecte(true);
      setErreur("");
    } else {
      setErreur("Mot de passe incorrect.");
    }
  }

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
      console.error(ordersError);
    }

    if (itemsError) {
      console.error(itemsError);
    }

    setOrders(ordersData || []);
    setOrderItems(itemsData || []);
    setLoading(false);
  }

  async function changerStatut(
    orderId: number,
    nouveauStatut: string
  ) {
    const { error } = await supabase
      .from("orders")
      .update({ status: nouveauStatut })
      .eq("id", orderId);

    if (error) {
      alert("Erreur lors de la modification.");
      return;
    }

    chargerCommandes();
  }

  useEffect(() => {
    if (!connecte) return;

    chargerCommandes();

    const interval = setInterval(() => {
      chargerCommandes();
    }, 5000);

    return () => clearInterval(interval);
  }, [connecte]);

  function articlesDeLaCommande(orderId: number) {
    return orderItems.filter(
      (item) => item.order_id === orderId
    );
  }

  if (!connecte) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-2">
            🔒 Wacha Mood Admin
          </h1>

          <p className="text-center text-gray-600 mb-6">
            Accès réservé au restaurant
          </p>

          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                seConnecter();
              }
            }}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <button
            onClick={seConnecter}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
          >
            🔐 Se connecter
          </button>

          {erreur && (
            <p className="text-red-600 text-center mt-4">
              {erreur}
            </p>
          )}

        </div>

      </main>
    );
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
              Gestion des commandes
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={chargerCommandes}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-bold"
            >
              🔄 Actualiser
            </button>

            <button
              onClick={() => setConnecte(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-bold"
            >
              🚪 Déconnexion
            </button>

          </div>

        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            Chargement...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            Aucune commande.
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

                  <div className="flex justify-between mb-5">

                    <div>
                      <h2 className="text-2xl font-bold">
                        🧾 Commande #{order.id}
                      </h2>

                      <p className="text-xl font-semibold text-green-700">
                        🍽️ Table {order.table_number}
                      </p>

                      <p className="text-gray-500">
                        {new Date(order.created_at).toLocaleString("fr-FR")}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="text-2xl font-bold">
                        {Number(order.total).toFixed(2)} €
                      </p>

                      <p className="mt-2 font-bold">
                        {order.status}
                      </p>

                    </div>

                  </div>

                  <div className="border-t pt-4">

                    {items.map((item) => (

                      <div
                        key={item.id}
                        className="flex justify-between bg-gray-50 p-3 rounded-lg mb-2"
                      >
                        <span>
                          {item.quantity} × {item.product_name}
                        </span>

                        <span>
                          {(Number(item.price) * item.quantity).toFixed(2)} €
                        </span>
                      </div>

                    ))}

                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">

                    <button
                      onClick={() =>
                        changerStatut(order.id, "En attente")
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold"
                    >
                      ⏳ En attente
                    </button>

                    <button
                      onClick={() =>
                        changerStatut(order.id, "En préparation")
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
                    >
                      👨‍🍳 En préparation
                    </button>

                    <button
                      onClick={() =>
                        changerStatut(order.id, "Prête")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold"
                    >
                      ✅ Prête
                    </button>

                    <button
                      onClick={() =>
                        changerStatut(order.id, "Terminée")
                      }
                      className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold"
                    >
                      ✔️ Terminée
                    </button>

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
