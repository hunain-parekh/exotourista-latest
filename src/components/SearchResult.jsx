import { useState } from "react";
import ProductItem from "./ProductItem";
import './search.css';
import SearchForm from './SearchForm';


const SearchResult = () => {
    const [productData, setProductData] = useState([]);

    const handleProductData = (product_data) => {
        setProductData(product_data);
    }
    return (
        <>
            <SearchForm handleProductData={handleProductData} />
            {productData.length !== 0 ? 
            <div className='search_products'>
                {productData.map((item) => <ProductItem key={item.id} product={item}/>)}
            </div> : 
            <div className="no_products_message">
                <h1>No Hotels Available</h1>
            </div>}
        </>
    )
}

export default SearchResult;