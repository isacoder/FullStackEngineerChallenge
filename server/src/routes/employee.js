import express from 'express';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import md5 from 'crypto-js/md5';
import ControllerEmployee from '../controllers/employee';
import Employee from '../models/Employee';

const router = express();

router.get('/', async (req, res) => {
  try {
    const employees = await ControllerEmployee.getAll();
    res.status(200).send({ employees });
  } catch (e) {
    res.status(500).send({ error: 'System unavailable' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await ControllerEmployee.getById(req.params.id);
    res.status(200).send({ employee });
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
  const { name, email, password, title, avatar_url } = body;

  const errors = {};

  if (isEmpty(name)) {
    errors.name = 'required';
  }

  if (isEmpty(email)) {
    errors.email = 'required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'invalid';
  }

  if (isEmpty(password)) {
    errors.password = 'required';
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = 'invalid_length';
  }

  if (isEmpty(title)) {
    errors.title = 'required';
  } else if (!validator.isLength(title, { min: 6 })) {
    errors.title = 'invalid_length';
  }

  if (isEmpty(avatar_url)) {
    errors.avatar_url = 'required';
  } else if (!validator.isURL(avatar_url)) {
    errors.avatar_url = 'invalid_url';
  }

  if (!isEmpty(errors)) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const employee = await Employee.forge({
      name, email, title, avatar_url, password: md5(password).toString(),
    }).save();
    res.status(201).send({ message: 'OK!' });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ error: 'Duplicated email' });
      return;
    }
    res.status(500).send({ error: 'System unavailable' });
  }
});

export default router;
