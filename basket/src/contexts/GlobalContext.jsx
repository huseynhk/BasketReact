import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProduct = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBasket = basket.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToBasket = (productId) => {
    const addProduct = products.find((product) => product.id === productId);
    const existProduct = basket.find((product) => product.id === productId);
    if (addProduct) {
      if (existProduct) {
        toast.warning("Product is already exist!", {
          autoClose: 1500,
        });
      } else {
        const updatedBasket = [...basket, { ...addProduct, count: 1 }];
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

  const incrementQuantity = (productId) => {
    const updatedBasket = basket.map((product) =>
      product.id === productId
        ? { ...product, count: product.count + 1 }
        : product
    );
    setBasket(updatedBasket);
    setQuantity((prevCount) => prevCount + 1);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
  };

  const deccrementQuantity = (productId) => {
    const updatedBasket = basket.map((product) =>
      product.id === productId
        ? // ? { ...product, count: Math.max(1, product.count - 1) }
          {
            ...product,
            count: product.count > 1 ? product.count - 1 : 1,
          }
        : product
    );



    setBasket(updatedBasket);
    setQuantity((prevCount) => prevCount - 1);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
  };

  const calculateTotalPrice = () => {
    const total = basket.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
    const roundedTotal = Math.round(total);
    return roundedTotal;
  };
  // const calculateTotalPrice = () => {
  //   let total = 0;
  //   for (let i = 0; i < basket.length; i++) {
  //     const product = basket[i];
  //     total += product.price * product.quantity;
  //   }
  //   const roundedTotal = Math.round(total);
  //   return roundedTotal;
  // };

  const updateProductCount = () => {
    const total = basket.reduce(
      (total, product) => total + product.count,
      0
    );
    const roundedTotal = Math.round(total);
    setQuantity(roundedTotal);
  };

  useEffect(() => {
    updateProductCount();
  }, [basket]);

  const contextValue = {
    products: filteredProduct,
    filteredProduct,
    searchQuery,
    setSearchQuery,
    setProducts,
    addToBasket,
    basket: filteredBasket,
    setBasket,
    quantity,
    isInBasket,
    removeFromBasket,
    setQuantity,
    removeAllProducts,
    incrementQuantity,
    deccrementQuantity,
    calculateTotalPrice,
  };

  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
