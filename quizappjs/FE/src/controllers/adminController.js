import { adminQuizController } from './adminQuizController.js';
import { adminUserController } from './adminUserController.js';
import { adminResultController } from './adminResultController.js';
import { adminDocumentController } from './adminDocumentController.js';

export const adminController = {
  ...adminQuizController,
  ...adminUserController,
  ...adminResultController,
  ...adminDocumentController
};
