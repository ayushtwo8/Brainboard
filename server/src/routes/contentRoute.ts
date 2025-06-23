import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate';
import { addContent, deleteContent, getUserContent } from '../controllers/contentController';

const contentRouter = Router();

// add content
contentRouter.post('/', authenticate, addContent);

// get user content
contentRouter.get('/', authenticate, getUserContent);

// delete some content
contentRouter.delete('/', authenticate, deleteContent);

export default contentRouter;