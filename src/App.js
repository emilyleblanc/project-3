
import './App.css';
import firebase from './firebase'
import Header from './Header'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import {useState, useEffect} from 'react'

function App() {
  const [inventory,setInventory] = useState([])
  const [shoppingCart, setShoppingCart] = useState([])
//  declaring variables to store firebase data
  const dbInventory = firebase.database().ref();
 
  
  
  
  // on mount the inventory data from firebase is stored in an array called yarnBag
  useEffect(()=>{
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
  
  
  
  // creates an array called shopping cart and pushes purchased items into it. 
  
  const handleCart = (purchase) => {
    shoppingCart.push(purchase)
    console.log(shoppingCart)
  }
    
  
  return (

    <div className="App">
      <Header/>
      <section className={"gallery wrapper"}>
      {
        inventory.map((yarn)=>{
          return <DisplayInventory 
          key={yarn.uniqueKey}
          fiber={yarn.products.fiber}
          productName={yarn.products.product_name}
          price={yarn.products.price}
          image={yarn.products.image}
          addToCart={() => handleCart(yarn)}
          />
        })
      }
      </section>

      <section className={'shoppingCart wrapper'}>

        <table>
          {/* <h2>Cart:</h2> */}
          <tr>
            <th>Purchase</th>
            <th>Qty.</th>
            <th>Price</th>
          </tr>   

      {
          shoppingCart.map((items)=>{
            return<DisplayShoppingCart
            purchaseName = {items.products.product_name}
            purchasePrice = {items.products.price}/>
          })
        }

        </table>
      </section>
    </div>
    );
  }
  export default App;
        

   
    

 

    
    


     


       
      
       
      

