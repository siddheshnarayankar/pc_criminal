import jwt from 'jsonwebtoken';
import passport from 'passport';

import db from '../models';
const PC_ProfessionalsBasic = db.PC_ProfessionalsBasic;
const PC_Gunha = db.PC_Gunha;
const PC_OtherInformation = db.PC_OtherInformation;


const crateProfessional = (req,res) =>{
    PC_ProfessionalsBasic.create(req.body)
    .then((professional)=>{
        res.json({professional})
    })
    .catch((error)=>{
        res.json({ });
    })
}

export {crateProfessional};