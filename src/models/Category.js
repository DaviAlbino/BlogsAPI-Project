const Category = (sequelize, DataTypes) => {
    const CategoryModel = sequelize.define('Category', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
        },
        name: DataTypes.STRING
    },
    {
        tableName: 'categories',
        timestamps: false,
        underscored: true
    })
    
    return CategoryModel;
};

module.exports = Category;