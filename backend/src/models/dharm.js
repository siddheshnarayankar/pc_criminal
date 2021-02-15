export default (Sequelize, DataTypes) => {

    const pc_dharms = Sequelize.define(
        'pc_dharms', {
            DharmName: DataTypes.STRING
        }, {}
    );
     

    return pc_dharms
    
}
 