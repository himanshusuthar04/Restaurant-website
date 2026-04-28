import React, { useContext } from "react";
import "./Menu.css";
import { CartContext } from "../context/CartContext";

// Images (same as yours)
import VegSpringRolls from "../Images/Crispy_Veg_Spring_Rolls.jpg";
import PaneerTikka from "../Images/Paneer_Tikka.jpg"
import HaraBharaKabab from "../Images/HaraBharaKabab.jpg"
import VegManchurian from "../Images/VegManchurian.jpg"
import ChilliPaneer from "../Images/ChilliPaneer.jpg"
import CheeseCornBalls from "../Images/CheeseCornBalls.jpg"
import VegCutlet from "../Images/VegCutlet.jpg"
import FrenchFries from "../Images/FrenchFries.jpg"
import GarlicBread from "../Images/GarlicBread.jpg"
import MasalaPapad from "../Images/MasalaPapad.jpg"


import PaneerButterMasala from "../Images/PaneerButterMasala.jpg"
import KadaiPaneer from "../Images/KadaiPaneer.jpg" 
import ShahiPaneer from "../Images/ShahPaneer.jpg"
import PalakPaneer from "../Images/PalakPaneer.jpg"
import MixVegCurry from "../Images/MixVegCurry.jpg"
import AlooGobi from "../Images/AlooGobi.jpg"
import DalTadka from "../Images/DalTadka.jpg"
import DalMakhani from "../Images/DalMakhani.jpg"
import VegKolhapuri from "../Images/VegKolhapuri.jpg"; 
import MalaiKofta from "../Images/Malai_Kofta.jpg";

import VegBiryani from "../Images/VegBiryani.jpg"
import PaneerBiryani from "../Images/PaneerBiryani.jpg"
import JeeraRice from "../Images/JeeraRice.jpg"
import SteamRice from "../Images/SteamRice.jpg"
import FrideRice from "../Images/FrideRice.jpg"
import SchezwanRice from "../Images/SchezwanRice.jpg"
import CurdRice from "../Images/Curd_Rice.jpg"
import LemonRice from "../Images/Lemon_Rice.jpg"

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

const Menu = () => {
  const { cart, addToCart, increaseQty, decreaseQty } = useContext(CartContext);

  // Get quantity by id (not name)
  const getQty = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Menu data with UNIQUE ID for each item
  const menuData = [
    {
      category: "🥗 Starters", 
      items: [
        { id: 101, name: "Veg Spring Rolls", price: "₹180", img: VegSpringRolls },
        { id: 102, name: "Paneer Tikka", price: "₹220", img: PaneerTikka },
        { id: 103, name: "Hara Bhara Kabab", price: "₹200", img: HaraBharaKabab },
        { id: 104, name: "Veg Manchurian", price: "₹190", img: VegManchurian },
        { id: 105, name: "Chilli Paneer", price: "₹230", img: ChilliPaneer },
        { id: 106, name: "Cheese Corn Balls", price: "₹210", img: CheeseCornBalls },
        { id: 107, name: "Veg Cutlet", price: "₹150", img: VegCutlet },
        { id: 108, name: "French Fries", price: "₹120", img: FrenchFries },
        { id: 109, name: "Garlic Bread", price: "₹140", img: GarlicBread },
        { id: 110, name: "Masala Papad", price: "₹80", img: MasalaPapad },
      ],
    },
    {
      category: "🍛 Main Course",
      items: [
        { id: 201, name: "Paneer Butter Masala", price: "₹280", img: PaneerButterMasala },
        { id: 202, name: "Kadai Paneer", price: "₹270", img: KadaiPaneer },
        { id: 203, name: "Shahi Paneer", price: "₹300", img: ShahiPaneer },
        { id: 204, name: "Palak Paneer", price: "₹260", img: PalakPaneer },
        { id: 205, name: "Mix Veg Curry", price: "₹240", img: MixVegCurry },
        { id: 206, name: "Aloo Gobi", price: "₹220", img: AlooGobi },
        { id: 207, name: "Dal Tadka", price: "₹200", img: DalTadka },
        { id: 208, name: "Dal Makhani", price: "₹260", img: DalMakhani },
        { id: 209, name: "Veg Kolhapuri", price: "₹250", img: VegKolhapuri },
        { id: 210, name: "Malai Kofta", price: "₹290", img: MalaiKofta },
      ],
    },
    {
      category: "🍚 Rice & Biryani",
      items: [
        { id: 301, name: "Veg Biryani", price: "₹250", img: VegBiryani },
        { id: 302, name: "Paneer Biryani", price: "₹280", img: PaneerBiryani },
        { id: 303, name: "Jeera Rice", price: "₹150", img: JeeraRice },
        { id: 304, name: "Steam Rice", price: "₹120", img: SteamRice },
        { id: 305, name: "Fried Rice", price: "₹200", img: FrideRice },
        { id: 306, name: "Schezwan Rice", price: "₹220", img: SchezwanRice },
        { id: 307, name: "Curd Rice", price: "₹180", img: CurdRice },
        { id: 308, name: "Lemon Rice", price: "₹170", img: LemonRice },
      ],
    },
    {
      category: "🥖 Breads",
      items: [
        { id: 401, name: "Butter Naan", price: "₹40", img: ButterNaan },
        { id: 402, name: "Garlic Naan", price: "₹60", img: GarlicNaan },
        { id: 403, name: "Tandoori Roti", price: "₹30", img: TandooriRoti },
        { id: 404, name: "Lachha Paratha", price: "₹70", img: LachhaParatha },
        { id: 405, name: "Missi Roti", price: "₹50", img: Missi_Roti },
        { id: 406, name: "Stuffed Kulcha", price: "₹80", img: StuffedKulcha },
      ],
    },
    {
      category: "🍰 Desserts",
      items: [
        { id: 501, name: "Gulab Jamun", price: "₹120", img: Gulab_Jamun },
        { id: 502, name: "Rasgulla", price: "₹110", img: Rasgulla },
        {
          id: 503,
          name: "Chocolate Brownie",
          price: "₹150",
          img: ChocolateBrownie,
        },
        { id: 504, name: "Ice Cream", price: "₹100", img: IceCream },
        { id: 505, name: "Kaju Katli", price: "₹200", img: KajuKatli },
        { id: 506, name: "Gajar Halwa", price: "₹160", img: GajarHalwa },
      ],
    },
    {
      category: "🥤 Beverages",
      items: [
        { id: 601, name: "Masala Chai", price: "₹50", img: MasalaChai },
        { id: 602, name: "Cold Coffee", price: "₹120", img: ColdCoffee },
        {
          id: 603,
          name: "Fresh Lime Soda",
          price: "₹90",
          img: FreshLemonSodha,
        },
        { id: 604, name: "Mango Shake", price: "₹130", img: Mango_Shake },
        { id: 605, name: "Buttermilk", price: "₹60", img: ButterMilk },
        { id: 606, name: "Lassi", price: "₹100", img: Lassi },
      ],
    },
  ];

  return (
    <div className="menu-page">
      <h1 className="menu-title">Our Full Menu 🍽️</h1>

      {menuData.map((section, index) => (
        <div key={index} className="menu-section">
          <h2 className="category-title">{section.category}</h2>
          <div className="menu-grid">
            {section.items.map((item) => {
              const qty = getQty(item.id);
              return (
                <div key={item.id} className="menu-card">
                  <img src={item.img} alt={item.name} />
                  <div className="menu-content">
                    <div className="menu-header">
                      <h3>{item.name}</h3>
                      <span className="price">{item.price}</span>
                    </div>

                    {qty === 0 ? (
                      <button
                        className="add-btn"
                        onClick={() => addToCart(item)}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="qty-controls">
                        <button onClick={() => decreaseQty(item.id)}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
