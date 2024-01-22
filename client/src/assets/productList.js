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
    images: [shoe1, shoe2, shoe3],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",

    stock: 50,
  },
  {
    name: "Nike Dunk Low Off",
    price: 29.99,
    images: [shoe4, shoe5, shoe6],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 30,
  },
  {
    name: "Baskets montantes",
    price: 49.99,
    oldPrice: 55,
    images: [shoe7, shoe8],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 20,
  },
  {
    name: "Produit 4",
    price: 39.99,
    oldPrice: 100,
    images: [
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
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
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
    ],
    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 15,
  },
  {
    name: "Produit 6",
    price: 79.99,
    images: [
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
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
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
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
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
      "https://scontent.falg1-2.fna.fbcdn.net/v/t39.30808-6/413951530_122135934452073595_2118689815451534574_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGhv-a-3WoQSOk5KTQol_PMkB13ZGHrsneQHXdkYeuyd57BmE3sZxYsQAQMXpXhp6__ZVN28hJLNYY-9lgwmCza&_nc_ohc=RpUNc6THI5sAX-TncOy&_nc_zt=23&_nc_ht=scontent.falg1-2.fna&oh=00_AfAfpe-w_7O1kZaduTw0eqFqN_RUwnzvI_Zt9QL93INCVA&oe=65B1189D",
    ],

    description:
      "Une chaussure de haute qualité allie élégance intemporelle et confort exceptionnel, confectionnée avec des matériaux de premier choix tels que le cuir véritable. Sa conception ergonomique et ses finitions impeccables témoignent d'un savoir-faire artisanal, assurant un ajustement précis et un soutien optimal pour le pied.",
    stock: 18,
  },
];

export default productsList;
