

export default (Sequelize,DataTypes) =>{
    const PC_KKInformation = Sequelize.define(
        'PC_KKInformation',
        {
          rules: DataTypes.INTEGER,
          kalam: DataTypes.INTEGER,
          masterId:DataTypes.INTEGER,
          gunhaId:DataTypes.INTEGER,
          userId:DataTypes.INTEGER
        },
        {}
    );

    return PC_KKInformation;
}