"use server";

import startDb from "@lib/db";
import FeaturedProductModel from "@models/featuredProduct";
import { FeaturedProductForUpdate, NewFeaturedProduct } from "@/app/types";

export const createFeaturedProduct = async (info: NewFeaturedProduct) => {
  try {
    await startDb();
    await FeaturedProductModel.create({ ...info });
  } catch (error) {
    throw error;
  }
};

export const updateFeaturedProduct = async (
  id: string,
  info: FeaturedProductForUpdate
) => {
  try {
    await startDb();
    await FeaturedProductModel.findByIdAndUpdate(id, { ...info });
  } catch (error) {
    throw error;
  }
};
