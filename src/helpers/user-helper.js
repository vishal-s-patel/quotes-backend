const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (payload) => {
    const user = new User({
        firstname: payload.firstname.toString(),
        lastname: payload.lastname.toString(),
        password: await bcrypt.hash(payload.password, 10),
        email: payload.email.toString()
    })
    return user.save();
}

exports.login = async (payload) => {
    const user = await User.findOne({ email: payload.email });
    const password = await bcrypt.compare(payload.password, user.password);
    if (password) {
        return user;
    } else {
        throw Error('Invalid credential')
    }
}