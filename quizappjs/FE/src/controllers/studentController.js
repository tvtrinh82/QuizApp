import { studentDashboardController } from './studentDashboardController.js';
import { studentQuizController } from './studentQuizController.js';
import { studentDocumentController } from './studentDocumentController.js';
import { studentResultController } from './studentResultController.js';

export const studentController = {
  ...studentDashboardController,
  ...studentQuizController,
  ...studentDocumentController,
  ...studentResultController
};
