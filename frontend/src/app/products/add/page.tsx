"use client";
import useLogin from "@/hooks/useLogin";
import React, { useState } from "react";
import axios from "axios";
import categories from "../categories";

const AddProductPage: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const { checkLogin } = useLogin();

    React.useEffect(() => {
        checkLogin();
    }, []);

    // Refs
    const nameRef = React.useRef<HTMLInputElement>(null);
    const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
    const startingBidRef = React.useRef<HTMLInputElement>(null);
    const categoryRef = React.useRef<HTMLSelectElement>(null);
    const expiryDateRef = React.useRef<HTMLInputElement>(null);
    const minimumIncrementRef = React.useRef<HTMLInputElement>(null);
    // const imageRef = React.useRef<HTMLInputElement>(null);

    const handleAddProduct = async () => {
        if (
            nameRef.current &&
            descriptionRef.current &&
            startingBidRef.current &&
            categoryRef.current &&
            expiryDateRef.current &&
            minimumIncrementRef.current
            // imageRef.current?.files?.[0]
        ) {
            setUploading(true);

            const productName = nameRef.current.value;
            const details = descriptionRef.current.value;
            const startingBid = Number(startingBidRef.current.value);
            const category = categoryRef.current.value;
            const expiryDate = expiryDateRef.current.value;
            const minimumIncrement = Number(minimumIncrementRef.current.value);

            // // Handle image upload
            // const imageFile = imageRef.current.files[0];
            // const formData = new FormData();
            // formData.append("file", imageFile);

            try {
                // // Assuming you have an API endpoint to handle image uploads
                // const uploadRes = await axios.post("http://localhost:8081/api/v1/products/?userId=18", formData, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // });

                // const image = uploadRes.data.url; // Assuming the response contains the image URL

                await axios.post("http://localhost:8081/api/v1/products/?userId=18", {
                    productName,
                    details,
                    startingBid,
                    category,
                    // image,
                    expiryDate,
                    minimumIncrement,
                    userId: Number(localStorage.getItem("user")),
                });

                setUploading(false);
                window.location.href = "/products";
            } catch (err) {
                console.log(err);
                setUploading(false); // Ensure uploading state is reset on error
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 py-20 min-h-[100vh] ">
            {uploading && (
                <div className="absolute top-0 left-0 fixed w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md">
                        <h1 className="text-2xl font-bold mb-4">Uploading...</h1>
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Add A Product</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 font-medium">
                        Category:
                    </label>
                    <select
                        id="category"
                        ref={categoryRef}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {/* <label htmlFor="image" className="block mb-2 font-medium">
                        Image:
                    </label>
                    <input
                        ref={imageRef}
                        type="file"
                        id="image"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    /> */}
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Name:
                    </label>
                    <input
                        ref={nameRef}
                        type="text"
                        id="name"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-medium">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        ref={descriptionRef}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="startingBid" className="block mb-2 font-medium">
                        Starting Bid (in Rs):
                    </label>
                    <input
                        ref={startingBidRef}
                        type="number"
                        id="startingBid"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="expiryDate" className="block mb-2 font-medium">
                        Expiry Date:
                    </label>
                    <input
                        ref={expiryDateRef}
                        type="datetime-local"
                        id="expiryDate"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="minimumIncrement" className="block mb-2 font-medium">
                        Minimum Increment (in Rs):
                    </label>
                    <input
                        ref={minimumIncrementRef}
                        type="number"
                        id="minimumIncrement"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
