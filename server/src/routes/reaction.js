import express from 'express';
import ControllerReaction from '../controllers/reaction';

const router = express();

router.get('/', async (req, res) => {
  try {
    const reactions = await ControllerReaction.getAll();
    res.status(200).send({ reactions });
  } catch (e) {
    res.status(500).send({ error: 'System unavailable' });
  }
});

export default router;
