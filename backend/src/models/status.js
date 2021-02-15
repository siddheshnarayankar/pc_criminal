export default (Sequelize, DataTypes) => {

    const pc_status = Sequelize.define(
        'pc_status', {
            name: DataTypes.STRING
        }, {}
    );
 
    return pc_status
    
}

