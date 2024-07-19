import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { MdShoppingBasket } from "react-icons/md";
import { useGlobalContext } from "../contexts/GlobalContext";

const Navbar = () => {
  const { quantity, setQuantity, searchQuery, setSearchQuery } =
    useGlobalContext();
  const { pathname } = useLocation();

  useEffect(() => {
    const savedBasketString = localStorage.getItem("basketArray");
    if (savedBasketString) {
      const savedBasket = JSON.parse(savedBasketString);
      setQuantity(savedBasket.length);
    }
  }, []);

  return (
    <>
      <div className="px-3 py-8 bg-gray-800 text-gray-300 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 rounded-lg text-gray-800 outline outline-2 mr-3"
        />
        <Link
          className={`font-medium mr-3 text-[28px] ${
            pathname === ROUTER.Product ? "text-[#D63626]" : "text-[#828282]"
          } cursor-pointer`}
          to={ROUTER.Product}
        >
          Products
        </Link>
        <Link
          className={`font-medium mr-3  ${
            pathname === ROUTER.Basket ? "text-[#D63626]" : "text-[#828282]"
          } cursor-pointer`}
          to={ROUTER.Basket}
        >
          <div className="flex items-center justify-center">
            <MdShoppingBasket className=" text-5xl" />
            <span className="bg-red-500 mb-5 text-white h-7 w-7 rounded-full px-2 py-1 flex items-center justify-center">
              <span className="text-xl ">{quantity}</span>
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
