import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { CartContext } from "./CartContext";

function Addtocart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext) || {};

  if (!cart) {
    return (
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold mb-6 text-pink-500">Your Cart</h1>
        <div className="text-center">
          <p className="text-gray-600 mb-4">Error loading cart. Please try again.</p>
          <Link to="/Menu">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-pink-500">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/Menu">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={item.mainImage || "/placeholder-image.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                  onError={(e) => (e.target.src = "/placeholder-image.png")}
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity && updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart && removeFromCart(item.id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border-t">
            <p className="text-xl font-semibold">
              Total: ${getTotalPrice ? getTotalPrice() : "0.00"}
            </p>
            <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addtocart;