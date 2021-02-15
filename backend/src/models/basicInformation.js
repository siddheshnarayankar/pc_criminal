

export default (Sequelize,DataTypes) =>{
    const PC_BasicInformation = Sequelize.define(
        'PC_BasicInformation',
        {
          heading:DataTypes.INTEGER,
          name: DataTypes.STRING,
          age: DataTypes.STRING,
          address: DataTypes.STRING,
          mobileNumber:DataTypes.STRING,
          state: DataTypes.INTEGER,
          city: DataTypes.INTEGER,
          district:DataTypes.INTEGER,
          aadharno: DataTypes.STRING,
          religion:DataTypes.INTEGER,
          cast:DataTypes.STRING,
          userId:DataTypes.INTEGER
        },
        {}
    );

    return PC_BasicInformation;
}