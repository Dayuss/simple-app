const {
    User,
    UserDetail,
    Product,
    Sequelize
} = require('../models');


const create = async(data, t) => {
    return User.create(data,{transaction: t}).catch((error) => { throw new Error(error) })
}

const detail = async(whr) => {
	return User.findOne({
		where : whr,
	});
}

const listAll = (whr = null) => {
    return User.findAndCountAll({
        where: whr,
        attributes:[
            "id",
            "email",
            "phoneNumber",
            "createdAt",
            "updatedAt",
        ],
        include:[{
            model: UserDetail,
            as: 'detail'
        }, {
            model: Product,
            as: 'product'
        }],
        order:[ 
            ['createdAt','ASC']
        ],
    })
}

const update = async(id, data, t) => {
    return User.update(data, 
    {
        where: {id},
        transaction: t,
        returning: true,
        plain: true
    })
    .catch((error) => { throw new Error(error) })
    .then(data => {
        return data[1] 
    })
}


const destroy = async(whr, t) => {
    return User.destroy({
        where: whr,
        transaction: t,
        returning: true,
        plain: true
    })
    .catch((error) => { throw new Error(error) })
    .then(data => {
        return data[1] 
    })
}


module.exports = {
    create,
    detail,
    update,
    listAll,
    destroy
}