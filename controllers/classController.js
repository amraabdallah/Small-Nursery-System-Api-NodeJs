const {validationResult} = require('express-validator');
const Class = require('../models/class');

exports.getAllClasses = (req, res) => {
    Class.find({}).populate('supervisor')
        .then(classes => {
            res.status(200).json({data: classes});
        })
        .catch(err => {
            next(err)
        });
}


exports.getClassById = (req, res) => {
    Class.findById(req.params.id)
        .then(classData => {
            res.status(200).json({data: classData});
        })
        .catch(err => {
            next(err)
        });
}

exports.createClass = (req, res,next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array().reduce((acc, obj)=>acc + obj.msg+"\n", " ")});
    }
    Class.create(req.body)
        .then(classData => {
            res.status(200).json({data: classData});
        })
        .catch(err => {
            next(err)
        }
        );
}


exports.updateClass = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array().reduce((acc, obj)=>acc + obj.msg+"\n", " ")});
    }

    for (let prop in req.body) {
        Class.findByIdAndUpdate(req.params.id, {$set: {[prop]: req.body[prop]}}, {new: true})
            .then(classData => {
                res.status(200).json({data: classData});
            })
            .catch(err => {
                next(err)
            });
    }
}

exports.deleteClass = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array().reduce((acc, obj)=>acc + obj.msg+"\n", " ")});
    }
    Class.findByIdAndRemove(req.params.id)
        .then(classData => {
            res.status(200).json({data: classData});
        })
        .catch(err => {
            next(err)
        });
}

exports.getClassChildren = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array().reduce((acc, obj)=>acc + obj.msg+"\n", " ")});
    }
}

exports.getClassTeacher = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array().reduce((acc, obj)=>acc + obj.msg+"\n", " ")});
    }
}