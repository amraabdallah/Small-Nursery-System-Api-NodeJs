const { validationResult } = require('express-validator');
const { json } = require('express/lib/response');

exports.login = (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let errorStr = errors.array().reduce((sum,error)=>sum+error.msg+" & ","")
        throw new Error(errorStr)
    }
    //login logic here
    res.status(200).json(req.body);
};

exports.register = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorStr = errors.array().reduce((sum,error)=>sum+error.msg+" & ","")
        throw new Error(errorStr)
    }
    //register logic here
    res.status(200).json(req.body);
};
