const PostCategory = (sequelize, DataTypes) => {
    const PostCategoryModel = sequelize.define('PostCategory', {
        postId: { type: DataTypes.INTEGER, primaryKey: true },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true }
    },
    {
        tableName: 'posts_categories',
        timestamps: false,
        underscored: true 
    });

    PostCategoryModel.associate = ({ BlogPost, Category }) => {
        BlogPost.belongsToMany(Category, {
            as: 'categories',
            foreignKey: 'postId',
            otherKey: 'categoryId',
            through: PostCategoryModel 
        });
        Category.belongsToMany(BlogPost, {
            as: 'blogPosts',
            foreignKey: 'categoryId',
            otherKey: 'postId',
            through: PostCategoryModel
        });
    };

    return PostCategoryModel;
};

module.exports = PostCategory;