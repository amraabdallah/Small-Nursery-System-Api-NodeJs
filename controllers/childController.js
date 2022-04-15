const {validationResult} = require('express-validator');
const child = require('../models/child');
const Child = require('../models/child');

exports.getAllChilds = (req, res) => {
    
    Child.find()
        .then(childs => {
            res.status(200).json(childs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.getChildById = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    Child.findById(req.params.id).then(child =>{
        res.status(200).json({
            data:child
        })
    }).catch(err => {
        next(err)
    })
}

exports.createChild = (req, res,next) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    new Child(req.body).save()
        .then(child => {
            res.status(200).json({
                data: child
            });
        })
        .catch(err => {
            next(err)
        });
}

exports.updateChild = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    Child.findById(req.params.id)
    .then(child =>{
        //update the field
        for(let prop in req.body){
            child[prop] = req.body[prop]
        }
        //save the updated field
        child.save()
        .then(child =>{
            res.status(200).json({
                data:child
            })
        })
        .catch(err => {
            next(err)
        })
    })
    .catch(err => {
        next(err)
    })

}

exports.deleteChild = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    Child.findByIdAndDelete(req.params.id)
    .then(child =>{
        res.status(200).json({
            data:child
        })
    })
    .catch(err => {
        next(err)
    })

}
