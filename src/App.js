import React,{useState,useEffect} from "react";

import "./App.css";

import {Bar,Offer} from "./styled.js";



const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500,quantity:1 },
    { id: 2, name: "Smartphone", price: 300 ,quantity:1 },
    { id: 3, name: "Headphones", price: 100 ,quantity:1  },
    { id: 4, name: "Smartwatch", price: 150 ,quantity:1 },
  ];
  
  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 ,quantity:1 };
  const THRESHOLD = 1000;
  


function App(){
    const [Cart,SetCart]=useState([]);
   

    const addToCart=(product)=>{

        const existProduct=Cart.find((prod)=>prod.id===product.id)
        console.log(existProduct);
        if(!existProduct){
            SetCart([...Cart,{...product,quantity:1}])
            console.log(product)
          
        }
            
        
    }

    const increaseQuantity=(product)=>{
        const increaseItem=Cart.map((item)=>{
            if(item.id===product.id){
                return{...item,quantity:item.quantity+1}
            }
            return item
        })
        SetCart(increaseItem)
      
    }
    
    const decreaseQuantity=(product)=>{
       const decreaseItem=Cart.map((item)=>{
        if(item.id===product.id && item.quantity>1){
            return {...item,quantity:item.quantity-1}
        }
        return item
       })

       SetCart(decreaseItem)
   
    }
    
    const priceAndQuantity=Cart.reduce((total,product)=>total+product.price*product.quantity,0)
    console.log("price",priceAndQuantity);


useEffect(()=>{
    const checkingOffer=()=>{
    const priceAndQuantity=Cart.reduce((total,product)=>total+product.price*product.quantity,0)
    const existCheckOffer=Cart.find((item)=>item.id===FREE_GIFT.id)
   
    if(priceAndQuantity>=THRESHOLD && !existCheckOffer){
            
            SetCart([...Cart,FREE_GIFT])
            
        
    }
        
      
    
    if(priceAndQuantity<THRESHOLD && existCheckOffer){
        const filterOffer=Cart.filter((item)=>item.id!==FREE_GIFT.id)
        SetCart(filterOffer)
        
     }

    }
    checkingOffer()

},[Cart]

)


const removeItem=(product)=>{
    const filteredItems=Cart.filter((item)=>item.id!==product.id);
    SetCart(filteredItems)
}


    const offerPrice=THRESHOLD-priceAndQuantity;
    console.log("Offer",offerPrice);

    return(

        <div className="bg-cart">
            <h1>Shopping Cart</h1>
            <div>
                <h2>Products</h2>
                <div className="different-products">
                {
                    PRODUCTS.map((product)=>{
                        return<div className="product" key={product.id}>
                           <span className="product-name">{product.name}</span>
                           <br/>
                           <span className="product-price">$ {product.price}</span>
                           <br/>
                            <button className="cart-button" onClick={()=>addToCart(product)}>Add to Cart</button>
                        </div>
                    })
                }
                </div>
              
            </div>

            
            <div>
                <h2>Cart Summary</h2>
                <div className="cart-summary">
                    <div className="amount">
                        <p>Subtotal:</p>
                        <p>${priceAndQuantity}</p>
                    </div>
                    <hr/>
                    <div>
                        {
                            Cart.length===0 &&
                            <div>
                                Add $ 1000 more to get a FREE Wireless Mouse!
                                <Offer>
                                <Bar data={priceAndQuantity}> </Bar>
                                </Offer>
                                
                            </div>

                        }
                        {
                            offerPrice<1000&&offerPrice>0 &&
                            <div>
                                Add $ {offerPrice} more to get a FREE Wireless Mouse!
                                <Offer>
                                <Bar data={priceAndQuantity}> </Bar>
                                </Offer>
                            </div>
                            
                            
                        }
                        {
                            priceAndQuantity>=1000 &&
                            <div>
                                You got a free Wireless Mouse!
                            </div>
                        }
                      
                    </div>
                </div>

            </div>

            {
                Cart.length===0?
            
            <div className="empty-cart-view">
                <p className="empty">Your Cart is empty</p>
                <p className="empty-para">Add some products to see them here!</p>
            </div>
            :
            <div>
                <h2>Cart Items</h2>
                {
                    Cart.map((product)=>{
                        return(
                            <div className="cart-items" key={product.id}>
                                <div>
                                <p className="cart-product-names">{product.name}</p>
                                <p className="cart-product-prices">${product.price}*{product.quantity}=${product.price*product.quantity}</p>
                                </div>
                                <div>
                                  
                                    {
                                        product.price===0?<span className="free-gift">FREE GIFT</span>
                                        :
                                    <div>
                                <button className="decrease-quantity" onClick={()=>decreaseQuantity(product)}>-</button>
                                &nbsp;&nbsp;{product.quantity}&nbsp;&nbsp;
                                <button className="increase-quantity" onClick={()=>increaseQuantity(product)}>+</button>
                                <br/>
                                <button className="remove-item-button" onClick={()=>removeItem(product)}>Remove</button>
                                  </div>
                                    }


                                    
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
            }






        </div>
    )



    


}

export default App;