const {Router} = require('express');
const router = Router();

const {renderAbout,renderIndex, renderFeatures} = require('../controllers/index.controllers');

router.get('/', renderIndex);

router.get('/about',renderAbout );

router.get('/features',renderFeatures);



module.exports =router;