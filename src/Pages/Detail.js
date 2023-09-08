import React from 'react';
import axios from 'axios';
import { useLocation } from "react-router";
import ReactStars from "react-rating-star-with-type";

function Detail() {
  const [itemResto, setItemResto] = React.useState();
  const Location = useLocation();
  React.useEffect(() => {
    const id = Location.pathname?.split("/")[2];
    axios
      .get(`https://restaurant-api.dicoding.dev//detail/${id}`)
      .then((res) => {
        console.log(res?.data?.restaurant);
        setItemResto(res?.data?.restaurant);
      })
      .catch((err) => console.log(err, "<<<< error1"));
  }, []);

  // rating start
  const [star, setStar] = React.useState(5);

  const onChange = (nextValue) => {
    setStar(nextValue);
  };
  return (
    <div className="container">
      <h1 className="text-center mt-3">{itemResto?.name}</h1>
      <div className="d-flex justify-content-center ">
        <img
          src={`https://restaurant-api.dicoding.dev/images/small/${itemResto?.pictureId}`}
          className="card-img-top rounded img-fluid mt-2"
          alt="Photo Restourant"
          style={{ height: "20%", marginLeft:"10%",marginRight:"10%"}}
        />
      </div>
      <h3 className='mt-3'>Detail Restoran</h3>
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td>Address</td>
            <td>:</td>
            <td>{itemResto?.address}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>:</td>
            <td>{itemResto?.city}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>:</td>
            <td className="d-flex">
              <ReactStars
                onChange={onChange}
                value={itemResto?.rating}
                edit={true}
                activeColors={[
                  "#002B56",
                  "#002B56",
                  "#002B56",
                  "#002B56",
                  "#002B56",
                  // "red",
                  // "orange",
                  // "#FFCE00",
                  // "#9177FF",
                  // "#8568FC",
                ]}
                style={{ marginRight: "10px" }}
              />
              {itemResto?.rating}
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>:</td>
            <td>
              {itemResto?.categories?.map((item) => (
                <>
                  {item.name}
                  {", "}
                </>
              ))}
              {/* {itemResto?.categories} */}
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>:</td>
            <td>{itemResto?.description}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3> Daftar Menu </h3>
        <div className='d-flex justify-content-around">'>
          <div>
            <h4>Drink</h4>
            <ul>
              {itemResto?.menus?.drinks?.map((item, key) => (
                <>
                  <li key={key}>{item?.name}</li>
                </>
              ))}
            </ul>
          </div>
          <div>
            <h4>Food</h4>
            <ul>
              {itemResto?.menus?.foods?.map((item, key) => (
                <>
                  <li key={key}>{item?.name}</li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h3> Reviews </h3>
        <table class="table table-borderless">
          <tbody>
            {itemResto?.customerReviews?.map((item, key) => (
              <>
                <tr key={key}>
                  <td>
                    <img
                      src="/userReview.png"
                      alt=""
                      style={{ width: "20px" }}
                    />{" "}
                    {item?.name}
                    <label style={{ marginLeft: "100px" }}>{item?.date}</label>
                  </td>
                  {/* <td>{item?.date}</td> */}
                </tr>
                <tr>
                  <td>
                    <ReactStars
                      classNames=""
                      onChange={onChange}
                      value={5}
                      edit={true}
                      activeColors={[
                        "#002B56",
                        "#002B56",
                        "#002B56",
                        "#002B56",
                        "#002B56",
                      ]}
                    />
                  </td>
                </tr>
                <tr key={key}>
                  <td>{item?.review}</td>
                </tr>
                <hr />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Detail