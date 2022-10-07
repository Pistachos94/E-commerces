import React, { useEffect, useState } from 'react';
import { Button, Col, ListGroup, ListGroupItem, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsCartThunk, purchaseCartThunk } from '../store/slices/productsCart.slice';



const ProductSidebar = ({show, handleClose}) => {

    const dispatch=useDispatch();


    const productCart=useSelector(state=>state.productsCart)

    const [totalPrice, setTotalPrice]=useState(0);
    useEffect(()=>{
 
        dispatch(getProductsCartThunk())
    },[])


    const purchaseCart=()=>{
        dispatch(purchaseCartThunk())
    }

    useEffect(()=>{
        let nTotal=0;
        productCart.forEach(product=>{
            nTotal+=+product.price*product.productsInCart.quantity
        })
        setTotalPrice(nTotal);
    },[productCart])



    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {productCart.map(product=>(
                        <ListGroup.Item key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <p>
                                    {product.title}
                                </p>
                                <p>Price: ${product.price}</p>
                                <p className='textRight'> Quantity: {product.productsInCart.quantity} units</p>
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Offcanvas.Body>
            {totalPrice!==0&& 
                <Offcanvas.Body>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>
                            Total:   ${totalPrice}
                            </ListGroup.Item>    
                        </ListGroup>                    
                    </Col>
                </Row>
            </Offcanvas.Body>
        }
            <Button onClick={purchaseCart}>
                    Buy
                </Button>
        </Offcanvas>
        
    );
};

export default ProductSidebar;