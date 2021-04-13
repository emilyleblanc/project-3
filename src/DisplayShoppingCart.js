// import ShoppingCart.js

// SHOPPING CART COMPONENT IS THE INFORMATION DISPLAYED IN THE SHOPPING CART SECTION WHEN ITEM IS SELECTED FOR PURCHASE. IT IS REPRESENTED IN A TABLE 

const ShoppingCart = (props) => {

//   const handleRemoveFromCart = () => {
//     console.log('clicked')

//     // If item already exists in the shopping cart
//     // lower the quantity by 1
//     // lower the purchase price by the items price

//     // Else remove from shopping cart object
    return(
            <tr>
                <td>{props.purchaseName}</td>
                <td>{props.quantity}</td>
                <td id="totalPurchases">{props.purchasePrice}</td>
                <button onClick ={props.remove}>remove</button>
            </tr>
    )
};
            

export default ShoppingCart;


    
