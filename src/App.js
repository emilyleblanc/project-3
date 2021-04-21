
import './App.css';
import firebase from './firebase'
import DisplayInventory from './DisplayInventory'
import DisplayShoppingCart from './DisplayShoppingCart'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'


function App() {
  const [allInventory, setAllInventory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  const [total, setTotal] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);



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
    
      setAllInventory(yarnBag);
      setSelectedInventory(yarnBag);
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
    } else {
      newCart[purchase.uniqueKey] = {
        quantity: 1,
        inventoryItem: purchase,
        total: purchase.products.price
      }
    }
    
    setInventoryCount(inventoryCount + 1)
    // THIS CODE GIVES ME THE SUM OF ALL THE SHOPPING CART ITEMS IN THE CONSOLE. NEXT STEP PASS THIS INFORMATION TO RENDER IN THE DOM
    
    const totalsAddedTogether = document.querySelectorAll('#totalPurchases');
    
     const array = []
     // turn nodeList into an array and iterate through the array 
    Array.from(totalsAddedTogether).forEach((total)=>{
     //  collect the integer values of each total in the shoppingCart
      const parsedTotal = parseInt(total.textContent)
     //  push to the array
      array.push(parsedTotal);
    });
 
   //  determine the sum of that array
   const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, purchase.products.price);
    
     
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

  const handleResetSearch = () => {
    const copyOfAllInventory = [...allInventory];
    setSelectedInventory(copyOfAllInventory);
  }
  
  const handleFilterByFiber= (fiberSelection) => {
    console.log(fiberSelection);
    if(fiberSelection === "all"){
      console.log('do something different here')
      //reset inventory
      handleResetSearch()
      return 
    }
    console.log('filter')
    const copyOfAllInventory = [...allInventory];
    // filter out only yarns with user's chosen orientation
    const filteredInventoryArray = copyOfAllInventory.filter((fiber)=>{
      return fiber.products.fiber === fiberSelection;
    });
    setSelectedInventory(filteredInventoryArray);
    console.log('filtered products:', filteredInventoryArray)
  };
  
  return (

    <div className="App">
      <nav>
        <SearchBar handleFilterByFiber={handleFilterByFiber}/>
        <ul>
          <li><i className="fas fa-shopping-bag"
            onClick = {slideOutMenu}></i>
            {inventoryCount}
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
              selectedInventory.map((yarn) => {
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
          <div onClick = {closeMenu}><i className="fas fa-times"></i></div>
          <table>
            <tbody>
              <tr>
                <th>Purchase</th>
                <th>Qty.</th>
                <th>Price</th>

              </tr>

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
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
export default App;

































