import bookshelf from '../../bookshelf';

class Employee extends bookshelf.Model {
  get tableName() {
    return 'employee';
  }

  assignedReviews() {
    return this.hasMany('PerformanceReview', 'reviewer_id');
  }
};

export default bookshelf.model('Employee', Employee);
