export const addDecimals = (num) => (Math.round(num * 100)/100).toFixed(2);

export const updateCart = (state) => {
    // calculate Items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // calculate shipping price (if order is above $100 then free, else $10 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    
    // calculate tax price (15% tax)
    state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

    // calculate total price 
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice) 
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}