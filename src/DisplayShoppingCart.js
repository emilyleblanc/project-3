// import ShoppingCart.js

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