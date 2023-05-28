const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../index')
const User = require('../models/User')
const  bcrypt = require('bcryptjs');

const userOneId = new mongoose.Types.ObjectId()
// tokens: [{
//     token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
// }]
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: bcrypt.hashSync("azher", 10),
    
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
    
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/api/user/signup').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(200)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.data.user._id)
    expect(user).not.toBeNull()
})

test('Not Signup when data is not Valid', async () => {
   await request(app).post('/api/user/signup').send({
        name: '',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(400)
    const response = await request(app).post('/api/user/signup').send({
        name: 'newUser',
        email: '',
        password: 'MyPass777!'
    }).expect(400)

    // Assert that the database was changed correctly
    // const user = await User.findById(response.body.data.user._id)
    // expect(user).not.toBeNull()
})


// test('Should login existing user', async () => {
//     const response = await request(app).post('/users/login').send({
//         email: userOne.email,
//         password: userOne.password
//     }).expect(200)
//     const user = await User.findById(userOneId)
//     expect(response.body.token).toBe(user.tokens[1].token)
// })

// test('Should not login nonexistent user', async () => {
//     await request(app).post('/users/login').send({
//         email: userOne.email,
//         password: 'thisisnotmypass'
//     }).expect(400)
// })

// test('Should get profile for user', async () => {
//     await request(app)
//         .get('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200)
// })

// test('Should not get profile for unauthenticated user', async () => {
//     await request(app)
//         .get('/users/me')
//         .send()
//         .expect(401)
// })

// test('Should delete account for user', async () => {
//     await request(app)
//         .delete('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200)
//     const user = await User.findById(userOneId)
//     expect(user).toBeNull()
// })

// test('Should not delete account for unauthenticate user', async () => {
//     await request(app)
//         .delete('/users/me')
//         .send()
//         .expect(401)
// })

// test('Should upload avatar image', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(200)
//     const user = await User.findById(userOneId)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })

// test('Should update valid user fields', async () => {
//     await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//             name: 'Jess'
//         })
//         .expect(200)
//     const user = await User.findById(userOneId)
//     expect(user.name).toEqual('Jess')
// })

// test('Should not update invalid user fields', async () => {
//     await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//             location: 'Philadelphia'
//         })
//         .expect(400)
