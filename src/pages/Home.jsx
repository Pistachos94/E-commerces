import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector(state => state.products)
    const [categories, setCategories] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [searchProduct, setSearchProduct]=useState("");
    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productList);
    }, [productList])

    const filterCategory = categoryId => {
        const filtered = productList.filter(products => products.category.id === categoryId)
        setProductsFiltered(filtered);
    }
    const searchProducts =()=>{
        const filtered = productList.filter(product=>product.title.toLowerCase().includes(searchProduct.toLocaleLowerCase()))
        setProductsFiltered(filtered)
    }
    console.log(categories)
    return (
        <Row>
            <Col lg={2}>
                <ListGroup className='mb-5'>
            {
                categories.map(category => (
                    <ListGroup.Item className='filterOption' onClick={() => filterCategory(category.id)} key={category.id}>
                        {category.name}
                    </ListGroup.Item>
                ))
            }
            </ListGroup>
            </Col>
        
            <Col>
            <InputGroup className="mb-5">
                <Form.Control
                    placeholder="Search"
                    value={searchProduct}
                    onChange={e=>setSearchProduct(e.target.value)}
                />
                <Button  variant="outline-secondary" onClick={searchProducts} >
                    Search
                </Button>
            </InputGroup>

                <ul className='grid generalProductCont'>
                    {productsFiltered.map(product => (
                        <li className=' productCont' key={productList.id} onClick={() => navigate(`/product/${product.id}`)} >
                            <div className='productImgCont'> 
                                <img src={product.productImgs[0]} alt="" />
                            </div>
                            <p>{product.title}</p>
                            <span>Price: ${product.price}</span>
                        </li>
                    ))}
                </ul>
                 

            </Col>
                       
        </Row>
    );
};

export default Home;