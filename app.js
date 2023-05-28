const colors = require('colors');
const app = require("./src/index")


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Application is running on port:'.bgBlue, colors.red(port));
});






































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