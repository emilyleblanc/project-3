
import './App.css';
import firebase from './firebase'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import { useState, useEffect } from 'react'

function App() {
  const [inventory, setInventory] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
 


  // On mount the inventory of yarn product data from firebase is stored in an array called yarnBag
  useEffect(() => {
    const dbInventory = firebase.database().ref();
    dbInventory.on('value', (data) => {
      const yarnData = data.val()
      const yarnBag = []
      for (let yarnKey in yarnData) {
        yarnBag.push({
          uniqueKey: yarnKey,
          products: yarnData[yarnKey]
        })
      }
    
      setInventory(yarnBag)
    })
  }, []);

  // handleAddInventoryToCart is fired when user presses "Add to Cart"
  // this function stores the clicked item in a useState function to display product name, price and quantity in the shopping cart section
  
  const handleAddInventoryToCart = (purchase) => {
    const newCart = { ...shoppingCart };
    
    if (newCart[purchase.uniqueKey]) {
      const cartItem = newCart[purchase.uniqueKey];

      cartItem.quantity = cartItem.quantity + 1;
      cartItem.total = cartItem.total + purchase.products.price;

      // cartItem.inventoryItem.products.price = cartItem.inventoryItem.products.price + purchase.products.price;
    } else {
      newCart[purchase.uniqueKey] = {
        quantity: 1,
        inventoryItem: purchase,
        total: purchase.products.price,
      }
    }

    setShoppingCart(newCart)
  }
      
      

  return (

    <div className="App">
      {/* START OF HEADER */}
      <header className="wrapper">
        <h1>Knit <span>+</span> Pearl</h1>
      </header>

      {/* START OF MAIN */}
      <main>
        <section className={"gallery wrapper"}>

          {/* MAPPING THROUGH INVENTORY AND APPLYING PROPERTIES TO ADD TO PAGE */}
          <ul>
            {
              inventory.map((yarn) => {
                return <DisplayInventory
                  key={yarn.uniqueKey}
                  fiber={yarn.products.fiber}
                  productName={yarn.products.product_name}
                  price={yarn.products.price}
                  image={yarn.products.image}
                  altTag={yarn.products.alt_tag}
                  addToCart={() => handleAddInventoryToCart(yarn)}
                />
              })
            }

          </ul>
        </section>

        {/* START OF SHOPPING CART SECTION */}

        <section className={'shoppingCart wrapper'}>
          <table>
              <tr>
                <th>Purchase</th>
                <th>Qty.</th>
                <th>Price</th>
              </tr>

              {/* MAPPING THROUGH SHOPPING CART ITEMS AND CREATING PROPERTIES TO DISPLAY */}

              {
                Object.values(shoppingCart).map((item) => {
                  const { quantity, inventoryItem,total } = item;
                  return <DisplayShoppingCart
                    purchaseName={inventoryItem.products.product_name}
                    quantity={quantity}
                    purchasePrice={total}
                  />
                })
              }
              <tr>
                <th>Total:</th>
                <td>{`this will be the total`}</td>

              </tr>

          
          </table>
        </section>
      </main>

      {/* START OF FOOTER */}

      <footer>created at <span><a href="https://junocollege.com/">Juno College</a></span> by Emily</footer>
    </div>
  );
}
export default App;

































