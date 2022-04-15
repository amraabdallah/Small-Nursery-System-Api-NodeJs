const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {body, query, param} = require('express-validator');
const teacher = require('../controllers/teacherController') 
//login router
router.post('/login',[
    body('userName').isAlpha().withMessage('Username must be characters only!'),
    body('password').isLength({min: 4}).withMessage('Password must be at least 4 characters long')
] ,AuthController.login);

//register router
router.post('/register',[
    // body('id').isMongoId()
    body('id').isObject().withMessage('id must be an object'),
    body('fullName').matches(/^[a-zA-Z ]+$/).withMessage('Full Name must be a string'),
    body('password').isStrongPassword().withMessage('Password must be at least 8 characters long, contain at least one number and one special character'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('image').isAlphanumeric().withMessage("Enter a valid Image"),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {throw new Error('Passwords do not match')}
        return true;
    }),
] ,teacher.createTeacher);

module.exports = router;