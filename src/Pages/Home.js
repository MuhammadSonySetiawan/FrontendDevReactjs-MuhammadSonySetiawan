import React from 'react'
import axios from 'axios';
import ReactStars from "react-rating-star-with-type";
import { Link } from 'react-router-dom';

function Home() {
    const [restaurant, setRestaurant] = React.useState()
    const [priceValue, setPriceValue] = React.useState("");
    const [star, setStar] = React.useState(5);

   const handleCategory = (e) => {
    const category = e.target.value;
     axios
       .get(`https://restaurant-api.dicoding.dev/search?q=${category}`)
       .then((res) => {
         setRestaurant(res?.data?.restaurants);
       })
       .catch((err) => console.log(err, "<<<< error1"));
   };

   const handlePrice = (e) => {
     const fee =e?.target?.value;
    
    setPriceValue(fee);
    axios
      .get(`https://restaurant-api.dicoding.dev/list`)
      .then((res) => {
        setRestaurant(res?.data?.restaurants);
      })
      .catch((err) => console.log(err, "<<<< error1"));
   };

    React.useEffect(()=>{
         axios
           .get(`https://restaurant-api.dicoding.dev/list`)
           .then((res) => {
             setRestaurant(res?.data?.restaurants);
           })
           .catch((err) => console.log(err, "<<<< error1"));
    },[])

      // rating start
        const onChange = (nextValue) => {
          setStar(nextValue);
        };
  return (
    <div className="container">
      <nav>
        <h1>Restaurants</h1>
        <p>
          Your premier culinary portal to discover and explore a diverse array
          of restaurant options. Find the finest dining establishments tailored
          to your tastes, read reviews, view menus, and book your table online.
          Explore a world of flavors with Restaurants, your trusted culinary
          guide.
        </p>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-wrap">
            <label>Filter By: </label>

            {/* filter Open/Closed */}
            <div className="form-check" style={{ marginLeft: "10px" }}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Open Now
              </label>
            </div>

            {/* Filter Price */}
            <div style={{ marginLeft: "10px" }}>
              <select
                onChange={handlePrice}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Price</option>
                <option value="3.6">$ 3.6</option>
                <option value="3.7">$ 3.7</option>
                <option value="3.8">$ 3.8</option>
                <option value="3.9">$ 3.9</option>
                <option value="4">$ 4</option>
                <option value="4.1">$ 4.1</option>
                <option value="4.2">$ 4.2</option>
                <option value="4.3">$ 4.3</option>
                <option value="4.4">$ 4.4</option>
                <option value="4.5">$ 4.5</option>
                <option value="4.6">$ 4.6</option>
                <option value="4.7">$ 4.7</option>
                <option value="4.8">$ 4.8</option>
                <option value="4.9">$ 4.9</option>
                <option value="5">$ 5</option>
              </select>
            </div>

            {/* Filter Category */}
            <div style={{ marginLeft: "10px" }}>
              <select
                
                onChange={handleCategory}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Categories</option>
                <option value="Bali">Bali</option>
                <option value="Italia">Italia</option>
                <option value="Jawa">Jawa</option>
                <option value="Modern">Modern</option>
                <option value="Sop">Sop</option>
                <option value="Spanyol">Spanyol</option>
                <option value="Sunda">Sunda</option>
              </select>
            </div>
          </div>
          
          
          <a href="/" className="btn btn-outline-secondary">
            Clear All
          </a>
          
        </div>
        <hr />
      </nav>
      
      {/* start content */}
      <div>
        <h2>All Restaurants</h2>
        <div className="d-flex justify-content-around flex-wrap">
          {restaurant
            ?.filter((item) =>
              priceValue != 0 ? item?.rating == priceValue : item?.rating
            )
            .map((item, key) => (
              <div className="card mb-3" style={{ width: " 18rem" }} key={key}>
                <img
                  src={`https://restaurant-api.dicoding.dev/images/small/${item?.pictureId}`}
                  className="card-img-top"
                  alt="Photo Restourant"
                  style={{ height: "48%" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text"></p>
                  <div className="d-flex justify-content-between">
                    <ReactStars
                      onChange={onChange}
                      value={item?.rating}
                      edit={true}
                      activeColors={[
                        "#002B56",
                        "#002B56",
                        "#002B56",
                        "#002B56",
                        "#002B56",
                      ]}
                    />
                    <div>$ {item?.rating}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Category</p>
                    <lu>
                      <li>Open Now</li>
                    </lu>
                  </div>
                  <Link
                    to={`/Detail/${item?.id}`}
                    className="btn"
                    style={{
                      backgroundColor: "#002B56",
                      color: "white",
                      width: "100%",
                    }}
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* start content */}
      <footer></footer>
    </div>
  );
}

export default Home