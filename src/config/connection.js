const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
      const conn =  await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database is connected successfully!',conn.connection.host);
    } catch (error) {
        console.log('database is not connected!', error.message);
        process.exit(1);
    }
};
module.exports = dbConnection;
