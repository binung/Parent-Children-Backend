const db = require('../config/db');

const createApp = async (data) => {
    const child_id = data.child_id;
    const app_name = data.app_name;
    const state = data.state;
    const package_name = data.package_name;
    const avatar = data.avatar;
    const app_usage_time = data.app_usage_time;
    const created_at = Date.now();
    const updated_at = Date.now();
  const [result] = await db.query('INSERT INTO block_apps (child_id, app_name, state, created_at, updated_at, package_name, avatar, app_usage_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [child_id, app_name, state, created_at, updated_at, package_name, avatar, app_usage_time]);
  return result;
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
    createApp,
    findAppByPackageName,
    UpdateAppTable
};
