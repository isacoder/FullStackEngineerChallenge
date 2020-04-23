import axios from 'axios';

const api_url = 'http://localhost:8000';
export const getByAuthorId = async author_id => {
  const params = {
    'filter[author_id]': author_id
  };
  const { data } = await axios.get(`${api_url}/performance_review`, { params });
  return data.performance_reviews;
};

export const getByReceiverId = async (receiver_id, status = "done") => {
  const params = {
    'filter[receiver_id]': receiver_id,
    'filter[status]': status,
  };
  const { data} = await axios.get(`${api_url}/performance_review`, { params });
  return data.performance_reviews;
};

export const getByReviewerId = async (reviewer_id, status = "in_review") => {
  const params = {
    'filter[reviewer_id]': reviewer_id,
    'filter[status]': status,
  };
  const { data } = await axios.get(`${api_url}/performance_review`, { params });
  return data.performance_reviews;
};

export const createReview = async (author_id, receiver_id, reviewer_id) => {
  const { status } = await axios.post(`${api_url}/performance_review`);
  return status;
};

export const submitReview = async (review_id, comment, reaction_id) => {
  const { status } = await axios.put(`${api_url}/performance_review/${review_id}`, {comment, reaction_id });
  return status;
};

export const getEmployeeById = async employee_id => {
  const { data } = await axios.get(`${api_url}/employee/${employee_id}`);
  return data.employee;
};

export const getReactions = async () => {
  const { data } = await axios.get(`${api_url}/reaction`);
  return data.reactions;
};