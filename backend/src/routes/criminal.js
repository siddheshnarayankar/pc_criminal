import passport from 'passport';
import config from '../config/config';
import {
    createCriminalInformation,
    getCriminalsById,
    updateCriminal
} from '../controllers/criminalInformation';
import {
    allowOnly
} from '../services/routesHelper';

module.exports = (app) => {
    app.post('/api/criminal/create',
        createCriminalInformation);

    app.get('/api/criminal/getcriminalbyid/:id',
        getCriminalsById);
    app.put('/api/criminal/update/:id',
        updateCriminal);



}