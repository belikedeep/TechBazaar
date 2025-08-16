import Product from "../../db/schemas/products";

export async function getAllProducts(query: any) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const products = await Product.find()
        .skip(skip)
        .limit(Number(limit))
        .populate("category");
    const total = await Product.countDocuments();
    return { products, page: Number(page), totalPages: Math.ceil(total / limit), total };
}

export async function getProductById(id: string) {
    return Product.findById(id).populate("category");
}

export async function createProduct(data: any) {
    const product = new Product(data);
    return product.save();
}

export async function updateProduct(id: string, data: any) {
    return Product.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
}

export async function searchProducts(q: string) {
    return Product.find({ name: { $regex: q, $options: "i" } }).populate("category");
}

export async function filterProducts(filter: any) {
    const query: any = {};
    if (filter.category) query.category = filter.category;
    if (filter.minPrice || filter.maxPrice) {
        query.price = {};
        if (filter.minPrice) query.price.$gte = Number(filter.minPrice);
        if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice);
    }
    return Product.find(query).populate("category");
}