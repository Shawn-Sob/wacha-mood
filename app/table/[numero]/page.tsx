"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function TablePage() {
  const params = useParams();
  const numero = params.numero;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">
        🍽️ Table {numero}
      </h1>

      <p className="text-xl mb-8">
        Bienvenue chez Wacha Mood
      </p>

      <Link
        href={`/?table=${numero}`}
        className="bg-green-600 text-white px-8 py-4 rounded-xl text-xl"
      >
        Voir le menu
      </Link>
    </main>
  );
}