import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Response Data:', data);

      setFoodCat(data.foodcategory || []);
      setFoodItem(data.fooditems || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center" role="search" >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch (e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>

                    </div>
                    <div className="carousel-item active">
                        <img src="/pizza.jpg" className="d-block w-100 " style={{filter: 'brighthness(30%)'}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/burger.jpg" className="d-block w-100 " style={{filter: 'brighthness(30%)'}}  alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/fries.jpg" className="d-block w-100 " style={{filter: 'brighthness(30%)'}}  alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>





      </div>

      <Container className='my-4'>
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id}>
              <h3 className="fs-3 mb-3">{category.CategoryName}</h3>
              <hr />
              <Row>
                {foodItem.length > 0 ? (
                  foodItem.filter(item => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filteredItem => (
                      <Col md={4} lg={3} key={filteredItem._id} className="mb-3">
                        <Card foodItem={filteredItem} foodName={filteredItem.name}
                          options={filteredItem.options[0]}
                        imgsrc={filteredItem.img}/>
                      </Col>
                    ))
                ) : (
                  <Col>No items found for this category</Col>
                )}
              </Row>
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </Container>

      <Footer />
    </div>
  );
}
