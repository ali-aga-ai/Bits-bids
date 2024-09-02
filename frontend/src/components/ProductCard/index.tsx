import Product from "@/Types/product";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

/**
 * The ProductCard component.
 * @param product The product to display.
 * @param details Whether to show the "View Details" button.
 * @param chat Whether to show the "Chat with Highest Bidder" button.
 */
export default function ProductCard({
  product,
  details = false,
  chat = false,
}: {
  product: Product;
  details?: boolean;
  chat?: boolean;
}) {
  return (
    <div
      className="rounded-md shadow-md overflow-hidden bg-[#172f39] text-white max-w-[400px]"
      key={product.productId}
    >
      {/* Product image */}
      <Image
        priority
        alt="Product"
        className="object-cover"
        height="300"
        src={`https://ucarecdn.com/${product.image}/`}
        style={{
          aspectRatio: "400/300",
          objectFit: "contain",
        }}
        width="400"
      />

      {/* Product details */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.productName}</h3>
        <p className="text-sm text-white mt-2">{product.details}</p>
        <p className="text-sm text-white mt-2">
          Category: {product.category}
        </p>
        <p className="text-sm text-white mt-2">
          Starting Bid: Rs. {product.startingBid}
        </p>
        
        {/* User info */}
        {product.user && product.user.username && (
          <p className="text-sm text-white mt-2">
            User: {product.user.username}
          </p>
        )}

        {/* View Details button */}
        {!product.sold && details && (
          <p className="mt-9">
            <Link href={`/products/${product.productId}`}>
              <Button className="">View Details</Button>
            </Link>
          </p>
        )}

        {/* Sold indicator */}
        {product.sold && "SOLD"}

        {/* Chat with Highest Bidder button */}
        {chat && (
          <p className="mt-9">
            <Link href={`/chat/${product.productId}`}>
              <Button className="">Chat with Highest Bidder</Button>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
