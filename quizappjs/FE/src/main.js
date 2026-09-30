import Router from './core/router.js';
import { initDarkMode } from './appShell.js';
import { registerPublicRoutes } from './routes/publicRoutes.js';
import { registerAdminRoutes } from './routes/adminRoutes.js';
import { registerStudentRoutes } from './routes/studentRoutes.js';

const router = new Router('#app');
initDarkMode();
registerPublicRoutes(router);
registerAdminRoutes(router);
registerStudentRoutes(router);
router.start();
