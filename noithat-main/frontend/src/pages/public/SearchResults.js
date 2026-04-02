// src/pages/public/SearchResults.js
import React, { useEffect } from 'react';
import { useSearchParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, clearSearchResults } from '../../redux/slices/productSlice';
import ProductCard from '../../components/common/ProductCard'; // <<<--- Đảm bảo component này tồn tại và đúng đường dẫn
import LoadingSpinner from '../../components/common/LoadingSpinner'; // <<<--- Đảm bảo component này tồn tại và đúng đường dẫn

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const dispatch = useDispatch();
    // Lấy đúng state từ store (kiểm tra tên slice trong store.js nếu cần)
    const { searchResults, searchLoading, searchError } = useSelector((state) => state.products);

    useEffect(() => {
        if (keyword) {
            // Gọi action tìm kiếm khi có keyword
            dispatch(searchProducts(keyword));
        } else {
            // Nếu không có keyword (ví dụ người dùng xóa URL), xóa kết quả cũ
            dispatch(clearSearchResults());
        }

        // Cleanup function: Luôn xóa kết quả khi component unmount (rời khỏi trang)
        // Giúp lần sau vào trang Search không thấy kết quả cũ
        return () => {
            dispatch(clearSearchResults());
        };
    }, [dispatch, keyword]); // Dependency array bao gồm keyword để fetch lại khi URL thay đổi

    // Function để render nội dung dựa trên trạng thái loading, error, results
    const renderContent = () => {
        if (searchLoading === 'pending') {
            return <div className="flex justify-center items-center py-10"><LoadingSpinner /></div>;
        }
        if (searchError) {
            return <div className="text-center text-red-600 mt-6 p-4 bg-red-100 border border-red-400 rounded">Lỗi tìm kiếm: {searchError}</div>;
        }
        // Nếu không có keyword (ví dụ vừa vào trang /search không có ?keyword=)
        if (!keyword && searchLoading === 'idle') {
             return <div className="text-center text-gray-500 mt-6">Vui lòng nhập từ khóa vào ô tìm kiếm phía trên.</div>;
        }
        // Nếu có kết quả
        if (searchResults && searchResults.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {searchResults.map((product) => (
                        // Đảm bảo ProductCard nhận prop 'product' và hiển thị đúng
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            );
        }
        // Nếu tìm kiếm xong và không có kết quả
        if (searchLoading === 'succeeded' && searchResults.length === 0 && keyword) {
             return <div className="text-center text-gray-600 mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded">Không tìm thấy sản phẩm nào phù hợp với từ khóa "{keyword}".</div>;
        }
        // Trường hợp mặc định (có thể là idle ban đầu khi có keyword nhưng chưa fetch xong)
        return null;
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-280px)]"> {/* Đảm bảo đủ chiều cao */}
            {keyword && (
                 <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 border-b pb-2">
                    Kết quả tìm kiếm cho: <span className="text-primary">{keyword}</span>
                </h1>
            )}
            {renderContent()}
        </div>
    );
};

export default SearchResults;