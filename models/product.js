/*Product class where we define how a product should look like */
//To add: locationUrl , ownerRating
class Product {
    constructor (id, ownerId, title,
        imageUrl, description, price) {
            this.id = id;
            this.ownerId = ownerId;
            this.title=title;
            this.imageUrl=imageUrl;
            this.description=description;
            this.price=price
        }
}


export default Product