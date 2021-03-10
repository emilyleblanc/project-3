// import ShoppingCart.js

// SHOPPING CART COMPONENT IS THE INFORMATION DISPLAYED IN THE SHOPPING CART SECTION WHEN ITEM IS SELECTED FOR PURCHASE. IT IS REPRESENTED IN A TABLE 

const ShoppingCart = (props) => {
    

    return(
            <tr>
                <th>{props.purchaseName}</th>
                <th>{props.quantity}</th>
                <th>{`$${props.purchasePrice}`}</th>
            </tr>
    )
};
            

export default ShoppingCart;