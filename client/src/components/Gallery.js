import { useState, useEffect } from "react";
import "./Gallery.css";

// Import all images from your menu (same as in Menu.js)
import VegSpringRolls from "../Images/Crispy_Veg_Spring_Rolls.jpg";
import PaneerTikka from "../Images/Paneer_Tikka.jpg";
import HaraBharaKabab from "../Images/HaraBharaKabab.jpg";
import VegManchurian from "../Images/VegManchurian.jpg";
import ChilliPaneer from "../Images/ChilliPaneer.jpg";
import CheeseCornBalls from "../Images/CheeseCornBalls.jpg";
import VegCutlet from "../Images/VegCutlet.jpg";
import FrenchFries from "../Images/FrenchFries.jpg";
import GarlicBread from "../Images/GarlicBread.jpg";
import MasalaPapad from "../Images/MasalaPapad.jpg";

import PaneerButterMasala from "../Images/PaneerButterMasala.jpg";
import KadaiPaneer from "../Images/KadaiPaneer.jpg";
import ShahiPaneer from "../Images/ShahPaneer.jpg";
import PalakPaneer from "../Images/PalakPaneer.jpg";
import MixVegCurry from "../Images/MixVegCurry.jpg";
import AlooGobi from "../Images/AlooGobi.jpg";
import DalTadka from "../Images/DalTadka.jpg";
import DalMakhani from "../Images/DalMakhani.jpg";
import VegKolhapuri from "../Images/VegKolhapuri.jpg";
import MalaiKofta from "../Images/Malai_Kofta.jpg";

import VegBiryani from "../Images/VegBiryani.jpg";
import PaneerBiryani from "../Images/PaneerBiryani.jpg";
import JeeraRice from "../Images/JeeraRice.jpg";
import SteamRice from "../Images/SteamRice.jpg";
import FrideRice from "../Images/FrideRice.jpg";
import SchezwanRice from "../Images/SchezwanRice.jpg";
import CurdRice from "../Images/Curd_Rice.jpg";
import LemonRice from "../Images/Lemon_Rice.jpg";

import ButterNaan from "../Images/Butter_Naan.jpg";
import GarlicNaan from "../Images/GarlicNaan.jpg";
import TandooriRoti from "../Images/TandooriRoti.jpg";
import LachhaParatha from "../Images/Lachha_Paratha.jpg";
import Missi_Roti from "../Images/Missi_Roti.jpg";
import StuffedKulcha from "../Images/StuffedKulcha.jpg";

import Gulab_Jamun from "../Images/Gulab_Jamun.jpg";
import Rasgulla from "../Images/Rasgulla.jpg";
import ChocolateBrownie from "../Images/Chocolate_Brownie.jpg";
import IceCream from "../Images/IceCream.jpg";
import KajuKatli from "../Images/Kaju_Katli.jpg";
import GajarHalwa from "../Images/Gajar_Halwa.jpg";

import MasalaChai from "../Images/MasalaChai.jpg";
import ColdCoffee from "../Images/Cold_Coffee.jpg";
import FreshLemonSodha from "../Images/Fresh_Lime_Soda.jpg";
import Mango_Shake from "../Images/Mango_Shake.jpg";
import ButterMilk from "../Images/Buttermilk_image.jpg";
import Lassi from "../Images/lassi_image.jpg";

const galleryData = [
  // Starters
  { img: VegSpringRolls, title: "Veg Spring Rolls", category: "Starters" },
  { img: PaneerTikka, title: "Paneer Tikka", category: "Starters" },
  { img: HaraBharaKabab, title: "Hara Bhara Kabab", category: "Starters" },
  { img: VegManchurian, title: "Veg Manchurian", category: "Starters" },
  { img: ChilliPaneer, title: "Chilli Paneer", category: "Starters" },
  { img: CheeseCornBalls, title: "Cheese Corn Balls", category: "Starters" },
  { img: VegCutlet, title: "Veg Cutlet", category: "Starters" },
  { img: FrenchFries, title: "French Fries", category: "Starters" },
  { img: GarlicBread, title: "Garlic Bread", category: "Starters" },
  { img: MasalaPapad, title: "Masala Papad", category: "Starters" },
  // Main Course
  {
    img: PaneerButterMasala,
    title: "Paneer Butter Masala",
    category: "Main Course",
  },
  { img: KadaiPaneer, title: "Kadai Paneer", category: "Main Course" },
  { img: ShahiPaneer, title: "Shahi Paneer", category: "Main Course" },
  { img: PalakPaneer, title: "Palak Paneer", category: "Main Course" },
  { img: MixVegCurry, title: "Mix Veg Curry", category: "Main Course" },
  { img: AlooGobi, title: "Aloo Gobi", category: "Main Course" },
  { img: DalTadka, title: "Dal Tadka", category: "Main Course" },
  { img: DalMakhani, title: "Dal Makhani", category: "Main Course" },
  { img: VegKolhapuri, title: "Veg Kolhapuri", category: "Main Course" },
  { img: MalaiKofta, title: "Malai Kofta", category: "Main Course" },
  // Rice & Biryani
  { img: VegBiryani, title: "Veg Biryani", category: "Rice & Biryani" },
  { img: PaneerBiryani, title: "Paneer Biryani", category: "Rice & Biryani" },
  { img: JeeraRice, title: "Jeera Rice", category: "Rice & Biryani" },
  { img: SteamRice, title: "Steam Rice", category: "Rice & Biryani" },
  { img: FrideRice, title: "Fried Rice", category: "Rice & Biryani" },
  { img: SchezwanRice, title: "Schezwan Rice", category: "Rice & Biryani" },
  { img: CurdRice, title: "Curd Rice", category: "Rice & Biryani" },
  { img: LemonRice, title: "Lemon Rice", category: "Rice & Biryani" },
  // Breads
  { img: ButterNaan, title: "Butter Naan", category: "Breads" },
  { img: GarlicNaan, title: "Garlic Naan", category: "Breads" },
  { img: TandooriRoti, title: "Tandoori Roti", category: "Breads" },
  { img: LachhaParatha, title: "Lachha Paratha", category: "Breads" },
  { img: Missi_Roti, title: "Missi Roti", category: "Breads" },
  { img: StuffedKulcha, title: "Stuffed Kulcha", category: "Breads" },
  // Desserts
  { img: Gulab_Jamun, title: "Gulab Jamun", category: "Desserts" },
  { img: Rasgulla, title: "Rasgulla", category: "Desserts" },
  { img: ChocolateBrownie, title: "Chocolate Brownie", category: "Desserts" },
  { img: IceCream, title: "Ice Cream", category: "Desserts" },
  { img: KajuKatli, title: "Kaju Katli", category: "Desserts" },
  { img: GajarHalwa, title: "Gajar Halwa", category: "Desserts" },
  // Beverages
  { img: MasalaChai, title: "Masala Chai", category: "Beverages" },
  { img: ColdCoffee, title: "Cold Coffee", category: "Beverages" },
  { img: FreshLemonSodha, title: "Fresh Lime Soda", category: "Beverages" },
  { img: Mango_Shake, title: "Mango Shake", category: "Beverages" },
  { img: ButterMilk, title: "Buttermilk", category: "Beverages" },
  { img: Lassi, title: "Lassi", category: "Beverages" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Starters",
    "Main Course",
    "Rice & Biryani",
    "Breads",
    "Desserts",
    "Beverages",
  ];

  const filteredImages =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  const closeLightbox = () => setSelectedIndex(null);

  // Only close on Escape key – removed arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex !== null && e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Our Delicious Moments 🍽️</h2>

      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => {
              setFilter(cat);
              setSelectedIndex(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery">
        {filteredImages.map((item, i) => (
          <div className="gallery-item" key={i}>
            <img
              src={item.img}
              alt={item.title}
              onClick={() => setSelectedIndex(i)}
            />
            <div className="overlay">
              <h4>{item.title}</h4>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close" onClick={closeLightbox}>
            ✖
          </span>
          <img
            src={filteredImages[selectedIndex].img}
            alt={filteredImages[selectedIndex].title}
            className="lightbox-img"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
