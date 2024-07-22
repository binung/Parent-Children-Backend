const { findUserById, findChildren } = require('../models/userModel');

exports.getUser = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getChildren = async (req, res) => {
  try {
    const params = req.params;
    return res.status(200).json({id:params.id})
    const children = await findChildren(params.id);
    return res.status(200).json({children});
    if (!children) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(children);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
