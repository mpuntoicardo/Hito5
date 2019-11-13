/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


// Get user object
function getUsers(req, res) {
  // Finds all users in the database
  User.find({}, (error, users) => {
    if (error) return res.status(500).send({ error });

    return res.status(200).send(users);
  });
}

// Get user object by ID
function getUser(req, res) {
  const { userId } = req.params;

  // Finds the user with the id provided
  User.findById(userId, (error, user) => {
    if (error) return res.status(404).send({ message: 'No users found', error });

    return res.status(200).send(user);
  });
}

// Create and save a new user
function createUser(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });
    // Create a new user
    const user = new User({
      email: req.body.email,
      password: hash,
      surname: req.body.surname,
      phone: req.body.phone,
      name: req.body.name,
    });
    // Save the new user
    user.save((error, newUser) => {
      if (error) return res.status(400).send({ message: 'Error saving user', error });

      return res.status(200).send({ message: 'Saved user', newUser });
    });
  });
}

// Replace the user information
function replaceUser(req, res) {
  const { userId } = req.params;
  const { email } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { surname } = req.body;

  if (!email || !name || !surname || !password) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Create the new user
  const userReplacement = req.body;

  User.findById(userId, (err, user) => {
    if (err) return res.status(404).send({ message: 'No user to replace found', err });

    // Replaces the user
    user.replaceOne(userReplacement, (error) => {
      if (error) return res.status(500).send({ error });

      return res.status(200).send({ message: 'User replaced' });
    });
  });
}
// Update the user information
function editUser(req, res) {
  const { userId } = req.params;
  // Update the
  User.findByIdAndUpdate(userId, req.body, { new: true }, (error, user) => {
    if (error) return res.status(500).send({ error });

    return res.status(200).send({ message: 'User updated', user });
  });
}

// Deletes the user from the database
function deleteUser(req, res) {
  const { userId } = req.params;

  User.findByIdAndRemove(userId, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User deleted', user });
  });
}

// Validate the information to log in
function login(req, res) {
  const { email } = req.body;
  const { password } = req.body;

  // Find the user and check if the password is correct
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'No user found' });
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) return res.status(401).json({ message: 'Auth failed' });
      if (result) {
        const token = jwt.sign({ email, userId: user.id }, 'private', { expiresIn: 60 * 60 * 24 * 31 });
        return res.status(200).json({ message: 'Auth succesful', token });
      }
    });
  });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  replaceUser,
  editUser,
  deleteUser,
  login,
};
