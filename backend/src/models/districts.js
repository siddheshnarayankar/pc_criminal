export default (Sequelize, DataTypes) => {
    const pc_districts = Sequelize.define(
        'pc_districts', {
            DistrictId: DataTypes.INTEGER,
            DistrictName: DataTypes.STRING,
            CityId:DataTypes.INTEGER
        }, {}
    );
    return pc_districts;
}