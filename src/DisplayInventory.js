// DisplayInventory.js

// DISPLAY INVENTORY COMPONENT DISPLAY DESCRIPTIVE INFORMATION ABOUT THE PRODUCTS FOR SALE. ALL DATA IS COLLECTED FROM FIREBASE. 

const DisplayInventory = (props)=> {
    return(
        
        <li>
            <img src={props.image} alt={props.altTag}/>
            <h2>{props.productName}</h2>
            <p>{props.fiber}</p>
            <p>{`$${props.price}`}</p>
            <button onClick={props.addToCart}>{`Add to Cart`}</button>
        </li>
    )
}

                


export default DisplayInventory;
            