const { createApp } = require('../models/appModel');

exports.blockApp = async (req, res) => {
  try {
    return res.status(200).json(req.body);
    const app = await createApp(req.body);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
