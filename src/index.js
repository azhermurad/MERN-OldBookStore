const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoute = require('./routers/product');
const userRoutes = require('./routers/userRoutes');
const orderRoute = require('./routers/orderRoutes');
const stripeRoute = require("./routers/stripeRouter");
const dbConnection = require('./config/connection');
const path = require('path');
dotenv.config();

const app = express();
// connection to Database

dbConnection();
app.use(cors());
app.post(
    "/api/webhook",
    express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );
app.use(express.json());
// this route is use for the static file
const staticFilePath = path.resolve(__dirname,"../uploads");
// app.use("/uploads/images",express.static(staticFilePath));
console.log(path.join(__dirname, '/uploads'),staticFilePath)
app.use('/uploads', express.static(staticFilePath));
app.get('/', (req, res) => {
    res.send(process.env.MONGODB_URL);
});
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(stripeRoute);
app.use(productRoute);
app.use(userRoutes);
app.use(orderRoute);

module.exports = app;


// so we have to make the best payment method for the user in the database so that the user can pay the money with his/her master card which is the most 
// effecient to the all the user who want to buy the books for the store









































// app.get('/api/payment/jazzcash', (req, res) => {
//     Date.prototype.YYYYMMDDHHMMSS = function () {
//         var yyyy = this.getFullYear().toString();
//         var MM = pad(this.getMonth() + 1, 2);
//         var dd = pad(this.getDate(), 2);
//         var hh = pad(this.getHours(), 2);
//         var mm = pad(this.getMinutes(), 2);
//         var ss = pad(this.getSeconds(), 2);

//         return yyyy + MM + dd + hh + mm + ss;
//     };

//     function addHours(date, hours) {
//         date.setHours(date.getHours() + hours);

//         return date;
//     }
//     d = new Date();

//     const newDate = addHours(d, 1);

//     function pad(number, length) {
//         var str = '' + number;
//         while (str.length < length) {
//             str = '0' + str;
//         }
//         return str;
//     }

//     function removeEmptyValues(object) {
//         const sort = Object.keys(object)
//             .sort()
//             .reduce((accumulator, key) => {
//                 accumulator[key] = object[key];

//                 return accumulator;
//             }, {});
//         console.log(sort);
//         let str = 'uw9vw57331';
//         for (var key in sort) {
//             if (sort.hasOwnProperty(key)) {
//                 var value = sort[key];
//                 if (value !== '') {
//                     str = str + '&' + value;
//                 }
//             }
//         }
       
//         console.log(str);
//         // crypto.createHmac('sha256', str,"uw9vw57331").digest('hex');;
//         const hash = crypto
//             .createHmac('SHA256',  Buffer.from('uw9vw57331', 'utf-8').toString())
//             .update(Buffer.from(str, 'utf-8').toString())
//             .digest('hex');

//         return hash.toString();
//     }

//     const data = {
//         pp_Language: 'EN',
//         pp_TxnType: 'MWALLET',
//         pp_Version: '2.0',
//         pp_MerchantID: 'MC56489',
//         pp_SubMerchantID: '',
//         pp_Password: 'tdc49z7c87',
//         // pp_BankID: '',
//         // pp_ProductID: '',
//         pp_TxnRefNo: 'T' + d.YYYYMMDDHHMMSS(),
//         pp_MobileNumber: '03411728699',
//         pp_CNIC: '345678',
//         pp_Amount: '1000',
//         pp_DiscountedAmount: '',
//         pp_TxnCurrency: 'PKR',
//         pp_TxnDateTime: d.YYYYMMDDHHMMSS(),
//         pp_BillReference: 'billRef',
//         pp_Description: 'Description',
//         pp_TxnExpiryDateTime: newDate.YYYYMMDDHHMMSS(),
//         pp_SecureHash: '',
//         ppmpf_1: '',
//         ppmpf_2: '',
//         ppmpf_3: '',
//         ppmpf_4: '',
//         ppmpf_5: '',
//     };

//     // const removeN = removeEmptyValues({ ...data });
//     // data.pp_SecureHash = removeN;
//     var config = {
//         method: 'post',
//         url: 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         data: JSON.stringify(data),
//     };

//     axios(config)
//         .then(function (response) {
//             console.log(JSON.stringify(response.data));
//             res.send(response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//             res.send(error);
//         });

//     // # initializes your jazzcash
// Jazzcash.credentials({
//   config: {
//     merchantId: "MC56489", // Merchant Id
//     password: "tdc49z7c87", // Password
//     hashKey: "uw9vw57331", // Hash Key
//   },
//   environment: 'sandbox' // available environment live or sandbox
// });

// // # set jazzcash data fields according to your request
// Jazzcash.setData({
//     pp_Language: 'EN',
   
//     pp_MerchantID: 'MC56489',
//     pp_SubMerchantID: '',
//     pp_Password: 'tdc49z7c87',
//     pp_TxnRefNo: 'T' + d.YYYYMMDDHHMMSS(),
//     pp_MobileNumber: '03411728699',
//     pp_CNIC: '345678',
//     pp_Amount: '1000',
//     pp_DiscountedAmount: '',
//     pp_TxnCurrency: 'PKR',
//     pp_TxnDateTime: d.YYYYMMDDHHMMSS(),
//     pp_BillReference: 'billRef',
//     pp_Description: 'Description',
//     pp_TxnExpiryDateTime: newDate.YYYYMMDDHHMMSS(),
//     ppmpf_1: '',
//     ppmpf_2: '',
//     ppmpf_3: '',
//     ppmpf_4: '',
//     ppmpf_5: '',
// });

// // # returns jazzcash response
// // # REQUEST TYPES (PAY, WALLET, INQUIRY, REFUND)
// Jazzcash.createRequest("PAY").then((res) => {
//   ; // don't parse for PAY
//   console.log(res);
//   var config = {
//     method: 'post',
//     url: 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     data: JSON.stringify(res),
// };

// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//         return res.send(response.data);
        
//     })
//     .catch(function (error) {
//         console.log(error);
//        return res.send(error);
//     });
// });
// });