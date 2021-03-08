// DisplayInventory.js

const DisplayInventory = (props)=> {
    return(
        <li>
            <img src={props.image}/>
            <h2>{props.productName}</h2>
            <p>{props.fiber}</p>
            <p>{`$${props.price}`}</p>
            <button onClick={props.addToCart}>{`Add to Cart`}</button>
        </li>
    )
}

                


export default DisplayInventory
            