import jwt from 'jsonwebtoken';
import passport from 'passport';

import db from '../models';
const pc_countrystates = db.pc_countrystates;
const pc_cities = db.pc_cities;
const pc_districts = db.pc_districts;
const pc_dharms = db.pc_dharms;
const pc_kalams = db.pc_kalams;
const pc_acts = db.pc_acts;
const pc_crimetypes = db.pc_crimetypes;
const pc_crimetitles = db.pc_crimetitles;
const pc_status = db.pc_status;

const getMaster = (req, res) => {
  const id = '121';
  pc_countrystates.findAll({
      where: {
        id
      }
    })
    .then(pc_countrystates => {
      res.json({
        pc_countrystates
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};
const getCity = (req, res) => {
  pc_cities.findAll()
    .then(pc_cities => {
      res.json({
        pc_cities
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};
const getDistricts = (req, res) => {
  console.log(req.params)
  const CityId = req.params.cityId;
  pc_districts.findAll({
      where: {
        CityId
      }
    })
    .then(pc_districts => {
      res.json({
        pc_districts
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

const getDharm = (req, res) => {
  pc_dharms.findAll()
    .then(pc_dharms => {
      res.json({
        pc_dharms
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

const getKalam = (req, res) => {
  pc_kalams.findAll()
    .then(pc_kalams => {
      res.json({
        pc_kalams
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

const getKayda = (req, res) => {
  // const limit = req.params.limit;
  // const offset = req.params.offset;

  // let paramQuerySQL = {
  //   offset:parseInt(offset),
  //   limit:parseInt(limit)
  // }

  // console.log(paramQuerySQL,req.params)
  // pc_acts.findAndCountAll(paramQuerySQL).then(apis => res.json({
  //   error: false,
  //   count: apis.count,
  //   data: apis.rows,
  // })).catch(err => res.status(500).json({
  //   err
  // }));


  pc_acts.findAll()
    .then(pc_acts => {
      res.json({
        pc_acts
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};


const getKalamById = (req,res) =>{
const id = req.params.actId;
  pc_kalams.findAll({
    where: {
      act_cd: id
    }
  })
  .then(pc_kalams => {
    res.json({
      pc_kalams
    });
  })
  .catch(err => res.status(500).json({
    err
  }));
} 


const getCrimeType = (req, res) => {
  pc_crimetypes.findAll()
    .then(pc_crimetypes => {
      res.json({
        pc_crimetypes
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

const getCrimeTitle = (req, res) => {
  pc_crimetitles.findAll()
    .then(pc_crimetitles => {
      res.json({
        pc_crimetitles
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

const getStatus = (req, res) => {
  pc_status.findAll()
    .then(pc_status => {
      res.json({
        pc_status
      });
    })
    .catch(err => res.status(500).json({
      err
    }));
};

export {
  getMaster,
  getCity,
  getDistricts,
  getDharm,
  getKalam,
  getKayda,
  getCrimeType,
  getCrimeTitle,
  getStatus,
  getKalamById
}