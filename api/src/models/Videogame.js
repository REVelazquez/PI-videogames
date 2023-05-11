const { DataTypes, FLOAT } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description:{
      type:DataTypes.TEXT,
      allowNull:false      
    },
    Platforms:{
      type: DataTypes.STRING,
      allowNull:false
    },
    Image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    'Released Date':{
      type:DataTypes.DATE,
      allowNull:false
    },
    Rating:{
      type: DataTypes.FLOAT,
      allowNull:false
    }
  },
  {
    timestamps: false
  });
};
