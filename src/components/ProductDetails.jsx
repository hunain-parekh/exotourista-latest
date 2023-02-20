import * as React from "react";
import { Link, useParams } from 'react-router-dom';
import "./details.css";
import Button from '@mui/material/Button';

const ProductDetails = () => {
    const params = useParams();
    const [item, setItem] = React.useState({});

    React.useEffect(() => {
        fetch(`http://localhost:8080/product/` + params.productID)
            .then((response) => response.json())
            .then((result) => setItem(result));
    }, [params.productID]);
    return (
        <div className="detail-page">
            <div className="image-div">
                <img src={item.imageLink} alt={item.name}></img>
            </div>
            <div className="details-text">
                <h1>Name :{item.name}</h1>
                <h3>{item.longDesc}</h3>
                <div className="product_details">
                    <div className="product_details-row">
                        <h5>Pool Available: {item.isPool ? "Yes" : "No"}</h5>
                        <h5>City: {item.location}</h5>
                    </div>
                    <div className="product_details-row">
                        <h5>Experience: {item.experience}</h5>
                        <h5>Price: Rs. {item.price}.00</h5>
                    </div>
                </div>
                <div className="book_now">
                <Button variant="contained"><Link style={{ textDecoration: "none", color:'white' }} to={`/hotel/bookingDetails/${item.id}`}>Book Now</Link></Button>
                <Button sx={{ marginLeft: '10px'}} variant="contained">
                    <Link to="/" style={{ textDecoration: "none", color:'white' }}>Return To Results</Link>
                </Button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;
