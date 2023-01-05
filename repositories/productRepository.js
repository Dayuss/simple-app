const {
    Product,
    Sequelize
} = require('../models');


const create = async(data, t) => {
    return Product.create(data, {
        transaction: t
    }).catch((error) => {
        throw new Error(error)
    })
}
const detail = async(whr) => {
	return Product.findOne({
		where : whr,
	});
}

const listAll = (whr = null) => {
    return Product.findAll({
        where: whr,
        order:[ 
            ['createdAt','ASC']
        ],
    })
}

const update = async(id, data, t) => {
    return Product.update(data, 
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


const destroy = async(id, t) => {
    return Product.destroy({
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


module.exports = {
    create,
    detail,
    update,
    listAll,
    destroy
}