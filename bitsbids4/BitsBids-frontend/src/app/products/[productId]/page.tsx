"use client";

import Product from "@/Types/product";
import { Message } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

/**
 * The ProductDetails component.
 * @param params The product ID.
 */
const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [placeaBidPopup, setPlaceaBidPopup] = useState(false);
  const bidRef = React.useRef<HTMLInputElement>(null);

  /**
   * Fetches product details based on the product ID.
   */
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${params.productId}`);
        const data = await response.data;
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [params.productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  /**
   * Handles placing a bid on the product.
   */
  const handlePlaceBid = async () => {
    if (!bidRef.current) {
      return;
    }
    const bid = bidRef.current.value;
    if (Number(bid) < product.highestBid) {
      alert("Bid should be greater than highest bid");
      return;
    }
    if (Number(bid) < product.startingBid) {
      alert("Bid should be greater than starting bid");
      return;
    }
    try {
      const response = await axios.post(
        `/api/products/${params.productId}/bid`,
        {
          bid: Number(bid),
          userId: Number(localStorage.getItem("user")),
        }
      );
      const data = await response.data;
      if (data.error) {
        alert(data.error);
        return;
      }
      alert("Bid Placed Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error placing bid:", error);
    } finally {
      setPlaceaBidPopup(false);
    }
  };

  /**
   * Handles chatting with the seller.
   */
  const handleChatWithSeller = async () => {
    try {
      const response = await axios.post(
        `/api/chats/user/${localStorage.getItem("user")}`,
        {
          productId: product.productId,
          message: "I am interested in viewing this product.",
          receiverId: product.user.userId,
        }
      );
      const data = await response.data;
      if (data.error) {
        alert(data.error);
        return;
      }
      alert("Sent a hi message to the seller");
      window.location.href = "/chat";
    } catch (error) {
      console.error("Error placing chat:", error);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 min-h-[100vh]">
      {placeaBidPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center dark:bg-white dark:bg-opacity-25 z-50">
          <div className="bg-white p-10 rounded-md dark:bg-black">
            <h1 className="text-2xl font-bold mb-4">Place a Bid</h1>
            <div className="flex flex-col gap-4">
              <input
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter your bid"
                type="number"
                ref={bidRef}
              />
              <Button
                className="w-full h-12 rounded-md bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
                onClick={handlePlaceBid}
              >
                Place Bid for {product.productName}
              </Button>
              <Button
                color={"error"}
                className="w-full h-12 rounded-md bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
                onClick={() => {
                  setPlaceaBidPopup(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="container flex flex-col md:flex-row items-start gap-8 px-4 md:px-6 ">
        <img
          alt="Sneaker Image"
          className="aspect-[1/1] object-cover object-center"
          height="500"
          src={"https://ucarecdn.com/" + product.image + "/"}
          width="500"
        />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter flex justify-between">
            {product.productName}{" "}
            <Button className="ml-4" onClick={handleChatWithSeller}>
              <Message /> Chat with seller
            </Button>
          </h1>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Starting Bid: {product.startingBid}
          </p>
          <p className="text-base text-zinc-500 dark:text-zinc-400">
            {product.details}
          </p>
          <Button
            className="w-full h-12 rounded-md bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900"
            onClick={() => {
              setPlaceaBidPopup(true);
            }}
          >
            Place Bid
          </Button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {product.highestBid !== 0 ? (
              <>Highest Bid yet is Rs. {product.highestBid}</>
            ) : (
              <>No one has placed a bid yet</>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;