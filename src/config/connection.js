const mongoose = require('mongoose');

// this function is used to connection to the database if Database not Exist it will create datbase for use
const dbConnection = async () => {
    try {
      const conn =  await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database is connected successfully!',conn.connection.host);
    } catch (error) {
        console.log('database is not connected!', error.message);
        process.exit(1);
    }

    // we have to implement the stripe in the project so that the user can pay using his credit card that is more user friendly 

    
    
};
module.exports = dbConnection;
// in this file we have to make the database connection to the applcicatioin so that the user can fetch the data from database
