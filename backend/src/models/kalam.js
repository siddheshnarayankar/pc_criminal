export default (Sequelize, DataTypes) => {
    const pc_kalams = Sequelize.define(
        'pc_kalams', {
            act_cd: DataTypes.INTEGER,
            section_desc:DataTypes.STRING,
            section:DataTypes.STRING,
        }, {}
    );
    return pc_kalams;
}