import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/routesHelper';

import { getMaster,getCity,getDistricts,getDharm,getKayda,getKalam, getCrimeType, getCrimeTitle, getStatus, getKalamById } from '../controllers/getMaster';

module.exports = (app) => {
    app.get(
        '/api/professional/getmaster', 
         getMaster
      );
      app.get(
        '/api/professional/city', 
        getCity
      );
      app.get(
        '/api/professional/districts/:cityId', 
        getDistricts
      );
      app.get(
        '/api/professional/dharm', 
        getDharm
      );
      // app.get(
      //   '/api/professional/kayda/:limit/:offset', 
      //   getKayda
      // );
       app.get(
        '/api/professional/kayda', 
        getKayda
      );
      app.get(
        '/api/professional/kalam', 
        getKalam
      );
      app.get(
        '/api/professional/kalam/:actId', 
        getKalamById
      );


      app.get(
        '/api/professional/crimetypes', 
        getCrimeType
      );
      app.get(
        '/api/professional/crimetitles', 
        getCrimeTitle
      );
      app.get(
        '/api/professional/status', 
        getStatus
      );
}