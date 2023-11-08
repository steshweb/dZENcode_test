const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, { logging: false, dialectOptions: {
  ssl: true,
}, });

const Comment = sequelize.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  home_page: {
    type: DataTypes.STRING,
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE ,
    field: 'created_at'
  }
  
}, {
  timestamps: false,
  tableName: 'comments',
});

module.exports = Comment;

