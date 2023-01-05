const {
    UserDetail,
    Sequelize
} = require('../models');


const create = async(data, t) => {
    return UserDetail.create(data, {
        transaction: t
    }).catch((error) => {
        throw new Error(error)
    })
}
const detail = async(whr) => {
	return UserDetail.findOne({
		where : whr,
	});
}

const listAll = (whr = null) => {
    return UserDetail.findAll({
        where: whr,
        order:[ 
            ['createdAt','ASC']
        ],
    })
}

const update = async(id, data, t) => {
    return UserDetail.update(data, 
    {
        where: {userId:id},
        transaction: t,
        returning: true,
        plain: true
    })
    .catch((error) => { throw new Error(error) })
    .then(data => {
        return data[1] 
    })
}


const destroy = async(id, t) => {
    return UserDetail.destroy({
        where: {userId:id},
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