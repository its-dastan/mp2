const bcrypt = require('bcrypt')

const Password = {
    async encryptPassword(password) {
        bcrypt.hash(password, 10, (error, hashPassword) => {
            if (error) {
                return {
                    message: 'Error encrypting password',
                    error,
                    password
                }
            } else {
                return {
                    message: 'Password Encrypted',
                    password: hashPassword
                }
            }
        })
    },

    async decryptPassword(plainPassword, hash) {
        bcrypt.compare(plainPassword, hash, (hashError, password) => {
            if (hashError) {
                return {
                    message: 'password decryption error',
                    error: hashError,
                    password
                }
            } else {
                return {
                    message: 'Password decrypted',
                    password
                }
            }
        })
    }
}

module.exports = Password