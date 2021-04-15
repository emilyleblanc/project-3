
import './App.css';
import firebase from './firebase'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'


function App() {
  const [inventory, setInventory] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  const [total, setTotal] = useState(0)



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
  const newCart = { ...shoppingCart };
  
  const handleAddInventoryToCart = (purchase) => {
   
    if (newCart[purchase.uniqueKey]) {
      const cartItem = newCart[purchase.uniqueKey];
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.total = cartItem.total + purchase.products.price;
      // get nodeList of table elements
      
    } else {
      newCart[purchase.uniqueKey] = {
        quantity: 1,
        inventoryItem: purchase,
        total: purchase.products.price
      }
    }

    console.log('purchase price',purchase.products.price)

    // THIS CODE GIVES ME THE SUM OF ALL THE SHOPPING CART ITEMS IN THE CONSOLE. NEXT STEP PASS THIS INFORMATION TO RENDER IN THE DOM
    
    const totalsAddedTogether = document.querySelectorAll('#totalPurchases');

    console.log(totalsAddedTogether)
    
     const array = []
     console.log('array:', array)
     // turn nodeList into an array and iterate through the array 
    Array.from(totalsAddedTogether).forEach((total)=>{
     //  collect the integer values of each total in the shoppingCart
      const parsedTotal = parseInt(total.textContent)
     //  push to the array
      array.push(parsedTotal);
    });
 
   //  determine the sum of that array
    
     const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, purchase.products.price);

     console.log(sum);
     
     setShoppingCart(newCart)
     setTotal(sum);
  }

  const slideOutMenu = () => {
    document.getElementById('shoppingCart').classList.remove('shoppingCart');
    document.getElementById('shoppingCart').classList.add('openMenu');
  }
    

  const closeMenu = () => {
    document.getElementById('shoppingCart').classList.remove('openMenu');
    document.getElementById('shoppingCart').classList.add('shoppingCart');

  }

  const handleFilter = (filter) => {
    console.log('handle filter');
    console.log('our filter is :', filter);
    console.log(inventory);
    inventory.forEach((fiber)=>{
        let currentfiber = fiber.products.fiber;
        console.log(currentfiber === filter)
      })

      const filteredInventory = inventory.filter((result)=>{
          let currentfiber = result.products.fiber;
          console.log(currentfiber)
          return currentfiber === filter;
        })
        
        setInventory(filteredInventory)
  }
        


  
   


  return (

    <div className="App">
      <nav>
        <SearchBar
        handleFilter = {(filter)=>handleFilter(filter)}/>
        <ul>
          <li><a href="#">
            <i className="fas fa-shopping-bag"
            onClick = {slideOutMenu}></i>
            </a>
          </li>
        </ul>
      </nav>

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

        <section 
        className={'shoppingCart wrapper'}
        id={'shoppingCart'}
        >
          <div onClick = {closeMenu}><i class="fas fa-times"></i></div>
          <table>
            <thead>
                <th>Purchase</th>
                <th>Qty.</th>
                <th>Price</th>
            </thead>

              {/* MAPPING THROUGH SHOPPING CART ITEMS AND CREATING PROPERTIES TO DISPLAY */}

              {
                Object.values(shoppingCart).map((item) => {
                  const { quantity, inventoryItem, total} = item;
                  return <DisplayShoppingCart
                  purchaseName={inventoryItem.products.product_name}
                  quantity={quantity}
                  purchasePrice={total}
                  />
                })
              }
              <tr>
                <th>Total:</th>
                <td>{`$${total}.00`}</td>
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

































