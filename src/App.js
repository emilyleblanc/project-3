
import './App.css';
import firebase from './firebase'
import Header from './Header'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import {useState, useEffect} from 'react'

function App() {
  const [inventory,setInventory] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  


//  declaring variables to store firebase data




// on mount the inventory data from firebase is stored in an array called yarnBag
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
      console.log(yarnBag);
    })
  },[]);
  
  const handleCart = (purchase) => {
    // increase the value of quantity by one when pushed to page
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
    // 2.increase the value of quantiy by one when handle cart is called
    setShoppingCart(newCart)
    console.log(newCart);
    // instead of shopping cart adding purchase. maybe it adds the quantity property?
    
  }
  // 3. put the quantity on the page
  // 4.create a prop and pass to component. 



  const handleRemovePurchase = (purchase) => {
    const updatedShoppingCart = shoppingCart.filter(item => {
      return item !== purchase
   })
   setShoppingCart(updatedShoppingCart);
  }



  
  
  return (

    <div className="App">
      <Header/>

      {/* start of main */}
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
      {/* start of shopping cart section */}
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
            removeFromCart = {() => handleRemovePurchase(inventoryItem.uniqueKey)}
            />
          })
        }

        </table>
      </section>
      <footer>created at <span><a href="https://junocollege.com/">Juno College</a></span> by Emily</footer>
    </div>
    );
  }
  export default App;
        

   
    

 

    
    


     


       
      
       
      

