import React, { useEffect, useState } from 'react';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';


const ProductPurch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Products Bougth</h1>
            <ListGroup >
                {purchases.map((purchase) => (
                    <ListGroup.Item className="mb-5 mt-2">
                        {purchase.cart.products.map(product=>(
                            <div onClick={() => navigate(`/product/${product.id}`)}>
                                <h5>{product.title}</h5>
                                <p>Quantity: {product.productsInCart.quantity}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                        ))}
                        <ListGroup.Item>
                            <Col>
                               Date:
                            </Col>
                            <Col>
                                {purchases[0].createdAt}
                            </Col>
                        </ListGroup.Item>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ProductPurch;