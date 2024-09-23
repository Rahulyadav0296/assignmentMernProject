const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { name, email, password, age } = req.body;
  if (!name || !email || !password || !age) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const hash_password = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    hash_password,
    age,
  };

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    }

    const newUser = await User.create(userData);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created Successfully", user: newUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist!",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const { _id, name, email, age } = user;
    return res.status(StatusCodes.OK).json({
      token,
      user: { _id, name, email, age },
    });
  } catch (error) {
    console.error("Error in signIn:", error); // Log the error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const getByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User Not Found!" });
    }

    const { hash_password, ...userdetails } = user.toObject();
    return res.status(StatusCodes.OK).json(userdetails);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching user details",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find(); // Variable should be plural, users

    if (!users || users.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No Users Found!" });
    }

    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching user details",
      error: error.message,
    });
  }
};

module.exports = { createUser, getUser, signIn, getByEmail };
