export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  format: string;
  downloadUrl: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "guia-natural-cuidado-perros",
    name: "Guía natural para el cuidado de perros",
    description:
      "Ebook práctico con rutinas, nutrición y hábitos para un bienestar diario.",
    price: 9.99,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
    format: "PDF",
    downloadUrl: "https://cdn.example.com/guia-perros.pdf",
  },
  {
    id: "p2",
    slug: "calendario-vacunas-gatos",
    name: "Calendario de vacunas para gatos",
    description:
      "Imprimible organizado por edad, con recordatorios de refuerzo.",
    price: 4.99,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    format: "PDF imprimible",
    downloadUrl: "https://cdn.example.com/calendario-gatos.pdf",
  },
  {
    id: "p3",
    slug: "plantilla-salud-veterinaria",
    name: "Plantilla editable de salud veterinaria",
    description:
      "Registro editable de controles, síntomas y tratamientos en Word.",
    price: 7.49,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    format: "Word (.docx)",
    downloadUrl: "https://cdn.example.com/plantilla-salud.docx",
  },
];
