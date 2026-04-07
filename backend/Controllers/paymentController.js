const {createOrder,getPaymentStatus} = require('../Services/cashFreeServices');
const Payment = require('../Models/paymentSchema');
const processPayment = async (req, res) => {
    const orderId = "ORDER-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerID = "1";
    const customerPhone = "9999999999";

    try {

        const paymentSessionId = await createOrder(
            orderId,
            orderAmount,
            orderCurrency,
            customerID,
            customerPhone
        );

        await Payment.create({
            orderId,
            paymentSessionId,
            orderAmount,
            orderCurrency,
            paymentStatus:"Pending"
        });
        res.json({paymentSessionId,orderId});
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}
const paymentStatus = async(req,res)=>{

    try{
        const {orderId} = req.params;

        const orderStatus = await getPaymentStatus(orderId);

        const updatePayment = await Payment.update(
            {paymentStatus:orderStatus},
            {
                where:{
                    orderId:orderId
                }
            }
        );
        res.json({orderId,orderStatus});
    }
    catch(err){
        res.status(500).json({message:"Something went wrong not getting payment status"});
    }
}

module.exports = {
    processPayment,
    paymentStatus
};