import PerformanceReview from '../models/PerformanceReview';

const mapModel = model => ({
  id: model.get('id'),
  status: model.get('status'),
  comment: model.get('comment'),
  created_at: model.get('created_at'),
  updated_at: model.get('updated_at'),
  author: {
    name: model.related('author').get('name'),
    title: model.related('author').get('title'),
    avatar_url: model.related('author').get('avatar_url'),
  },
  reviewer: {
    id: model.related('reviewer').get('id'),
    name: model.related('reviewer').get('name'),
    title: model.related('reviewer').get('title'),
    avatar_url: model.related('reviewer').get('avatar_url'),
  },
  receiver: {
    id: model.related('receiver').get('id'),
    name: model.related('receiver').get('name'),
    title: model.related('receiver').get('title'),
    avatar_url: model.related('receiver').get('avatar_url'),
  },
  reaction: {
    id: model.related('reaction').get('id'),
    name: model.related('reaction').get('name'),
    sentiment: model.related('reaction').get('sentiment'),
  }
});

const getById = async id => {
  const model = await PerformanceReview
    .forge({ id })
    .fetch({ withRelated: ['author', 'reviewer', 'receiver', 'reaction'] });
  return mapModel(model);
};

const getAll = async (filter = {}) => {
  const where = {};
  ['author_id', 'receiver_id', 'reviewer_id', 'status'].forEach(column => {
    if (filter[column]) {
      where[column] = filter[column];
    }
  });

  const models = await PerformanceReview
    .where(where)
    .fetchAll({ withRelated: ['author', 'reviewer', 'receiver', 'reaction'] });
  return models.map(mapModel);
};

export default {
  getById,
  getAll,
};
