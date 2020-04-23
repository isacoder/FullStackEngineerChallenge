import Reaction from '../models/Reaction';

const mapModel = model => ({
  id: model.get('id'),
  name: model.get('name'),
  sentiment: model.get('sentiment'),
});

const getById = async id => {
  const model = await Reaction.forge({ id }).fetch();
  return mapModel(model);
};

const getAll = async () => {
  const models = await Reaction.fetchAll();
  return models.map(mapModel);
}

export default {
  getById,
  getAll,
};
