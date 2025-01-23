// categories imported
import category1Img from "./assets/garments.jpg";
import category2Img from "./assets/electronics.webp";
import category3Img from "./assets/shoes.jpeg";
import category4Img from "./assets/furniture.jpeg";
import category5Img from "./assets/restaurants.jpeg";

//brands imported
import sapphire from "./assets/Brands_Logo/sapphire.jpg";
import khaadi from "./assets/Brands_Logo/khaadi.png";
import gulahmad from "./assets/Brands_Logo/GulAhmad.png";
import sanasafinaz from "./assets/Brands_Logo/SanaSafinaz.png";
import mariab from "./assets/Brands_Logo/MariaB.png";
import chenone from "./assets/Brands_Logo/ChenOne.png";
import McDonald from "./assets/Brands_Logo/McDonald's.png";
import kfc from "./assets/Brands_Logo/KFC.png";
import havelirestaurant from "./assets/Brands_Logo/HaveliRestaurant.jpeg";
import butkarahi from "./assets/Brands_Logo/ButKarahi.jpeg";
import bundukhan from "./assets/Brands_Logo/BunduKhan.png";
import alkhan from "./assets/Brands_Logo/alkhan.jpg";

// featured imported
import sapphireFeatured from "./assets/sapphire_featured_1.webp";
import khaadiFeatured from "./assets/khaadi_featured_1.jpg";

//recent imported

export const Categories = [
    { id: 1, name: "clothing", img: category1Img },
    { id: 2, name: "restaurants", img: category5Img },
    { id: 3, name: "electronics", img: category2Img },
    { id: 4, name: "shoes", img: category3Img },
    { id: 5, name: "furniture", img: category4Img },
];

export const AllBrands = [
    { id: 1, categoryId: 1, name: "SAPPHIRE", img: sapphire, latestDiscount: "2025-1-10T16:16:35.621+00:00", location: "Block B, Johar Town, Lahore, Pakistan" },
    { id: 2, categoryId: 1, name: "KHAADI", img: khaadi, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "Ali Town, Lahore, Pakistan" },
    { id: 3, categoryId: 1, name: "Gul Ahmad", img: gulahmad, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "Township, Lahore, Pakistan" },
    { id: 4, categoryId: 1, name: "SANA SAFINAZ", img: sanasafinaz, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "Faisal Town, Lahore, Pakistan" },
    { id: 5, categoryId: 1, name: "MARIA.B.", img: mariab, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase 1, Lahore, Pakistan" },
    { id: 6, categoryId: 1, name: "ChenOne", img: chenone, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase III, Lahore, Pakistan" },
    { id: 7, categoryId: 2, name: "McDonald's", img: McDonald, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase II, Lahore, Pakistan" },
    { id: 8, categoryId: 2, name: "KFC", img: kfc, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase II, Lahore, Pakistan" },
    { id: 9, categoryId: 2, name: "Haveli Restaurant", img: havelirestaurant, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase II, Lahore, Pakistan" },
    { id: 10, categoryId: 2, name: "But Karahi", img: butkarahi, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase II, Lahore, Pakistan" },
    { id: 11, categoryId: 2, name: "Bundu Khan", img: bundukhan, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase II, Lahore, Pakistan" },
    { id: 12, categoryId: 2, name: "Al-Khan Restaurant", img: alkhan, latestDiscount: "2025-1-7T16:16:35.621+00:00", location: "DHA phase II, Lahore, Pakistan" },
];

export const featuredDiscounts = [
    { id: 1, brandId: 1, img: sapphireFeatured },
    { id: 2, brandId: 2, img: khaadiFeatured }
];

export const RecentDiscounts = [
    { id: 1, brandId: 2, date: "2025-1-11T16:16:35.621+00:00", img: khaadiFeatured },
    { id: 2, brandId: 1, date: "2025-1-10T16:16:35.621+00:00", img: sapphireFeatured },
];

export const Discounts = [
    { id: 1, brandId: 1, date: "2025-1-11T16:16:35.621+00:00", img: sapphireFeatured },
    { id: 2, brandId: 2, date: "2025-1-11T16:16:35.621+00:00", img: khaadiFeatured },
];