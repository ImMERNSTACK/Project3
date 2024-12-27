const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
       },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, 
{
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ userId: this.userId, username: this.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};
sequelize.sync()
    .then(() => {
        console.log('User table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => console.log('This error occurred', error));

module.exports = User;