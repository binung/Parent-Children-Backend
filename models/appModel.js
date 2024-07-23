const db = require('../config/db');

const saveApp = (data, callback) => {
    const child_id = data.child_id;
    const app_name = data.appName;
    const package_name = data.packageName;
    const avatar = data.icon;
    const created_at = Date.now();
    const updated_at = Date.now();
    const query = 'INSERT INTO block_apps (child_id, app_name, created_at, updated_at, package_name, avatar) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(query, [child_id, app_name, created_at, updated_at, package_name, avatar], (err, result) => {
      callback(err, result);
    });
};

const findAppByPackageName = async (package_name) => {
  const [rows] = await db.query('SELECT * FROM block_apps WHERE package_name = ?', [package_name]);
  return rows[0];
};

const UpdateAppTable = async (apps) => {
    updated_at = Date.now();
    await apps.forEach((value, index) => {
        db.query('UPDATE block_apps SET state = ?, updated_at = ?, app_usage_time = ?', [value.state, updated_at, value.app_usage_time]);
    });
    return true;
}

module.exports = {
    saveApp,
    findAppByPackageName,
    UpdateAppTable
};
