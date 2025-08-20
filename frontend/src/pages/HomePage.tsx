// HomePage: Hero, Filters + Product Grid with pagination

import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { productService } from "../services/productService";
import type { Product, Category } from "../types/product";

const HomePage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [totalProducts, setTotalProducts] = useState<number>(0);

    useEffect(() => {
        productService
            .getCategories()
            .then((c) => setCategories(c))
            .catch((e) => console.error("Failed to load categories", e));

        // initial load
        fetchProducts(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Accept optional overrides for query/category to avoid async state bugs
    const fetchProducts = async (
        p = 1,
        opts?: { query?: string; category?: string }
    ) => {
        setLoading(true);
        setError(null);
        const q = opts?.query !== undefined ? opts.query : query;
        const cat = opts?.category !== undefined ? opts.category : activeCategory;
        try {
            if (q.trim()) {
                const results = await productService.searchProducts(q.trim());
                setProducts(results);
                setPage(1);
                setTotalPages(1);
            } else if (cat) {
                const results = await productService.filterProducts({ category: cat });
                setProducts(results);
                setPage(1);
                setTotalPages(1);
            } else {
                const res = await productService.getProducts({ page: String(p), limit: "12" });
                setProducts(res.products);
                setPage(res.page);
                setTotalPages(res.totalPages);
                setTotalProducts(res.total ?? res.products.length);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (filters: Record<string, unknown>) => {
        const cat = (filters.category as string) ?? "";
        setQuery("");
        setActiveCategory(cat);
        fetchProducts(1, { query: "", category: cat });
    };

    const handleSearch = (q: string) => {
        setActiveCategory("");
        setQuery(q);
        fetchProducts(1, { query: q, category: "" });
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className="container mx-auto px-4 py-8">
                <section className="mb-12 text-white py-24">
                    <h1 className="text-4xl font-bold text-center mb-4">TechBazaar</h1>
                    <p className="text-xl text-center"> Discover the best tech products that make your life smarter, faster, and more
                        connected</p>
                </section>
                <div className="flex items-center mb-2">
                    <span className="text-3xl text-white font-medium">{totalProducts} products</span>
                </div>
                <hr className="my-8 border-t-2 border-gray-300/30" />

                <section className="mb-12">
                    <div className="grid grid-cols-12 gap-6">
                        <aside className="col-span-12 lg:col-span-3">
                            <div className="mb-4">
                                <SearchBar onSearch={handleSearch} />
                            </div>
                            {activeCategory && (
                                <button
                                    className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
                                    onClick={() => {
                                        setActiveCategory("");
                                        fetchProducts(1, { category: "", query });
                                    }}
                                >
                                    Clear Category Filter
                                </button>
                            )}
                            <FilterSidebar
                                categories={categories}
                                onFilter={handleFilter}
                            />
                        </aside>

                        <main className="col-span-12 lg:col-span-9">
                            {loading && <div>Loading products...</div>}
                            {error && <div className="text-red-600 mb-2">{error}</div>}
                            {!loading && products.length === 0 && <div>No products found.</div>}

                            {!loading && products.length > 0 && (
                                <>
                                    <ProductGrid products={products} />

                                    <div className="mt-6">
                                        <Pagination
                                            currentPage={page}
                                            totalPages={totalPages}
                                            onPageChange={(p) => {
                                                setPage(p);
                                                fetchProducts(p);
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;