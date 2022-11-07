const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    healthScore:{ 
      type: DataTypes.INTEGER,
      allowNull: false

    },
    steps:{
      type: DataTypes.STRING,
      allowNull: false
     

    },
    resume:{
      type: DataTypes.STRING,
      allowNull: false

    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING
    },
    create:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
