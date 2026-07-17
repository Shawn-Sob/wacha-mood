export default function MenuPage() {
  const plats = [
    {
      id: 1,
      nom: "Pouklet",
      prix: 13.90,
      image: "https://placehold.co/300x200",
    },
    {
      id: 2,
      nom: "Burger Wacha",
      prix: 15.90,
      image: "https://placehold.co/300x200",
    },
    {
      id: 3,
      nom: "Salade César",
      prix: 11.90,
      image: "https://placehold.co/300x200",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        🍽️ Notre Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plats.map((plat) => (
          <div
            key={plat.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={plat.image}
              alt={plat.nom}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">
                {plat.nom}
              </h2>

              <p className="text-green-700 text-xl font-bold mt-2">
                {plat.prix.toFixed(2)} €
              </p>

              <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}