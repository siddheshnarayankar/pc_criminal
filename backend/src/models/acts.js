export default (Sequelize, DataTypes) => {
    const pc_acts = Sequelize.define(
        'pc_acts', {
            act_cd: DataTypes.INTEGER,
            kayda:DataTypes.STRING
        }, {}
    );
    return pc_acts;
}