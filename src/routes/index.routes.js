const {Router} = require('express');
const router = Router();

const {renderAbout,renderIndex} = require('../controllers/index.controllers');

router.get('/', renderIndex);

router.get('/about',renderAbout );


module.exports =router;