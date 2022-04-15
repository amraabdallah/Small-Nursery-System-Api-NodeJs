const {validationResult} = require('express-validator');
const Teacher = require('../models/teacher');

exports.getAllTeachers = (req, res) => {
    Teacher.find({})
        .then(teachers => {
            res.status(200).json({data: teachers});
        })
        .catch(err => {
            next(err)
            });
};

exports.getTeacherById = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    Teacher.findById(req.params.id)
        .then(teachers => {
            res.status(200).json({data: teachers});
        })
        .catch(err => {
            next(err)
            });
}

exports.createTeacher = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    new Teacher(req.body).save()
        .then(teacher => {
            res.status(200).json({
                data: teacher
            });
        })
        .catch(err => {
            next(err)
        });
}

exports.updateTeacher = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    Teacher.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(teacher => {
            res.status(200).json({
                data: teacher
            });
        }
        )
        .catch(err => {
            next(err)
        }
        );
    
}

exports.deleteTeacher = (req, res) => {
    let errorObjects = validationResult(req)
    if(!errorObjects.isEmpty()){
        let errStr = errorObjects.array().reduce((errSum,error)=>errSum+error.msg+" & ","")
        throw new Error(errStr)
    }
    Teacher.findByIdAndDelete(req.params.id)
        .then(teacher => {
            res.status(200).json({
                data: teacher
            });
        })
        .catch(err => {
            next(err)
        });
}