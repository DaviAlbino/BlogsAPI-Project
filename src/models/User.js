const User = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        underscored: true,
        timestamps: false,
        tableName: 'users',
    });

    UserModel.associate = ({ BlogPost }) => {
        UserModel.hasMany(BlogPost, {
            as: 'blogPosts',
            foreignKey: 'userId'
        });
    }

    return UserModel;
}

module.exports = User;