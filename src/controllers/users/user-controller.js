const { StatusCodes } = require('http-status-codes');
const userHelper = require('../../helpers/user-helper');

exports.SignUp = async (req, res) => {
    try {
        const result = await userHelper.signUp(req.body);
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Signup successfull'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error.message
        })
    }
}

exports.Login = async (req, res) => {
    try {
        const result = await userHelper.login(req.body);
        if (result) {
            return res.status(StatusCodes.OK).json({
                data: result,
                message: 'Login Successfull'
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
            message: 'Invalid credentials'
        })
    }
}