/*CartIem class where we define how an added item to cart should look like */
class CartItem {
  constructor(quantity, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
