const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const {body, query, param} = require('express-validator');

router.get('/', teacherController.getAllTeachers);

router.get('/:id',[
    param('id').isMongoId().withMessage('Id must be a number')
], teacherController.getTeacherById);

router.post('/',[
    body('fullName').matches(/^[a-zA-Z ]+$/).withMessage('Full Name must be a string'),
    body('password').isStrongPassword().withMessage('Password must be at least 8 characters long, contain at least one number and one special character'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('image').isAlphanumeric().withMessage("Enter a valid Image"),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {throw new Error('Passwords do not match')}
        return true;
    }),
],teacherController.createTeacher);

router.put('/:id',[
    body('fullName').optional().matches(/^[a-zA-Z ]+$/).withMessage('Full Name must be a string'),
    body('image').optional().isAlphanumeric().withMessage("Enter a valid Image"),
    body('email').optional().isEmail().withMessage('Please enter a valid email'),
    body('password').optional().isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('confirmPassword').optional().custom((value, {req}) => {
        if (value !== req.body.password) {throw new Error('Passwords do not match')}
        return true;
    }),
] ,teacherController.updateTeacher);

router.delete('/:id',[
    param('id').isNumeric().withMessage('ID must be a number')
] ,teacherController.deleteTeacher);

module.exports = router;