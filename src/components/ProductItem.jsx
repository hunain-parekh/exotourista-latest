import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ProductItem = (props) => {
  return (
    <div className="product">
      <div>
        <img src={props.product.imageLink} alt={props.product.name} />
      </div>
      <div className="product_main">
        <Link
          style={{ textDecoration: "none" }}
          to={`/hotel/details/${props.product.id}`}
        >
          <h2 className="item_name">Name: {props.product.name}</h2>
        </Link>
        <h5>{props.product.shortDesc}</h5>
        <div className="product_details">
          <div>
            <h5>Pool Available: {props.product.isPool ? "Yes" : "No"}</h5>
            <h5>City: {props.product.location}</h5>
          </div>
          <div>
            <h5>Experience: {props.product.experience}</h5>
            <h5>Price: Rs. {props.product.price}.00</h5>
          </div>
        </div>
      </div>
      <div className="book_now">
        <Button variant="contained"><Link style={{ textDecoration: "none", color:'white' }} to={`/hotel/bookingDetails/${props.product.id}`}>Book Now</Link></Button>
      </div>
    </div>
  );
};
export default ProductItem;
