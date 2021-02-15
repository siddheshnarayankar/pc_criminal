import jwt from 'jsonwebtoken';
import passport from 'passport';
import _ from "lodash";
import db from '../models';

const PC_KKInformation = db.PC_KKInformation;
const PC_OtherInformation = db.PC_OtherInformation;
const PC_BasicInformation = db.PC_BasicInformation;
const PC_GunhaInformation = db.PC_GunhaInformation;

const createCriminalInformation = async (req, res) => {
    let isSuccess = false;
    const currentUser = req.body.currentuser;

    const basicInformationNewObj = {
        ...req.body.basicInformation,
        userId: currentUser.id
    }

    const baseInfoRes = await PC_BasicInformation.create(basicInformationNewObj);
    const masterId = JSON.parse(JSON.stringify(baseInfoRes)).id;
    isSuccess = masterId ? true : false;
    // console.log('--------------------------',masterId)
    // console.log('--------------------------',JSON.parse(masterId).id)
    // console.log(JSON.stringify(baseInfoRes))

    const otherInformationNewObj = {
        ...req.body.otherInformation,
        masterId: masterId,
        userId: currentUser.id
    }
    const otherInfoRes = await PC_OtherInformation.create(otherInformationNewObj);

    isSuccess = JSON.parse(JSON.stringify(otherInfoRes)).id ? true : false;

    req.body.gunhaInformation && req.body.gunhaInformation.map(async (item, index) => {
        console.log(item);
        let gunhaInformationNewObj = {
            ...item,
            masterId: masterId,
            userId: currentUser.id
        }
        let gunhaRes = await PC_GunhaInformation.create(gunhaInformationNewObj);
        isSuccess = JSON.parse(JSON.stringify(gunhaRes)).id ? true : false;
        item.kalamAndkayda.map((item2) => {
            let ob = {
                ...item2,
                masterId: masterId,
                gunhaId: JSON.parse(JSON.stringify(gunhaRes)).id,
                userId: currentUser.id
            }
            //   console.log(ob);
            let kkRes = PC_KKInformation.create(ob);
            isSuccess = JSON.parse(JSON.stringify(kkRes)).id ? true : false;
            //    console.log(resKK);
        })
    })

    const gunhaInfor = {
        ...req.body.gunhaInformation[0],
        masterId: masterId,
        userId: currentUser.id,
    }

    if (isSuccess) {
        res.json({
            status: 200,
            message: 'success',
            basicInfo: [JSON.parse(JSON.stringify(baseInfoRes))],
            otherInfo: [JSON.parse(JSON.stringify(otherInfoRes))],
            gunhaInfor: [JSON.parse(JSON.stringify(gunhaInfor))]
        });
    } else {
        res.json({
            status: 300,
            message: 'failed'
        });
    }

    // PC_ProfessionalsBasic.create(req.body)
    //     .then((professional) => {
    //         res.json({
    //             professional
    //         })
    //     })
    //     .catch((error) => {
    //         res.json({});
    //     })




}

let newData = []
const getMyData = (data) => {
    data.map((res) => {
        newData.push(res);
    })
}

const getCriminalsById = async (req, res) => {
    const id = req.params.id;


    let basicInfo = await PC_BasicInformation.findAll({
        where: {
            userId: id
        }
    });

    let gunhaInfor = await PC_GunhaInformation.findAll({
        where: {
            userId: id
        }
    });


    let otherInfo = await PC_OtherInformation.findAll({
        where: {
            userId: id
        }
    });


    // console.log(JSON.parse(JSON.stringify(gunhaInfor)));

    let gunhaInformationoOb1 = [];

    let ob = JSON.parse(JSON.stringify(gunhaInfor)) && JSON.parse(JSON.stringify(gunhaInfor)).map(async (item) => {
        let kkInfo = await PC_KKInformation.findAll({
            where: {
                gunhaId: item.id,
                // masterId:JSON.parse(JSON.stringify(basicInfo)).id,
                // gunhaId:JSON.parse(JSON.stringify(gunhaInfor)).id
            }
        });

        // console.log(kkInfo)

        return {
            ...item,
            kalamAndkayda: JSON.parse(JSON.stringify(kkInfo))
        };
    })

    // let self = this;
    let data = {}
    let isDone = Promise.all(ob);
    await isDone.then((res) => {
        data = {
            basicInfo: [...basicInfo],
            otherInfo: [...otherInfo],
            gunhaInfor: [...res]
        }

    })

    res.json(
        data

    );
}


const updateCriminal = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.body.currentuser;

    let basicInfo = await PC_BasicInformation.update(req.body.basicInformation, {
        where: {
            id
        }
    })

    // let otherInfo = await PC_GunhaInformation.update(req.body.gunhaInformation, {
    //     where: {
    //         masterId: id
    //     }
    // })


    //   JSON.parse(JSON.stringify(gunhaInfor)) && JSON.parse(JSON.stringify(gunhaInfor)).forEach(element => {



    //   });

    let getOtherInfor = await PC_OtherInformation.findAll({
        where: {
            userId: currentUser.id,
            masterId: id,
        }
    });

    if(!JSON.parse(JSON.stringify(getOtherInfor)).length){
        const otherInformationNewObj = {
            ...req.body.otherInformation,
            masterId: id,
            userId: currentUser.id
        }
         await PC_OtherInformation.create(otherInformationNewObj)
    }else{
          await PC_OtherInformation.update(req.body.otherInformation, {
            where: {
                masterId: id,
                userId: currentUser.id,
            }
        })
    }
    let getGunhaInfor = await PC_GunhaInformation.findAll({
        where: {
            userId: currentUser.id,
            masterId: id,
        }
    });
    
  
    if(JSON.parse(JSON.stringify(getGunhaInfor)).length){
         await PC_GunhaInformation.destroy({
            where: {
                masterId: id,
                userId: currentUser.id
            }
        })
    }
  

    req.body.gunhaInformation && req.body.gunhaInformation.map(async (item, index) => {
        let gunhaInformationNewObj = {
            ...item,
            masterId: id,
            userId: currentUser.id
        }
      
        let gunhaRes = await PC_GunhaInformation.create(gunhaInformationNewObj);
        // isSuccess = JSON.parse(JSON.stringify(gunhaRes)).id ? true : false;
        // item.kalamAndkayda.map((item2) => {
        //     let ob = {
        //         ...item2,
        //         masterId: masterId,
        //         gunhaId: JSON.parse(JSON.stringify(gunhaRes)).id,
        //         userId: currentUser.id
        //     }
        //     //   console.log(ob);
        //     let kkRes = PC_KKInformation.create(ob);
        //     isSuccess = JSON.parse(JSON.stringify(kkRes)).id ? true : false;
        //     //    console.log(resKK);
        // })
    })
    // let newGunha = {
    //     ...req.body.gunhaInformation,
    //     masterId: id,
    //     userId: currentUser.id
    // }

    // let gunhaInfor = await PC_GunhaInformation.create(newGunha)


    // JSON.parse(JSON.stringify(gunhaInfor)) && JSON.parse(JSON.stringify(gunhaInfor)).forEach(async element => {
       
    //     let kkInfor = await PC_KKInformation.findAll({
    //         where: {
    //             gunhaId: element.id,
    //             masterId: id
    //         }
    //     });

    //     if (JSON.parse(JSON.stringify(kkInfor)).length > element.kalamAndkayda.length) {
    //         console.log('Create');

    //     }else if(JSON.parse(JSON.stringify(kkInfor)).length < element.kalamAndkayda.length){
    //         console.log('Delete');
    //     }
    //     //   element.kalamAndkayda



    // });



   

    let data = {
        basicInfo: [req.body.basicInformation],
        otherInfo: [req.body.otherInformation],
        gunhaInfor: [...req.body.gunhaInformation]
    }

    res.json(
        data
    );

};





export {
    createCriminalInformation,
    getCriminalsById,
    updateCriminal
};