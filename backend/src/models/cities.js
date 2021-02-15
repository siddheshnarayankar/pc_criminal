export default (Sequelize, DataTypes) => {
    const pc_cities = Sequelize.define(
        'pc_cities', {
            StateId: DataTypes.INTEGER,
            City:DataTypes.STRING
        }, {}
    );
    return pc_cities;
}