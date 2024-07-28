function calculateDiscountPercentage(originalPrice, discountedPrice) {
  if (originalPrice <= 0) {
    throw new Error("Original price must be greater than zero.");
  }
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return Math.floor(discountPercentage);
}

export default calculateDiscountPercentage;
