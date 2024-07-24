import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FiTrash2 } from "react-icons/fi";

const Basket = () => {
  const {
    basket,
    setBasket,
    removeFromBasket,
    setQuantity,
    removeAllProducts,
    incrementQuantity,
    deccrementQuantity,
    calculateTotalPrice,
  } = useGlobalContext();

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basketArray") || []);
    setBasket(savedBasket);
    setQuantity(savedBasket.length);
  }, []);

  return (
    <>
      <div className="h-screen">
        <header className="bg-gray-700 py-5 text-gray-200 flex flex-col justify-center items-center">
          <h3 className="text-3xl font-bold text-stone-300 mb-2">
            Total: {calculateTotalPrice()}
          </h3>
          <button
            onClick={removeAllProducts}
            className="bg-red-700 rounded-xl py-2 px-5 hover:bg-red-800 transition-all duration-500 text-gray-100 text-3xl"
          >
            Remove
          </button>
        </header>
        {basket.length === 0 && (
          <h2 className="text-green-300 text-4xl font bold m-12">Not Found</h2>
        )}
        <div className="p-5 grid gap-x-20 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {basket.length > 0 ? (
            basket.map((product, index) => (
              <div
                className=" bg-gray-800 text-gray-200 rounded-xl"
                key={index}
              >
                <img
                  className="w-full mb-2 h-52 object-cover rounded-t-xl"
                  src={product.image}
                  alt={product.title}
                />
                <div className=" px-2">
                  <h2 className="text-green-300">
                    Title: {product.title.slice(0, 25)}
                  </h2>
                  <p className="my-3 text-gray-400">
                    {product.description.slice(0, 45)}...
                  </p>
                  <p className=" text-indigo-300">
                    Category :{product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between  p-4">
                  <div>
                    <p className="mb-3 text-cyan-300">${product.price}</p>
                    <p className="text-indigo-300">
                      Rating : {product.rating.rate}
                    </p>
                  </div>
                  <span>$ {(product.price * product.count).toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <button
                        onClick={() => deccrementQuantity(product.id)}
                        className="bg-red-300 text-gray-900 text-2xl rounded-xl py-2 px-3 hover:bg-red-400 transition-all duration-500"
                      >
                        -
                      </button>
                      <span className="mx-2 text-3xl">{product.count}</span>
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className="bg-green-300 text-gray-900 text-xl  py-2 px-3 rounded-xl  hover:bg-green-400 transition-all duration-500"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromBasket(product.id)}
                      className="bg-gray-300 rounded-xl py-2 px-5 hover:bg-gray-400 transition-all duration-500"
                    >
                      <FiTrash2 className="text-3xl text-red-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" flex justify-center items-center">
              <h1 className="text-cyan-700 text-3xl font-bold">
                Basket is empty
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Basket;
