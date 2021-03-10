// import ShoppingCart.js

const ShoppingCart = (props) => {
    

    return(
            <tr>
                <th>{props.purchaseName}</th>
                <th>{props.quantity}</th>
                <th>{`$${props.purchasePrice}`}</th>
                <th><button onClick={props.removeFromCart}>{`remove`}</button></th>
            </tr>
    )
};
            

export default ShoppingCart;