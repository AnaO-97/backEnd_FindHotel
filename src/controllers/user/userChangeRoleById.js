const { User } = require('../../models')

const userChangeRoleById = (req, res) => {
    const { userId, userAdminId } = req.params
    try {
        const userAdmin = User.findOne({ _id: userAdminId, role: 'admin' })
        const userCustom = User.findOne({ _id: userId, role: 'user', status: 'active' })

        if (userCustom && userAdmin) {
            userCustom.role = 'hotel'
            userCustom.save()
            res.status(200).json({ message: 'User updated successfully' })
        }
        else if (!userAdmin) {
            res.status(404).json({ error: 'Administrator user not found' })
        }
        else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = userChangeRoleById