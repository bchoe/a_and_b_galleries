module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
   // title: DataTypes.STRING,
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.User,{
          foreignKey: "userId"
        })
      }
    }
  });

  return Photo;
};