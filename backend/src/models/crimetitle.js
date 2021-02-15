export default (Sequelize, DataTypes) => {
    const pc_crimetitles = Sequelize.define(
        'pc_crimetitles', {
            crime_title: DataTypes.STRING,
            gunhe_type:DataTypes.STRING
        }, {}
    );
    return pc_crimetitles;
}