import { Router } from "express";

import { authenticate } from "../middlewares/authenticate";
import { getSharedContent, shareContent } from "../controllers/shareController";

const shareRouter = Router();

// share content link
shareRouter.post('/share', authenticate, shareContent);

// get shared content - public route
shareRouter.get('/:shareLink', getSharedContent);

export default shareRouter;