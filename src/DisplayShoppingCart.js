// import ShoppingCart.js

// SHOPPING CART COMPONENT IS THE INFORMATION DISPLAYED IN THE SHOPPING CART SECTION WHEN ITEM IS SELECTED FOR PURCHASE. IT IS REPRESENTED IN A TABLE 

const ShoppingCart = (props) => {
    return(
            <tr>
                <td>{props.purchaseName}</td>
                <td>{props.quantity}</td>
                <td id="totalPurchases">{props.purchasePrice}</td>
            </tr>
    )
};
            

export default ShoppingCart;


    
