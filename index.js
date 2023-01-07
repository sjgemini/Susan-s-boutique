import { products } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid' 

let totalQuantity = products[0].quantity + products[1].quantity + products[2].quantity
let basketArray = []
let totalPriceEl = document.getElementById('total-price-el')
const paymentForm = document.getElementById('payment-form')
const productId = products.id
const btnEl = document.getElementById('btn-el')
const removeBtn = document.getElementById('remove-btn')
const modal = document.getElementById('modal')
const basketEl = document.getElementById('basket-el')

// event listeners targeting the buttons
document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
        handleTotalPrice(e.target.dataset.add)
          
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
        handleTotalPrice(e.target.dataset.remove)
    
    } else if (e.target.id == 'buy-btn') {
        handleCheckoutModal()
        
    } else if (e.target.id == 'close-modal-btn') {
       handleCloseCheckoutModal()
  
    }
})


// event listener that targets the pay button and returns a thank you message
paymentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')
    
    modal.style.display = 'none'
    
    basketEl.innerHTML = `
    <div class='thanks-msg'>
      <h1 class='thanks'>Thank you ${fullName} for your order!</h1>
    </div>`
})


// function to add items to the basket
function handleAddClick (productId, index) {
      let targetProductObj = products.filter(function(product) {
          return product.uuid === productId
          })[0]
         
      if (!basketArray.includes(targetProductObj)) {
          basketArray.push(targetProductObj)
      } else {
          targetProductObj.quantity++
      }
      
     render()   
 }

// function to remove items from the basket
function handleRemoveClick(productId, index) {
    let targetProductItem = products.filter(function(product) {
        return product.uuid === productId
    })[0]
    
     if (basketArray[productId].quantity === 1) {
        basketArray.splice(productId, 1) 
     } else {
        basketArray[productId].quantity--
     }
    console.log(productId)
    
    render()
}


// function to add togther the total prices of items added to the basket
function handleTotalPrice() {
    let totalPrice = 0
    for (let product of basketArray) {
        totalPrice = totalPrice + product.price * product.quantity
        document.getElementById('total-price-el').innerText = 'Total Price: ' + ' £' + totalPrice
    }
}


// makes the pay screen appear when complete purchase button is clicked
function handleCheckoutModal() {
    document.getElementById('modal').classList.add('visible')
}


// makes the pay screen disappear when the close button is clicked
function handleCloseCheckoutModal() {
     document.getElementById('modal').classList.remove('visible')
}


function getBasket() {
    let basketHtml = ``
    if (basketArray.length > 0) {
     basketHtml += `
     <div class="basket-el">
     <h1 class="title" id='title'>Your Basket</h1>
     `  
    }
     basketArray.forEach(function(product, index) {
        
     basketHtml += ` 
     <div class='basketTotal'>   
     <h4 class='basket'>${product.name}</h4>
     <button id='remove-btn' class='remove-btn' data-remove='${index}'>REMOVE'</button>
     <h6 class='quantity' id='quantity' data-add='${product.quantity}'>${product.quantity}</h6>
     <h4 class='basket'>£${product.price * product.quantity}</h4>
     </div>
  
     `
  });
  
    if (basketArray.length > 0) {
     basketHtml += `
     <div class='total-price' id='total-price'>
     <h2 class='total' id='total'></h2>
     <h2 class='total-price-el' id='total-price-el'></h2>
     </div>
     <button class='buy-btn' id='buy-btn'>Complete Purchase</button>
     </div>
     `
    }
     return basketHtml
 } 
       
       
function getProducts() {
    
    let clothingHtml = ``
    
    products.forEach(function(product) {
    clothingHtml +=  `
     <div class="clothing">
         <div class="item-container">
             <img src="${product.image}" class="item-image" data-image="${product.uuid}">
             <div class="item-info">
                 <h4 class="item" data-name="${product.uuid}">${product.name}</h4>
                 <p class="description" data-description="${product.uuid}">${product.description}</p>
                 <h4 class="price" data-price="${product.uuid}">£${product.price}</h4>
             </div>
             <div class='add-btn'>
             <button class="btn-el add" id="add" data-add="${product.uuid}">+</button>
             </div>
         </div>
     </div>`
})
return clothingHtml
}         


function render() {
    document.getElementById('listings-el').innerHTML = getProducts()
    document.getElementById('basket-el').innerHTML = getBasket()
}

render()