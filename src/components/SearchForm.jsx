import './search.css';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


const SearchForm = (props) => {

    const [location, setLocation] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [poolRequired, setPoolRequired] = React.useState(false);
    const [formClassName, setFormClassName] = React.useState('search_form_div_first');

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleChangeExperience = (event) => {
        setExperience(event.target.value);
    };
    const handleChangePoolRequirement = (event) => {
        setPoolRequired(event.target.checked);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            location: location,
            experience: experience,
            isPoolRequired: poolRequired
        }
        fetch("http://localhost:8080/product/search", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((result) => {
                    props.handleProductData(result);
                    setFormClassName('search_form_div_second');
                });
            }
        }
        );
    }
    return (
        <div className={formClassName}>
            <form className='search_form' onSubmit={handleSubmit}>
                <h5 style={{textAlign:'center'}}>Search Your Hotel</h5>
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Location</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={location}
                        label="Location"
                        onChange={handleChangeLocation}
                        required
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Karachi">Karachi</MenuItem>
                        <MenuItem value="Lahore">Lahore</MenuItem>
                        <MenuItem value="Islamabad">Islamabad</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 2, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Experience</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={experience}
                        label="Experience"
                        onChange={handleChangeExperience}
                        required
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Budget">Budget</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Luxury">Luxury</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel sx={{ mt: 2 }} control={<Checkbox value={poolRequired} onChange={handleChangePoolRequirement} />} label="Pool Required" />
                <Button type='submit' variant="contained">Search</Button>
            </form>
        </div>
    )
}

export default SearchForm;