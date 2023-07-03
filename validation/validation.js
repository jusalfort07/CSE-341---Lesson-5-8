const { body, validationResult } = require('express-validator');

const petsValidation = () => {
    return[
        body('birthday', 'Birthday is required').not().isEmpty(),
        body('breed', 'Breed is required').not().isEmpty(),
        body('color', 'Color is required').not().isEmpty(),
        body('name', 'Name is required').not().isEmpty(),
        body('sex', 'Sex is required').not().isEmpty(),
        body('size', 'Size is required').not().isEmpty(),
        body('weight', 'Weight is required').not().isEmpty()
    ]
};

const potentialOwnersValidation = () => {
    return[
        body('firstName', 'First name is required').not().isEmpty(),
        body('lastName', 'Last Name is required').not().isEmpty(),
        body('birthday', 'Birthday is required').not().isEmpty(),
        body('firstTimeOwner', 'First time owner field is required').not().isEmpty(),
        body('numberOfPetsOwned', 'Number of pets owned is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true })
    ]
}

const adminsValidation = () => {
    return[
        body('firstName', 'First name is required').not().isEmpty(),
        body('lastName', 'Last Name is required').not().isEmpty(),
        body('birthday', 'Birthday is required').not().isEmpty(),
        body('isActive', 'IsActive field is required').not().isEmpty(),
    ]
}

const donatorsValidation = () => {
    return[
        body('firstName', 'First name is required').not().isEmpty(),
        body('lastName', 'Last Name is required').not().isEmpty(),
        body('amount', 'Amount is required').not().isEmpty(),
    ]
}


const validate = (req,res,next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extractedError = [];
    errors.array().map((err) => extractedError.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedError
    });
}

module.exports = {
    petsValidation,
    potentialOwnersValidation,
    adminsValidation,
    donatorsValidation,
    validate,
}