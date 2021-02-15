

export default (Sequelize,DataTypes) =>{
    const PC_OtherInformation = Sequelize.define(
        'PC_OtherInformation',
        {
            isMemberOfGang: DataTypes.STRING,
            accusedBusiness: DataTypes.STRING,
            accusedFamilyMember: DataTypes.STRING,
            accusedAssets:DataTypes.STRING,
            accusedResidence: DataTypes.STRING,
            accusedJurisdiction: DataTypes.STRING,
            accusedCourtCaseNo:DataTypes.STRING,
            accusedCourtDate: DataTypes.STRING,
            accusedjailStatus:DataTypes.STRING,
            accusedVehicalDetails:DataTypes.STRING,
            accusedLawyerDetails:DataTypes.STRING,
            accusedIdentifyingOfficer:DataTypes.STRING,
            accusedSupportingleaders:DataTypes.STRING,
            accusedSupportingleaders:DataTypes.STRING,
            masterId:DataTypes.INTEGER,
            userId:DataTypes.INTEGER
        },
        {}
    );

    return PC_OtherInformation;
}