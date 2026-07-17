"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  function connexion() {
    if (password === "Wacha2026!") {
      localStorage.setItem("admin", "true");
      router.push("/cuisine");
    } else {
      alert("Mot de passe incorrect");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          🔐 Connexion Cuisine
        </h1>

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={connexion}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
        >
          Se connecter
        </button>
      </div>
    </main>
  );
}