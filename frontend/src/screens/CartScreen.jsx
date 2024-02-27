import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  Image,
  ListGroup,
  Row,
  Col,
  Form,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";
import React from "react";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, itemsPrice } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty}));
  }

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  } 

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  }

  return (
    <Row>
      <h1>Shopping Cart</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <ListGroupItem key={index}> 
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button variant="light" type="button" onClick={() => removeFromCartHandler(item._id)}>
                      <FaTrash color="red" />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Row>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Subtotal ({cartItems.reduce((sum, item) => sum + item.qty, 0)}) Items</h4>
                {itemsPrice}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className="btn-block" disabled={cartItems.length === 0 } onClick={checkoutHandler}>
                    Proceed to checkout!
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};

export default CartScreen;
