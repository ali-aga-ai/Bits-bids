"use client";

import ProfileChat from "@/Types/ProfileChat";
import Product from "@/Types/product";
import User from "@/Types/user";
import ChatCardProfile from "@/components/ChatCard";
import ProductCard from "@/components/ProductCard";
import useLogin from "@/hooks/useLogin";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
/**
 * The ProfilePage component.
 */
const ProfilePage: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [editShown, setEditShown] = React.useState<
    "campusID" | "hostel" | "phone" | null
  >(null);
  const [editValue, setEditValue] = React.useState("");
  const [productChats, setProductChats] = React.useState<ProfileChat[]>([]);
  const [user, setUser] = React.useState<User | null>(null);

  // const { checkLogin } = useLogin();

  /**
   * Fetches the current user's data.
   */
  const getUser = async () => {
    const res = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ userId: localStorage.getItem("user") }),
      cache: "no-cache",
    });
    const data = await res.json();
    setUser(data);
  };

  /**
   * Fetches the current user's products.
   */
  async function getProducts() {
    try {
      const userId = Cookies.get("userId") || "defaultUserId"; // Get userId from cookies
      const response = await axios.get(
        `http://localhost:8081/api/v1/products/user?userId=${userId}` // Use dynamic userId
      );
      setProducts(response.data); // Update state with fetched products
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]); // Handle errors by setting an empty array
    }
  }

  /**
   * Fetches the chats for each product.
   * @param products The products to fetch chats for.
   */
  const getChats = async (products: Product[]) => {
    const chats = [];
    for (const product of products) {
      const res = await fetch("/api/chats/seller/" + product.productId, {
        cache: "no-cache",
      });
      const data = await res.json();
      chats.push({
        ...data,
        product,
      });
    }
    setProductChats(chats);
  };

  /**
   * Handles editing the user's profile.
   * @param type The type of edit (campusID, hostel, or phone).
   */
  const handleEdit = (type: "campusID" | "hostel" | "phone") => {
    if (user) {
      setEditShown(type);
      setEditValue(user[type]);
    }
  };

  /**
   * Handles saving the edited profile.
   */
  const handleSave = async () => {
    if (editShown === "campusID") {
      const res = await fetch("/api/user/id/", {
        method: "POST",
        body: JSON.stringify({
          campusId: editValue,
          userId: localStorage.getItem("user"),
        }),
        cache: "no-cache",
      });
      const data = await res.json();
      if (data.campusID === editValue) {
        alert("Campus ID updated successfully");
        setEditShown(null);
        getUser();
      } else {
        alert("Error updating campus ID");
      }
    } else if (editShown === "hostel") {
      const res = await fetch("/api/user/hostel/", {
        method: "POST",
        body: JSON.stringify({
          hostel: editValue,
          userId: localStorage.getItem("user"),
        }),
        cache: "no-cache",
      });
      const data = await res.json();
      if (data.hostel === editValue) {
        alert("Hostel updated successfully");
        setEditShown(null);
        getUser();
      } else {
        alert("Error updating hostel");
      }
    } else if (editShown === "phone") {
      const res = await fetch("/api/user/phone/", {
        method: "POST",
        body: JSON.stringify({
          phone: editValue,
          userId: localStorage.getItem("user"),
        }),
        cache: "no-cache",
      });
      const data = await res.json();
      if (data.phone === editValue) {
        alert("Phone updated successfully");
        setEditShown(null);
        getUser();
      } else {
        alert("Error updating phone");
      }
    }
  };

  React.useEffect(() => {
    getUser();
    // checkLogin();
    getProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 gap-10">
      {/* A modal to input campus id and hostel */}
      {editShown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-md">
            <h1 className="text-2xl font-bold mb-4">Edit {editShown}</h1>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={editShown.toLocaleUpperCase()}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border rounded-md p-2"
              />
              <button
                className="text-white bg-green-900 rounded-md p-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-zinc-500 text-white rounded-md p-2"
                onClick={() => {
                  setEditShown(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className="flex flex-col">
          <main className="flex-1">
            <section className="w-full py-5 sm:py-10 md:py-10 xl:py-10">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to BITS BIDS, {user?.name}
                  </h1>
                  <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                    You can view your product listings and chat with the highest
                    bidders here.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
      {/* A section to edit hostel and campus ID */}
      {user && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              <div className="card border rounded-lg overflow-hidden">
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-semibold">Edit Profile</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Edit your profile here.
                  </p>
                  <div className="text-white flex flex-col sm:flex-row items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
                    <div
                      className="card border rounded-lg overflow-hidden bg-[#172f39]"
                      onClick={() => handleEdit("hostel")}
                    >
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg font-semibold">
                          Hostel {user.hostel}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Edit your hostel here.
                        </p>
                      </div>
                    </div>
                    <div
                      className="card border rounded-lg overflow-hidden bg-[#172f39]"
                      onClick={() => handleEdit("campusID")}
                    >
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg font-semibold">
                          Campus ID {user.campusID}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Edit your campus ID here.
                        </p>
                      </div>
                    </div>
                    <div
                      className="card border rounded-lg overflow-hidden bg-[#172f39]"
                      onClick={() => handleEdit("phone")}
                    >
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg font-semibold">
                          Phone {user.phone}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Edit your phone here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 
          A tabbed section for the user to view their products and chats
        */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <div className="card border rounded-lg overflow-hidden">
              <div className="p-6 space-y-2">
			  <h3 className="text-lg font-semibold">Products</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  View and manage your products here.
                </p>
                <div className="flex items-center gap-10 max-h-fit overflow-x-scroll max-w-full text-white">
                  {products.length > 0 ? (
                    products.map((product: any) => (
                      <ProductCard product={product} key={product.productId} />
                    ))
                  ) : (
                    <div className="card border rounded-lg overflow-hidden bg-[#172f39]">
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg font-semibold">No Products</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          You have not listed any products yet.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-2 border-t pt-20">
                  <h3 className="text-lg font-semibold">Chats</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Chat with bidders here.
                  </p>
                  <div className="flex items-center gap-10 max-h-fit overflow-x-scroll max-w-full">
                    {productChats.length > 0 ? (
                      productChats.map(
                        (productChat: ProfileChat) =>
                          productChat.userMessages &&
                          Object.values(productChat.userMessages).length > 0 &&
                          Object.values(productChat.userMessages).map(
                            (user, index) => {
                              // generate a unique hashed name for each user
                              // convert the product name to a number and user id to a number
                              // add them together and take the remainder when divided by the number of names

                              return (
                                <ChatCardProfile
                                  product={productChat.product}
                                  name={
                                    "Buyer " +
                                    Object.keys(productChat.userMessages)[index]
                                  }
                                  chat={user}
                                  userId={
                                    Object.keys(productChat.userMessages)[index]
                                  }
                                  key={productChat.product.productId}
                                />
                              );
                            }
                          )
                      )
                    ) : (
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg font-semibold">No Chats</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          You have no chats yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;