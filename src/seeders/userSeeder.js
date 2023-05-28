const  bcrypt = require('bcryptjs');
 ;

const userSeeder = [
    {
        name: "azher ali",
        email: "azher@gmail.com",
        password: bcrypt.hashSync("azher", 10),
        isAdmin: true
    },
    {
        name: "test",
        email: "azher1213@gmail.com",
        password: bcrypt.hashSync("azher1", 10),
    },
    {
        name: "ali123",
        email: "azhers123@gmail.com",
        password: bcrypt.hashSync("azher1", 10),
    },
]

module.exports = userSeeder; 