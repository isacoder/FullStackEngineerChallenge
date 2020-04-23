import express from 'express';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import isInteger from 'lodash/isInteger';
import isUndefined from 'lodash/isInteger';
import ControllerPerformanceReview from '../controllers/performance_review';
import ControllerEmployee from '../controllers/employee';
import ControllerReaction from '../controllers/reaction';
import PerformanceReview from '../models/PerformanceReview';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../constants';

const router = express();

router.get('/', async (req, res) => {
  try {
    const performance_reviews = await ControllerPerformanceReview.getAll(req.query.filter);
    res.status(200).send({ performance_reviews });
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'System unavailable' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const performance_review = await ControllerPerformanceReview.getById(req.params.id);
    res.status(200).send({ performance_review });
  } catch (e) {
    if (e.message === 'EmptyResponse') {
      res.status(404).send({ message: 'Not Found' });
      return;
    }
    res.status(500).send({ error: 'System unavailable' });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  const { author_id, reviewer_id, receiver_id  } = body;

  const errors = {};
  if (!validator.isNumeric(`${author_id}`)) {
    errors.author_id = 'required';
  }

  if (!validator.isNumeric(`${reviewer_id}`)) {
    errors.reviewer_id = 'required';
  }

  if (!validator.isNumeric(`${receiver_id}`)) {
    errors.receiver_id = 'required';
  }

  if (!isEmpty(errors)) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const author = await ControllerEmployee.getById(author_id);
    if (author.type !== 'admin') {
      res.status(403).send({ error: 'Unauthorized' });
      return;
    }
  } catch (e) {
    res.status(500).send({});
    return;
  }

  try {
    const review = await PerformanceReview.forge({
      author_id, reviewer_id, receiver_id,
    }).save();

    res.status(201).send({ message: 'OK!' });
  } catch (e) {
    res.status(500).send({ error: 'System unavailable' });
  }
});

// add comment, add reaction, set state to "done"
router.put('/:id', async (req, res) => {
  const { body } = req;
  const { comment, reaction_id } = body;
  const errors = {};
  let performanceReview;
  let reaction;

  try {
    performanceReview = await ControllerPerformanceReview.getById(req.params.id);
    if (performanceReview.status !== 'in_review') {
      res.status(400).send({ error: 'Cannot modified performance review that has been completed.' })
      return;
    }
  } catch (e) {
    if (e.message === 'EmptyResponse') {
      res.status(404).send({ message: 'Not Found' });
      return;
    }
    res.status(500).send({ error: e });
    return;
  }

  if (!isInteger(reaction_id)) {
    errors.reaction_id = 'invalid_value';
  } else {
    try {
      reaction = await ControllerReaction.getById(reaction_id);
    } catch (e) {
      if (e.message === 'EmptyResponse') {
        errors.reaction_id = 'invalid_id';
      } else {
        res.status(500).send({ error: 'Error while validating reaction' });
        return;
      }
    }
  }

  if (isEmpty(comment)) {
    errors.comment = 'required';
  } else if (!validator.isLength(comment, { min: MIN_COMMENT_LENGTH, max: MAX_COMMENT_LENGTH })) {
    errors.comment = 'invalid_length';
  }

  if (!isEmpty(errors)) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const model = await PerformanceReview.updateById(req.params.id, {
      comment, reaction_id, status: 'done',
    });
    res.status(200).send({ model });
    return;
  } catch (e) {
    console.log('error', e);
    res.status(500).send({ error: 'Error while updating performance review' });
    return;
  }
});

export default router;
