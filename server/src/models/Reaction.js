import bookshelf from '../../bookshelf';

class Reaction extends bookshelf.Model {
  get tableName() {
    return 'reaction';
  }
};

export default bookshelf.model('Reaction', Reaction);
