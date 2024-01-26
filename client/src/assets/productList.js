import shoe1 from "./TopShoesImages/1.jpg";
import shoe2 from "./TopShoesImages/2.jpg";
import shoe3 from "./TopShoesImages/3.jpg";
import shoe4 from "./TopShoesImages/4.jpg";
import shoe5 from "./TopShoesImages/5.jpg";
import shoe6 from "./TopShoesImages/6.jpg";
import shoe7 from "./TopShoesImages/7.jpg";
import shoe8 from "./TopShoesImages/8.jpg";

const productsList = [
  {
    name: "Air Force Montante",
    price: 19.99,
    oldPrice: 40,
    images: [
      {
        image: shoe1,
        productColor: "Black",
      },
      {
        image: shoe2,
        productColor: "White",
      },
      {
        image: shoe3,
        productColor: "Beige",
      },
    ],

    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",

    stock: 50,
    size: [40, 41, 43, 66, 44],
  },
  {
    name: "Nike Dunk Low Off",
    price: 29.99,
    images: [
      {
        image: shoe4,
        productColor: "Black",
      },
      {
        image: shoe5,
        productColor: "White",
      },
      {
        image: shoe6,
        productColor: "Beige",
      },
    ],

    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 30,
  },
  {
    name: "Baskets montantes",
    price: 49.99,
    oldPrice: 55,
    images: [
      { image: shoe7, productColor: "Red" },
      { image: shoe8, productColor: "Red" },
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 20,
  },
  {
    name: "Produit 4",
    price: 39.99,
    oldPrice: 100,
    images: [
      {
        image: shoe4,
        productColor: "Black",
      },
      {
        image: shoe5,
        productColor: "White",
      },
      {
        image: shoe6,
        productColor: "Beige",
      },
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 25,
  },
  {
    name: "Produit 5",
    price: 59.99,
    oldPrice: 70,
    images: [
      {
        image: shoe4,
        productColor: "Black",
      },
      {
        image: shoe5,
        productColor: "White",
      },
      {
        image: shoe6,
        productColor: "Beige",
      },
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 15,
  },
  {
    name: "Produit 6",
    price: 79.99,
    images: [
      {
        image: shoe4,
        productColor: "Black",
      },
      {
        image: shoe5,
        productColor: "White",
      },
      {
        image: shoe6,
        productColor: "Beige",
      },
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 35,
  },
  {
    name: "Produit 7",
    price: 69.99,
    oldPrice: 80,
    images: [
      {
        image: shoe4,
        productColor: "Black",
      },
      {
        image: shoe5,
        productColor: "White",
      },
      {
        image: shoe6,
        productColor: "Beige",
      },
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 40,
  },
  {
    name: "Produit 8",
    price: 89.99,
    oldPrice: 100,

    images: [
      {
        image: shoe4,
        productColor: "Black",
      },
      {
        image: shoe5,
        productColor: "White",
      },
      {
        image: shoe6,
        productColor: "Beige",
      },
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 18,
  },
];

export default productsList;
