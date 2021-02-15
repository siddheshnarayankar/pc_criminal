export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
      policestation: DataTypes.STRING,
      password: DataTypes.STRING,
      userid:DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      stateId: DataTypes.INTEGER,
      districtId: DataTypes.INTEGER,
      policeStationId: DataTypes.INTEGER,
    },
    {}
  );

  User.associate = function(models) {
    // associations go here
  };

  return User;
};
