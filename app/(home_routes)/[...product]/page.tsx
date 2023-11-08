import ProductView from "@components/ProductView";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    product: string[];
  };
}

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await startDb();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  return JSON.stringify({
    id: product._id,
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    sale: product.sale,
  });
};

export default async function Product({ params }: Props) {
  const { product } = params;
  const productId = product[1];
  const productInfo = JSON.parse(await fetchProduct(productId));

  let productImages = [productInfo.thumbnail];
  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  return (
    <div className="p-4">
      <ProductView
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
      />

      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-2">Review</h1>
          <Link href={`/add-review/${productInfo.id}`}>Add Review</Link>
        </div>
      </div>
    </div>
  );
}
