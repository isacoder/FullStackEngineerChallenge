import bookshelf from '../../bookshelf';

class PerformanceReview extends bookshelf.Model {
  get tableName() {
    return 'performance_review';
  }

  author() {
    return this.belongsTo('Employee', 'author_id', 'id');
  }

  reviewer() {
    return this.belongsTo('Employee', 'reviewer_id', 'id');
  }

  receiver() {
    return this.belongsTo('Employee', 'receiver_id', 'id');
  }

  reaction() {
    return this.belongsTo('Reaction', 'reaction_id', 'id');
  }

  static async updateById(id, params) {
    const model = await this.forge({ id }).fetch();
    await model.save(params);
    return model;
  }
};

export default bookshelf.model('PerformanceReview', PerformanceReview);
