"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { menu } from "@/lib/menu";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  const searchParams = useSearchParams();
  const table = searchParams.get("table");

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🍽️ Wacha Mood
          </h1>

          <Link
            href={table ? `/panier?table=${table}` : "/panier"}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            🛒 Voir le panier
          </Link>
        </div>

        {table && (
          <div className="bg-green-600 text-white text-center py-3 rounded-xl mb-8 text-xl font-bold">
            🍽️ Vous êtes à la table {table}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((plat) => (
            <div
              key={plat.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <Image
                src={plat.image}
                alt={plat.name}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-2xl font-bold">
                  {plat.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {plat.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-green-700">
                    {plat.price.toFixed(2)} €
                  </span>

                  <button
                    onClick={() =>
                      addToCart({
                        id: plat.id,
                        name: plat.name,
                        price: plat.price,
                      })
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}