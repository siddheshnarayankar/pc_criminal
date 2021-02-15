import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/routesHelper';

import { crateProfessional } from '../controllers/professional';

module.exports = (app) => {
    app.post('/api/users/createprofessional',
      crateProfessional)
}