import Employee from '../models/Employee';

const mapModel = model => ({
  id: model.get('id'),
  name: model.get('name'),
  email: model.get('email'),
  title: model.get('title'),
  type: model.get('type'),
  avatar_url: model.get('avatar_url'),
  created_at: model.get('created_at'),
  updated_at: model.get('updated_at'),
});

/**
 * Returns an employee object
 * @param {Number} id - Employee id
 * @returns Object if success
 * @throws Exception if error
 */
const getById = async id => {
  const model = await Employee.forge({ id }).fetch();
  return mapModel(model);
};

const getAll = async () => {
  const models = await Employee.fetchAll();
  return models.map(mapModel);
};

export default {
  getById,
  getAll,
};
