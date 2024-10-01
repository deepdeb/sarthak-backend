const Joi = require('joi');
const loginService = require('../../services/loginService');
exports.loginController = async (req, res) => {
    try {
        const loginData = Joi.object({
            sbu_id: Joi.required(),
            username: Joi.required(),
            password: Joi.required()
        })
        const { error, value } = loginData.validate(req.body);
        if(error) {
            console.log(`Invalid login data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid login data`);
        const resp = await loginService.login(req.body);
        if(resp) {
            return res.json({success: true, status: 200, response: resp});
        } else {
            return res.json({success: false, status: 500, response: []});
        }
    } catch (error) {
        console.log('Login controller error: ', error);
        return
    }
} 