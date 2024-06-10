const axios = require('axios');
const crypto = require('crypto');
const Order = require('../models/Order');
const {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
} = require('../config/payment/index');
class PaymentController {
    async payment(req, res, next) {
        var amount = req.body.amount;
        var orderId = req.body.orderId;
        var requestId = orderId;

        var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;
        //puts raw signature
        console.log('--------------------RAW SIGNATURE----------------');
        console.log(rawSignature);
        //signature
        var signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');
        console.log('--------------------SIGNATURE----------------');
        console.log(signature);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });
        //option axios

        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
        };

        // Send the request and handle the response
        let result;
        try {
            result = await axios(options);
            return res.status(200).json(result.data);
        } catch (error) {
            return res
                .status(500)
                .json({ statusCode: 500, message: error.message });
        }
    }

    async callback(req, res, next) {
        console.log('callback: ');
        console.log(req.body);

        return res.status(200).json(req.body);
    }

    async transactionsStatus(req, res, next) {
        var orderId = req.body.orderId;
        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');
        const requestBody = JSON.stringify({
            partnerCode: 'MOMO',
            requestId: orderId,
            orderId,
            signature,
            lang: 'vi',
        });

        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/query',
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestBody,
        };

        try {
            let result = await axios(options);
            const data = result.data;
            console.log(data);

            if (data.message === 'Thành công.') {
                // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
                await Order.findByIdAndUpdate(orderId, {
                    paymentStatus: 'Đã thanh toán',
                });

                return res
                    .status(200)
                    .json({ message: 'Payment successful and order updated.' });
            } else {
                return res
                    .status(200)
                    .json({ message: 'Payment not successful.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new PaymentController();
