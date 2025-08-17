import Category from "../../db/schemas/categories";

export async function getAllCategories() {
    return Category.find();
}

/**
 * Create a new category
 * data: { name: string, description?: string }
 */
export async function createCategory(data: any) {
    const category = new Category(data);
    return category.save();
}