import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AddProductsCartThunk } from '../store/slices/productsCart.slice';

const ProductDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(0)

    const productList = useSelector(state => state.products);

    const productDetail = productList.find(product => product?.id === Number(id))

    const relatedProduct = productList.filter(product => product?.category.id === productDetail?.category.id)


    useEffect(() => {
        setQuantity(5)
    }, [id])

    const addProductCart = () => {
        const productCart = {
            id,
            quantity
        };
        dispatch(AddProductsCartThunk(productCart))
    };

    return (
        <Row>
            <Col>
                <div className='contImg disflex'>
                    <img className='img-fluida' src={productDetail?.productImgs[0]} alt="" />
                </div>
            </Col>
            <Col lg={5}>

                <h3>{productDetail?.title}</h3>
                <p>{productDetail?.description}</p>

                <div >
                    <Button className="me-3" onClick={() => setQuantity(quantity - 1)}>
                        -
                    </Button>
                    {quantity}
                    <Button className="ms-3" onClick={() => setQuantity(quantity + 1)}>
                        +
                    </Button>
                    <Button className='ms-3' onClick={addProductCart}>Add to cart</Button>
                </div>
            </Col>
            <Row className='mt-5'>
                <h2>Related Products</h2>
                <Col>
                    <ul className='grid generalProductCont'>
                        {relatedProduct.map(product => (
                            <Link className='productCont' to={`/product/${product.id}`}>
                                <li>
                                    <div className='productImgCont'>
                                    <img src={product.productImgs[0]} alt="" />
                                    </div>
                                    <p>{product.title}</p>
                                    <span>Price: ${product.price}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Row>
    );
};

export default ProductDetail;