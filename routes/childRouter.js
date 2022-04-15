const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');
const {body, param} = require('express-validator');


router.get('/', childController.getAllChilds);

router.get('/:id',[
    param('id').isNumeric().withMessage('id must be a number')
], childController.getChildById);

router.post('/',[
    body('fullName').isString().withMessage('Full Name must be a string'),
    body('age').isNumeric().withMessage('age must be a number'),
    body('level').isIn(['PreKG','KG1','KG2']).withMessage('Level Must Be PreKG, KG1 or KG2'),
    body('address').exists().withMessage('Address is required'),
    body('address.city').isString().withMessage('City must contain characters only'),
    body('address.street').isString().withMessage('Street must contain characters only'),
    body('address.building').isNumeric().withMessage('Building must be a number'),    
] ,childController.createChild);

router.put('/:id',[
    body('fullName').optional().isString().withMessage('Full Name must be a string'),
    body('age').optional().isNumeric().withMessage('age must be a number'),
    body('level').optional().isIn(['PreKG','KG1','KG2']).withMessage('Level Must Be PreKG, KG1 or KG2'),
    body('address').optional().isObject().withMessage('Address is required'),
    body('address.city').optional().isString().withMessage('City must contain characters only'),
    body('address.street').optional().isString().withMessage('Street must contain characters only'),
    body('address.building').optional().isNumeric().withMessage('Building must be a number'),
] ,childController.updateChild);

router.delete('/:id',[
    param('id').isNumeric().withMessage('ID must be a number')
] ,childController.deleteChild);

module.exports = router;