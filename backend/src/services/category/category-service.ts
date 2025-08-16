import Category from "../../db/schemas/categories";

export async function getAllCategories() {
    return Category.find();
}