// cartUtils.js

export const getSubtotal = (cart) => {
  return cart.reduce((total, item) => {
    const price = parseInt(item.price.replace("₹", ""));
    return total + price * item.quantity;
  }, 0);
};

// Now accepts coupon (for free delivery)
export const getDelivery = (subtotal, coupon = null) => {
  if (coupon && coupon.freeDelivery) return 0;
  return subtotal >= 500 ? 0 : 50;
};

export const getGST = (subtotal) => {
  return Math.round(subtotal * 0.05);
};

// Now accepts subtotal to calculate percentage discounts
export const getDiscount = (coupon, subtotal) => {
  if (!coupon) return 0;
  if (coupon.type === "percent") {
    return Math.round(subtotal * (coupon.discount / 100));
  }
  return coupon.discount || 0; // fixed amount
};

// Simplified final total (all params passed)
export const getFinalTotal = (subtotal, delivery, gst, discount) => {
  return subtotal + delivery + gst - discount;
};

export const getTotalItems = (cart) => {
  return cart.reduce((sum, i) => sum + i.quantity, 0);
};
