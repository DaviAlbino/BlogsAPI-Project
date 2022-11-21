const BlogPost = (sequelize, DataTypes) => {
    const BlogPostModel = sequelize.define('BlogPost', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: DataTypes.DATE,
        updated: DataTypes.DATE
    },
    {
        tableName: 'blog_posts',
        underscored: true,
        createdAt: 'published',
        updatedAt: 'updated'
    });

    BlogPostModel.associate = ({ User }) => {
        BlogPostModel.belongsTo(User, {
            as: 'user',
            foreignKey: 'userId'
        })
    }

    return BlogPostModel;
}

module.exports = BlogPost;

