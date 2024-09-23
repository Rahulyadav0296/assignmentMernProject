const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getByEmail,
  signIn,
} = require("../controllers/auth");
const {
  isRequestValidated,
  validateSignInRequest,
  validateSignUpRequest,
} = require("../validator/auth");

router.get("/users/details", getUser);
router.get("/users/:email", getByEmail);
router.route("/signin").post(validateSignInRequest, isRequestValidated, signIn);
router
  .route("/users")
  .post(validateSignUpRequest, isRequestValidated, createUser);

module.exports = router;
