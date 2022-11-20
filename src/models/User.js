const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        // underscored: true,
        timestamps: false,
        tableName: 'users',
    });

    User.associate = (models) => {
        User.hasMany(models.BlogPost, {
            foreignKey: 'user_id', as: 'posts'
        });
    }

    return User;
}

module.exports = { UserModel };