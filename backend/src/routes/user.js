import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/routesHelper';
import { create, login, findAllUsers, 
    findById, update, deleteUser, findAdminUsers
} from '../controllers/user';

module.exports = (app) => {
  // create a new user
  app.post(
    '/api/users/create',
    passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.admin, create)
  );

  // user login
  app.post('/api/users/login', login);

  //retrieve all users
  app.get(
    '/api/users/findAllUsers/:cityId/:role', 
    passport.authenticate('jwt', { 
      session: false 
    }),
    allowOnly(config.accessLevels.admin || config.accessLevels.superAdmin, findAllUsers)
  );
  // retrieve user by role
  app.get(
    '/api/users/findAdminUsers/:role', 
    passport.authenticate('jwt', { 
      session: false 
    }),
    allowOnly(config.accessLevels.superAdmin, findAdminUsers)
  );

  // retrieve user by id
  app.get(
    '/api/users/:userId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, findById)
  );

  // update a user with id
  app.put(
    '/api/users/:userId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.user, update)
  );

  // delete a user
  app.delete(
    '/api/users/:userId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, deleteUser)
  );

};
