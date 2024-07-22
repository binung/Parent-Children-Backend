const { createApp } = require('../models/appModel');

exports.blockApp = async (req, res) => {
  try {
    const app = await createApp(req.body);
    if (!app) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
