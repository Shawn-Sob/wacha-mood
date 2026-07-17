"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function CuisinePage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function chargerCommandes() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          price
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
  }

  async function changerStatut(id: number, statut: string) {
    const { error } = await supabase
      .from("orders")
      .update({
        status: statut,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    chargerCommandes();
  }

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      router.push("/login");
      return;
    }

    chargerCommandes();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          chargerCommandes();
        }
      )
      .subscribe();

    setLoading(false);

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function deconnexion() {
    localStorage.removeItem("admin");
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Chargement...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          👨‍🍳 Cuisine
        </h1>

        <button
          onClick={deconnexion}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
        >
          Déconnexion
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-2xl">
          Aucune commande.
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">
                  🍽️ Table {order.table_number}
                </h2>

                <span className="bg-yellow-500 text-white px-4 py-2 rounded-full">
                  {order.status}
                </span>
              </div>

              <hr className="my-5" />

              <h3 className="text-xl font-bold mb-3">
                Commande
              </h3>

              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-2"
                >
                  <span>
                    {item.quantity} × {item.product_name}
                  </span>

                  <span>
                    {(item.quantity * item.price).toFixed(2)} €
                  </span>
                </div>
              ))}

              <div className="mt-6 text-2xl font-bold flex justify-between">
                <span>Total</span>
                <span>{Number(order.total).toFixed(2)} €</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">

                <button
                  onClick={() =>
                    changerStatut(order.id, "En attente")
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl"
                >
                  🟡 En attente
                </button>

                <button
                  onClick={() =>
                    changerStatut(order.id, "En préparation")
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
                >
                  🟠 Préparation
                </button>

                <button
                  onClick={() =>
                    changerStatut(order.id, "Prête")
                  }
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                >
                  🟢 Prête
                </button>

                <button
                  onClick={() =>
                    changerStatut(order.id, "Servie")
                  }
                  className="bg-gray-800 hover:bg-black text-white py-3 rounded-xl"
                >
                  ⚫ Servie
                </button>

              </div>

              <p className="mt-5 text-gray-500">
                {new Date(order.created_at).toLocaleString("fr-FR")}
              </p>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}