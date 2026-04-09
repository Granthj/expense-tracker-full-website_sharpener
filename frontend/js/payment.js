const cashfree = Cashfree({
    mode: "sandbox",
});
document.getElementById("renderBtn").addEventListener("click", async() => {
    const token = localStorage.getItem('token')
    console.log(token,'paymentbfhch')
    const res = await axios.post('http://localhost:3000/api/pay',{},{
        
        headers:{
            Authorization:`Bearer ${token}`
        }
            
    });
    const paymentSessionId = res.data.paymentSessionId;
    const orderId = res.data.orderId;

    let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
    };
    const result = await cashfree.checkout(checkoutOptions);
        if (result.error) {
            // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
            console.log("User has closed the popup or there is some payment error, Check for Payment Status");
            console.log(result.error);
        }
        if (result.redirect) {
            // This will be true when the payment redirection page couldnt be opened in the same window
            // This is an exceptional case only when the page is opened inside an inAppBrowser
            // In this case the customer will be redirected to return url once payment is completed
            console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {
            // This will be called whenever the payment is completed irrespective of transaction status
            const res = await axios.get(`http://localhost:3000/api/payment-status/${orderId}`);
            alert("Your payment is" + res.data.orderStatus);
            console.log(res.data.orderStatus,'like here')
            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
        }
    
});