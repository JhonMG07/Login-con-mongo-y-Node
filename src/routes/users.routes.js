const { Router } = require("express");
const router = Router();

const {
  SignIn,
  SignUp,
  logOut,
  renderSignInForm,
  renderSignUpForm
} = require("../controllers/users.controllers");

//signIn
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup',SignUp);

//SignUp
router.get('/users/signin', renderSignInForm);
router.post('/users/signin',SignIn);

//logOut
router.get('/users/logout',logOut);

module.exports = router;
