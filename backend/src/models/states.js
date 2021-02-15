export default (Sequelize, DataTypes) => {

    const pc_countrystates = Sequelize.define(
        'pc_countrystates', {
            state: DataTypes.STRING,
            countryId: DataTypes.INTEGER
        }, {}
    );
 
    return pc_countrystates
    
}

