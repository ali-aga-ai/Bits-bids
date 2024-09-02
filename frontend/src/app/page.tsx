import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

/**
 * Fetches featured products from the API.
 */
async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/featured`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return an empty array in case of error
  }
}

/**
 * The Home component.
 */
export default async function Home() {
  const products = (await getProducts()) || [];

  // If no products are returned, show a sample product
  const fallbackProduct = {
    productId: 0,
    image: "sample-image-url", // Replace with a real sample image URL
    productName: "Sample Product",
    details: "This is a sample product description. Enjoy bidding!",
  };

  const displayedProducts = products.length > 0 ? products : [fallbackProduct];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col min-h-[100vh]">
        <main className="flex-1">
          {/* Hero section */}
          <section className="w-full py-12 sm:py-24 md:py-32 xl:py-48">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
              <Image
                alt="Background"
                className="object-cover"
                layout="fill"
                priority
                src=""
              />
              <div
                className="absolute inset-0"
                style={{ mixBlendMode: "multiply" }}
              ></div>
            </div>
            <div className="container px-4 md:px-6 z-10 relative">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ">
                  Welcome to BITS BIDS
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl dark:text-zinc-400">
                  Auction your stuff here.
                </p>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                  href="/products/add"
                >
                  Start Auctioning
                </Link>
              </div>
            </div>
          </section>

          {/* Featured products section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
                Featured Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {displayedProducts.map(
                  (product: {
                    productId: number;
                    image: string;
                    productName: string;
                    details: string;
                  }) => (
                    <div
                      className="rounded-md shadow-md overflow-hidden"
                      key={product.productId}
                    >
                      <Image
                        priority
                        alt="Product"
                        className="object-cover"
                        height={300}
                        src={`https://ucarecdn.com/${product.image}/`}
                        style={{
                          aspectRatio: "400/300",
                          objectFit: "cover",
                        }}
                        width={400}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {product.details}
                        </p>
                        <Link href={`/products/${product.productId}`}>
                          <Button className="mt-4">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}