const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = await createUser(username, email, hashedPassword);

    const payload = {
      user: {
        id: userId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await findUserByEmail(identifier);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        'name': user.name,
        'id': user.id,
      },
    };

    jwt.sign(  
      payload,  
      process.env.JWT_SECRET,  
      { expiresIn: 3600 },  
      (err, token) => {  
        if (err) throw err;  
  
        // Send back the token structured as a Bearer token  
        res.json({ 'access_token': `Bearer ${token}`, 'token_type': 'Bearer', 'user':payload});  
      }  
    );  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};
