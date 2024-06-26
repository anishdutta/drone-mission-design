import express, { Router } from 'express';
import authRoute from './auth.routes';
import userRoute from './user.routes';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute
  }
];


defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;