'use client';
import { useEffect, useState } from 'react';
import { Products } from '@/schema/product';

export default function ProductData() {
    const [products, setProducts] = useState<Products[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return products;
}
