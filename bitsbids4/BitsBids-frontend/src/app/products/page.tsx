"use client";

import Product from "@/Types/product";
import ProductCard from "@/components/ProductCard";
import useLogin from "@/hooks/useLogin";
import { Search, Clear } from "@mui/icons-material";
import { Button, Input, IconButton, CircularProgress } from "@mui/material";
import * as React from "react";
import * as Categories from "./categories";
import axios from 'axios';
import { useState, useMemo, useEffect } from 'react';

/**
 * The Products component.
 */
export interface IProductsProps {}

export default function Products(props: IProductsProps) {
  const { checkLogin } = useLogin();
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const displayProducts = React.useMemo(() => {
    return products.filter((product) => {
        if (selectedCategory !== "" && product.category !== selectedCategory) return false;
        const searchLower = search.toLowerCase();
        const nameSearch = product.productName.toLowerCase().includes(searchLower);
        const descSearch = product.details.toLowerCase().includes(searchLower);
        const categorySearch = product.category.toLowerCase().includes(searchLower);
        const usernameSearch = product.user?.username?.toLowerCase().includes(searchLower) || false;
        return nameSearch || descSearch || categorySearch || usernameSearch;
    });
  }, [products, search, selectedCategory]);

  /**
   * Fetches products from the API.
   */
  const getProducts = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:8081/api/v1/products/listAll`);
        const data = response.data;
        setProducts(data || []); 
        setError(null);
    } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setError('Failed to fetch products.');
    } finally {
        setLoading(false);
    }
  };

  React.useEffect(() => {
    checkLogin();
    getProducts();
  }, []);

  return (
    <div>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Explore the products
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
        <div className="relative w-1/2 max-w-lg">
        <Input
          placeholder="Search for products"
          className="w-full border border-gray-600 text-white bg-gray-800 placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endAdornment={
            search ? (
              <IconButton
                onClick={() => setSearch("")}
                className="text-white"
              >
                <Clear />
              </IconButton>
            ) : (
              <Search className="text-white" />
            )
          }
        />
        </div>
      </section>
      <section className="w-full py-5 md:py-5 lg:py-5 flex justify-center items-center flex-wrap">
        {Categories.default.map((category) => (
          <Button
            className={`${
              selectedCategory !== category.name ? "bg-zinc-500" : "bg-black"
            } text-white rounded-md p-2 m-2 min-w-min`}
            onClick={() => {
              setSelectedCategory(prev => prev !== category.name ? category.name : "");
            }}
            key={category.name}
          >
            {category.name}
          </Button>
        ))}
      </section>
      <section className="w-full py-12">
        <div className="flex w-screen flex-wrap gap-10 justify-center">
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : displayProducts.length > 0 ? (
            displayProducts.map((product: any) => (
              <ProductCard details product={product} key={product.productId} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
