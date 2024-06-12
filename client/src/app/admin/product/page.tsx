'use client';
import Image from 'next/image';
import { Products } from '@/schema/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

function AdminProductPage() {
    const [products, setProducts] = useState<Products[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                if (data && data.products) {
                    setProducts(data.products);
                } else {
                    throw new Error('Invalid product data received');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (productID: string) => {
        setSelectedProduct(productID);
        setFormVisible(true);
    };

    const handleCloseForm = () => {
        setFormVisible(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/products/deleted/${selectedProduct}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (!response.ok) {
                throw new Error('Không thể xóa sản phẩm ');
            }
            const updatedProducts = products.filter(
                (product) => product._id !== selectedProduct
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.log(error, 'Không thể xoá sản phẩm');
        }
        console.log(`Product had been deleted : ${selectedProduct}`);

        handleCloseForm();
    };

    const pageSize = 5;
    const onPageChange = (page: any) => {
        setCurrentPage(page.selected + 1);
    };

    return (
        <div className="px-2">
            <div className="text-center p-8 roboto-bold text-3xl">Sản phẩm</div>
            <Link href="/admin/product/add-product">
                <button className="roboto-regular rounded p-2 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0]">
                    Thêm sản phẩm{' '}
                </button>
            </Link>
            <div className="grid grid-cols-12 px-5 roboto-bold gap-3">
                <div className="col-span-1 flex justify-center items-center">
                    Số TT
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Mã sản phẩm
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Tên sản phẩm
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Hình ảnh
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Danh mục
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Hàng tồn kho{' '}
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Số lượng đã bán{' '}
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    Giá
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    Thao tác
                </div>
            </div>
            {products
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((product, index) => (
                    <div className="" key={product._id}>
                        <div className="grid grid-cols-12 px-5 py-2 roboto-regular gap-3">
                            <div className="col-span-1 flex justify-center items-center">
                                {(currentPage - 1) * pageSize + index + 1}
                            </div>
                            <div className="col-span-2 flex  items-center  line-clamp-2">
                                {product._id}
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                {product.productName}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                <Image
                                    className="rounded shadow-md"
                                    src={product.image}
                                    alt="hinh anh san pham"
                                    width={80}
                                    height={80}
                                ></Image>
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {product.type}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {product.quantityInStock}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {product.quantitySold}
                            </div>
                            <div className="col-span-1 flex justify-center items-center">
                                {formatCurrency(product.price)}
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                                <button className="rounded p-3 hover:bg-[#0dcaf0] hover:text-[black] border-[1px] border-[#0dcaf0] text-[#0dcaf0] mr-2 ">
                                    <Link href={`product/${product._id}`}>
                                        <BiPencil />
                                    </Link>
                                </button>
                                <button
                                    className="rounded p-3 hover:bg-[#dc3545] hover:text-[white] border-[1px] border-[#dc3545] text-[#dc3545]"
                                    onClick={() =>
                                        handleDeleteClick(product._id)
                                    }
                                >
                                    <BiTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            {formVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl mb-4 roboto-bold">
                            Xóa sản phẩm
                        </h2>
                        <p className="roboto-thin">
                            Bạn có muốn xóa sản phẩm này không?
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={handleCloseForm}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => {
                                    handleDeleteProduct();
                                }}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ReactPaginate
                className="flex my-6  items-center justify-center"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(products.length / pageSize)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName=" text-white bg-[#7000FF]"
                pageClassName=" rounded mx-2 w-[32px] h-[32px] border flex items-center justify-center hover:text-white  hover:bg-[#7000FF]"
                pageLinkClassName="page-link"
                previousClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center  hover:bg-[#7000FF] ${
                    currentPage === 1
                        ? 'cursor-not-allowed text-gray-400 hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                previousLinkClassName={`page-link ${
                    currentPage === 1
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                nextClassName={`rounded mx-2 px-2 h-[32px] border flex items-center justify-center hover:text-white hover:bg-[#7000FF] ${
                    currentPage === Math.ceil(products.length / pageSize)
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                nextLinkClassName={`page-link ${
                    currentPage === Math.ceil(products.length / pageSize)
                        ? 'cursor-not-allowed pointer-events-none hover:bg-white hover:text-gray-400'
                        : ''
                }`}
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        </div>
    );
}

export default AdminProductPage;
