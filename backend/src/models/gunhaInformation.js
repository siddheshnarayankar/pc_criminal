

export default (Sequelize,DataTypes) =>{
    const PC_GunhaInformation = Sequelize.define(
        'PC_GunhaInformation',
        {
          state: DataTypes.INTEGER,
          city: DataTypes.INTEGER,
          district: DataTypes.INTEGER,
          registernumber:DataTypes.STRING,
          dateTime: DataTypes.STRING,
          heading: DataTypes.INTEGER,
          status:DataTypes.INTEGER,
          masterId:DataTypes.INTEGER,
          userId:DataTypes.INTEGER,
          districtName:DataTypes.STRING
        },
        {}
    );

    return PC_GunhaInformation;
}