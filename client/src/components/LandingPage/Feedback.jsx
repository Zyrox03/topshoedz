import { Title } from "../../widgets/Title";
export const Feedback = () => {
  const testimonials = [
    {
      name: "Sophie D.",
      text: "Des chaussures de haute qualité et un service exceptionnel ! J'ai trouvé la paire parfaite pour chaque occasion. Livraison rapide et emballage soigné. Je recommande vivement cette boutique en ligne !",
    },
    {
      name: "Alexandre G.",
      text: "Expérience client au top ! Le choix de chaussures est impressionnant, et la navigation sur le site est facile. Mes commandes sont toujours arrivées à temps, et la qualité des produits est toujours au rendez-vous. Merci pour tout !",
    },
    {
      name: "Isabelle M.",
      text: "Je suis fidèle à cette boutique depuis longtemps. Les dernières tendances à des prix compétitifs. Les chaussures sont confortables et durables. Le service client est réactif et courtois. Un lieu incontournable pour tous les amateurs de belles chaussures !",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <Title title="Commentaires" />

      <div className="flex flex-wrap items-center justify-around gap-12">
        {testimonials &&
          testimonials.map(({ name, text }, index) => (
            <div
              key={index}
              className="w-96 max-w-[90%] shadow-xl bg-slate-100 rounded-lg flex flex-col gap-4 p-4 hover:bg-purple-400/50  transition duration-500"
            >
              <i className="text-4xl text-purple-800 fa-solid fa-quote-left"></i>
              <h3 className="text-lg text-purple-800 font-bold">{name} </h3>
              <p className="text-md">{text} </p>
            </div>
          ))}
      </div>
    </div>
  );
};
