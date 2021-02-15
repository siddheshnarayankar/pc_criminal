export default (Sequelize, DataTypes) => {
    const pc_crimetypes = Sequelize.define(
        'pc_crimetypes', {
            title_id: DataTypes.INTEGER,
            crimetype:DataTypes.STRING
        }, {}
    );
    return pc_crimetypes;
}