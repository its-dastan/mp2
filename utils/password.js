const bcrypt = require('bcrypt')

const Password = {
    async encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (error, hashPassword) => {
                if (error) {
                    reject({
                        message: 'Error encrypting password',
                        error,
                        password
                    })
                } else {
                    resolve({
                        message: 'Password Encrypted',
                        password: hashPassword
                    })
                }
            })
        })
    },

    async decryptPassword(plainPassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hash, (hashError, password) => {
                if (hashError) {
                    reject({
                        message: 'password decryption error',
                        error: hashError,
                        password
                    })
                } else {
                    resolve({
                        message: 'Password decrypted',
                        password
                    })
                }
            })
        })
    }
}

module.exports = Password