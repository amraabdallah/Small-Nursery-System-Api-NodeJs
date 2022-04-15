const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const {body, query, param} = require('express-validator');

router.get('/class', classController.getAllClasses);

router.get('/class/:id',[
    param('id').isNumeric().withMessage('id must be a number')
], classController.getClassById);

router.post('/class',[
    body('id').isNumeric().withMessage('id must be a number'),
    body('name').matches(/^[a-zA-Z ]+$/).withMessage('Name must be a string [A-z ]'),
    body('supervisor').isObject().withMessage('supervisor(Teacher) must be an object'),
    body('children').isArray().withMessage('children must be an array'),
] ,classController.createClass);

router.put('/class/:id',[
    body('name').optional().matches(/^[a-zA-Z ]+$/).withMessage('Name must be a string [A-z ]'),
    body('supervisor').optional().isMongoId().withMessage('supervisor(Teacher) must be an object'),
    body('children').optional().isArray().withMessage('children must be an array'),
    body('children.*').optional().isInt().withMessage('children must be an array of objects'),
] ,classController.updateClass);

router.delete('/class/:id',[
    param('id').isNumeric().withMessage('id must be a number')
] ,classController.deleteClass);

router.get('/classchildren/:id',[
    param('id').isNumeric().withMessage('id must be a number')
] ,classController.getClassChildren);

router.get('/classteacher/:id',[
    param('id').isNumeric().withMessage('id must be a number')
] ,classController.getClassTeacher);

module.exports = router;