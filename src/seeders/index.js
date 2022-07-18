const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/order');
const userSeeder = require('./userSeeder');
const productSeeder = require('./productSeeder');
const colors = require('colors');
const dotenv = require('dotenv');
const dbConnection = require('../config/connection');

dotenv.config();
dbConnection();

const importSeeder = async () => {
    try {
        // delete all the users
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        // // insert users
        const user = await User.insertMany(userSeeder);
        const adminId = user[0]._id;
        const productData = productSeeder.map((product) => {
            return {
                ...product,
                userId: adminId,
            };
        });
        await Product.insertMany(productData);
        console.log('Data is Successfully Import!'.green);
        process.exit();
    } catch (error) {
        console.log(`User Data is not Import" ${error}`.red);
        process.exit(1)
    }
};

const deleteSeeder = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log("Data is successfully Deleted!".green.bold)
        process.exit()
    } catch(error) {
        console.log(`${error}`.red)
        process.exit(1)
    }
};
if(process.argv[2]=== "delete"){
    deleteSeeder()
}else {
    importSeeder()
}