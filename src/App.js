
import './App.css';
import firebase from './firebase'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import {useState, useEffect} from 'react'

function App() {
  const [inventory,setInventory] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
 
// On mount the inventory of yarn product data from firebase is stored in an array called yarnBag
useEffect(()=>{
    const dbInventory = firebase.database().ref();
    dbInventory.on('value',(data)=>{
      const yarnData = data.val()
      const yarnBag = []
      for(let yarnKey in yarnData){
        yarnBag.push({
          uniqueKey:yarnKey,
          products:yarnData[yarnKey]
        })
      }
      setInventory(yarnBag)
    })
  },[]);

  // handleCart is fired when user presses "Add to Cart"
  // this function stores the purchased item in a useState function to display product name, price and quantityin the shopping cart
  
  const handleCart = (purchase) => {
    const newCart = {...shoppingCart};
    if(newCart[purchase.uniqueKey]){
      const cartItem = newCart[purchase.uniqueKey];
      cartItem.quantity = cartItem.quantity + 1;
    
    }else{
      newCart[purchase.uniqueKey] = {
        quantity:1,
        inventoryItem:purchase
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
        {
          inventory.map((yarn)=>{
            return <DisplayInventory 
            key={yarn.uniqueKey}
            fiber={yarn.products.fiber}
            productName={yarn.products.product_name}
            price={yarn.products.price}
            image={yarn.products.image}
            altTag={yarn.products.alt_tag}
            addToCart={() => handleCart(yarn)}
            />
          })
        }
        </section>
  
        {/* START OF SHOPPING CART SECTION */}
  
        <section className={'shoppingCart wrapper'}>
          <table>
            <tr>
              <th>Purchase</th>
              <th>Qty.</th>
              <th>Price</th>
            </tr>   
  
        {
          Object.values(shoppingCart).map((item)=>{
            const {quantity, inventoryItem} = item;
            return<DisplayShoppingCart
            purchaseName = {inventoryItem.products.product_name}
            quantity = {quantity}
            purchasePrice = {inventoryItem.products.price}
            />
          })
        }
            </table>
          </section>
        </main>
  
        {/* START OF FOOTER */}
  
        <footer>created at <span><a href="https://junocollege.com/">Juno College</a></span> by Emily</footer>
      </div>
      );
    }
    export default App;
    
    
   
    


  
 





  
        

   
    

 

    
    


     


       
      
       
      

