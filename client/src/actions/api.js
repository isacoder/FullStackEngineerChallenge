import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || 'http://localhost:3000',
});

export const getByAuthorId = async author_id => {
  const params = {
    'filter[author_id]': author_id
  };
  const { data } = await client.get('/performance_review', { params });
  return data.performance_reviews;
};

export const getByReceiverId = async (receiver_id, status = "done") => {
  const params = {
    'filter[receiver_id]': receiver_id,
    'filter[status]': status,
  };
  const { data} = await client.get('/performance_review', { params });
  return data.performance_reviews;
};

export const getByReviewerId = async (reviewer_id, status = "in_review") => {
  const params = {
    'filter[reviewer_id]': reviewer_id,
    'filter[status]': status,
  };
  const { data } = await client.get('/performance_review', { params });
  return data.performance_reviews;
};

export const createReview = async (author_id, receiver_id, reviewer_id) => {
  const { status } = await client.post('/performance_review');
  return status;
};

export const submitReview = async (review_id, comment, reaction_id) => {
  const { status } = await client.put(`/performance_review/${review_id}`, {comment, reaction_id });
  return status;
};

export const getEmployeeById = async employee_id => {
  const { data } = await client.get(`/employee/${employee_id}`);
  return data.employee;
};

export const getReactions = async () => {
  const { data } = await client.get('/reaction');
  return data.reactions;
};
