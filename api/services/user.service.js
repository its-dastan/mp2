const Password = require('../../utils/password')
const { User } = require('../models')
const UserService = {
    async getUser(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                // Find the User
                const user = await User.findOne({ _id: userId })
                if (!user) reject({ error: 'User does not exists' })
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    },

    async updateUser(userId, userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findByIdAndUpdate({
                    _id: userId
                }, {
                    $set: userData
                }, {
                    new: true
                })
                if (!user) reject({ error: 'Couldn\'t update the user!' })
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    },

    async updatePassword(userId, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const encryptedPassword = await Password.encryptPassword(password)
                let userData = {
                    password: encryptedPassword.password
                }
                const user = await User.findByIdAndUpdate({
                    _id: userId
                }, {
                    $set: userData
                }, {
                    new: true
                })
                if (!user) reject({ error: 'Couldn\'t update the user!' })
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })

    }

}

module.exports = UserService