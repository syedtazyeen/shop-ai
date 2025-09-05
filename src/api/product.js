import skus from "../data/skus.json";

/**
 * Get products from the data
 * @param {string[]} ids - The ids of the products
 * @returns {Object[]} - The product objects
 */
export function getProducts(ids) {
  return skus
    .filter((sk) => ids.includes(sk.id))
    .map((sk) => ({
      name: sk.product_name,
      ...sk,
    }));
}

/**
 * Get product by id from the data
 * @param {string} id - The id of the product
 * @returns {Object} - The product object
 */
export function getProductById(id) {
  const product = skus.find((sk) => sk.id === id);
  if (!product) return null;
  return {
    name: product?.product_name,
    ...product,
  };
}

/**
 * Get categories from the data
 * @returns {string[]} - The categories
 */
export function getCategories() {
  const categories = skus.map((sk) => sk.category);
  return [...new Set(categories)];
}
