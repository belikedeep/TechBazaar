import Product from "../../db/schemas/products";
import Category from "../../db/schemas/categories";
import mongoose from "mongoose";

export async function getAllProducts(query: any) {
    const { page = 1, limit = 10, sort } = query;
    const skip = (page - 1) * limit;
    let sortOption: Record<string, 1 | -1> = { createdAt: -1 }; // Default: newest first
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const products = await Product.find()
        .sort(sortOption)
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
    // Accept category as either an ObjectId string or a category name.
    // If a name is supplied, resolve or create the category and set its ObjectId.
    if (data.category && typeof data.category === "string") {
        try {
            if (!mongoose.Types.ObjectId.isValid(data.category)) {
                let cat = await Category.findOne({ name: data.category });
                if (!cat) {
                    cat = await Category.create({ name: data.category });
                }
                data.category = cat._id;
            }
        } catch (err) {
            // If resolving category fails, rethrow to surface validation to caller
            throw err;
        }
    }

    // If migrating from single image to images array, support both for backward compatibility
    if (data.image && !data.images) {
        data.images = [data.image];
    }
    const product = new Product(data);
    return product.save();
}

export async function updateProduct(id: string, data: any) {
    // If updating with single image, convert to images array
    if (data.image && !data.images) {
        data.images = [data.image];
    }
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
    if (filter.category) {
        // Support category as array or comma-separated string
        let cats = filter.category;
        if (typeof cats === "string") {
            // Check for comma-separated values
            if (cats.includes(",")) {
                cats = cats.split(",").map((c: string) => c.trim());
            }
        }
        if (Array.isArray(cats)) {
            query.category = { $in: cats };
        } else {
            query.category = cats;
        }
    }
    if (filter.minPrice || filter.maxPrice) {
        query.price = {};
        if (filter.minPrice) query.price.$gte = Number(filter.minPrice);
        if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice);
    }
    return Product.find(query).populate("category");
}