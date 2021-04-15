
import './App.css';
import firebase from './firebase'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import SearchBar from './SearchBar'
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
  const newCart = { ...shoppingCart };

  console.log('newCart:', newCart)
  
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
        total: purchase.products.price,
        remove: function() {
          return this.quantity - 1;
        },
      }
    }

    // THIS CODE GIVES ME THE SUM OF ALL THE SHOPPING CART ITEMS IN THE CONSOLE. NEXT STEP PASS THIS INFORMATION TO RENDER IN THE DOM
    
  //   const totalsAddedTogether = document.querySelectorAll('#totalPurchases');
    
  //    const array = []
  //    // turn nodeList into an array and iterate through the array 
  //   Array.from(totalsAddedTogether).forEach((total)=>{
  //    //  collect the integer values of each total in the shoppingCart
  //     const parsedTotal = parseInt(total.textContent)
  //    //  push to the array
  //     array.push(parsedTotal);
  //   });
 
  //  //  determine the sum of that array
  //    const sum = array.reduce(function(a, b, c){
  //    return a + b + c;
  //    }, 0);

  //    console.log(sum)
    
    setShoppingCart(newCart)
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
        console.log(fiber.products.fiber);
        let currentfiber = fiber.products.fiber;
        console.log(currentfiber === filter)
      })

      const filteredInvetory = inventory.filter((result)=>{
          let currentfiber = result.products.fiber;
          return currentfiber === filter;
        })
        
        setInventory(filteredInvetory)
  }
        


  
   


  return (

    <div className="App">
      <nav>
        <SearchBar
        handleFilter = {(filter)=>handleFilter(filter)}/>
        <ul>
          <li><a href="#">
            <i class="fas fa-shopping-bag"
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
              <tr>
                <th>Purchase</th>
                <th>Qty.</th>
                <th>Price</th>
              </tr>

              {/* MAPPING THROUGH SHOPPING CART ITEMS AND CREATING PROPERTIES TO DISPLAY */}

              {
                Object.values(shoppingCart).map((item) => {
                  const { quantity, inventoryItem, total, remove} = item;
                  return <DisplayShoppingCart
                    purchaseName={inventoryItem.products.product_name}
                    quantity={quantity}
                    purchasePrice={total}
                    removeFunction = {remove}
                  />
                })
              }
              <tr>
                <th>Total:</th>
                <td></td>
              </tr>


          
          </table>
          <button>Check Out</button>
        </section>
      </main>

      {/* START OF FOOTER */}
      <footer>created at <span><a href="https://junocollege.com/">Juno College</a></span> by Emily</footer>

    </div>
  );
}
export default App;

































