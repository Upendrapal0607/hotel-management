export const getMinAndMax = (price) => {
  let min = 100000;
  let max = 0;
  for (let i = 0; i < price.length; i++) {
    if (price[i].price < min) {
      min = price[i].price;
    }
    if (price[i].price > max) {
      max = price[i].price;
    }
  }
  return { min: min, max: max };
};
