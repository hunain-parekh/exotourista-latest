import "./search.css";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [minDate, setMinDate] = React.useState("");
  const [item, setItem] = React.useState("");

  React.useEffect(() => {
    fetch(`http://localhost:8080/product/` + params.productID)
      .then((response) => response.json())
      .then((result) => setItem(result));

    const today = new Date();
    var month = parseInt(today.getMonth() + 1);
    if (month < 10) {
      month = "0" + month;
    }
    let min_date = today.getFullYear() + "-" + month + "-" + today.getDate();
    setMinDate(min_date);
  }, [params.productID]);

  const handleSetName = (event) => {
    setName(event.target.value);
  };
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSetAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleFromDate = (event) => {
    setFromDate(event.target.value);
    const from = new Date(event.target.value);
    if (toDate !== "") {
      const to = new Date(toDate);
      const days = getDiffDays(from, to);
      const totalPrice = getTotalNightPrice(days);
      const tax = getTax(totalPrice);
      setTotal(totalPrice);
      setTax(tax);
    }
  };
  const handleToDate = (event) => {
    setToDate(event.target.value);
    const to = new Date(event.target.value);
    if (fromDate !== "") {
      const from = new Date(fromDate);
      const days = getDiffDays(from, to);
      const totalPrice = getTotalNightPrice(days);
      const tax = Math.floor(getTax(totalPrice));
      setTotal(totalPrice);
      setTax(tax);
    }
  };

  const getDiffDays = (from, to) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((from - to) / oneDay));
    return diffDays;
  };

  const getTotalNightPrice = (days) => {
    return item.price * days;
  };

  const getTax = (totalPrice) => {
    return totalPrice * 0.12;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      productId: item.id,
      name: name,
      email: email,
      address: address,
      fromDate: fromDate,
      toDate: toDate,
      totalPrice: total,
      tax: tax,
    };
    fetch("http://localhost:8081/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        navigate('/hotel/bookingConfirm');
            }
    });
  };

  return (
    <div className="search_form_div_first">
      <form className="search_form" onSubmit={handleSubmit}>
        <h5 style={{ textAlign: "center" }}>Book Your Room</h5>
        <FormControl sx={{ minWidth: 120, mt: "20px" }} size="small">
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Name"
            value={name}
            onChange={handleSetName}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120, mt: "20px" }} size="small">
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Email"
            value={email}
            onChange={handleSetEmail}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120, mt: "20px" }} size="small">
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Address"
            multiline
            maxRows={4}
            value={address}
            onChange={handleSetAddress}
          />
        </FormControl>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ minWidth: 120, mt: "20px" }} size="small">
            <TextField
              type="date"
              id="outlined-basic"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">from</InputAdornment>
                ),
              }}
              inputProps={{ min: minDate }}
              value={fromDate}
              onChange={handleFromDate}
            />
          </FormControl>
          <FormControl
            sx={{ minWidth: 120, mt: "20px", ml: "20px" }}
            size="small"
          >
            <TextField
              type="date"
              id="outlined-basic"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">to</InputAdornment>
                ),
              }}
              inputProps={{ min: minDate }}
              value={toDate}
              onChange={handleToDate}
            />
          </FormControl>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl sx={{ width: 120, mt: "20px" }} size="small">
            <TextField
              id="outlined-basic"
              variant="standard"
              size="small"
              label="Total Price"
              value={total}
              aria-readonly
            />
          </FormControl>
          <FormControl sx={{ width: 120, mt: "20px" }} size="small">
            <TextField
              id="outlined-basic"
              variant="standard"
              size="small"
              label="Tax"
              value={tax}
              aria-readonly
            />
          </FormControl>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            Book My Stay
          </Button>
          <Button sx={{ mt: 2, ml: 2 }} variant="contained" color="error">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingDetails;
