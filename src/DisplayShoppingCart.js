// import ShoppingCart.js

const ShoppingCart = (props) => {
    

    return(
            <tr>
                <th>{props.purchaseName}</th>
                <th></th>
                <th>{`$${props.purchasePrice}`}</th>
                <th><button onClick={props.removeFromCart}>{`remove`}</button></th>
            </tr>
    )
};git 
            

export default ShoppingCart;