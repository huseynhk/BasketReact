import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [quantity, setQuantity] = useState(0);



  const addToBasket = (productId) => {
    const addProduct = products.find((product) => product.id === productId);
    const existProduct = basket.find((product) => product.id === productId);
    if (addProduct) {
      if (existProduct) {
        toast.warning("Product is already exist!", {
          autoClose: 1500,
        });
      } else {
        const updatedBasket = [...basket, { ...addProduct, quantity: 1 }];
        setBasket(updatedBasket);
        setQuantity((prevCount) => prevCount + 1);
        localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
        toast.success("Product added successfully!", {
          autoClose: 1500,
        });
      }
    } else {
      toast.error("Product not found!", {
        autoClose: 1500,
      });
    }
  };

  const isInBasket = (productId) => {
    const existProduct = basket.find((product) => product.id === productId);
    return existProduct;
  };

  const removeFromBasket = (productId) => {
    const deletedProduct = basket.filter((product) => product.id !== productId);
    setBasket(deletedProduct);
    setQuantity((prevCount) => prevCount - 1);
    localStorage.setItem("basketArray", JSON.stringify(deletedProduct));
    toast.success("Product deleted successfully!", {
      autoClose: 1500,
    });
  };

  const removeAllProducts = () => {
    setBasket([]);
    setQuantity(0);
    localStorage.setItem("basketArray", JSON.stringify([]));
  };

  const contextValue = {
    products,
    setProducts,
    addToBasket,
    basket,
    setBasket,
    quantity,
    isInBasket,
    removeFromBasket,
    setQuantity,
    removeAllProducts,

  };

  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
