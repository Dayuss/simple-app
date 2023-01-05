const response = ({data, page, limit, code, msg}) => {
    return {
        data: data?.rows || [],
        message: msg || '',
        code,
        metadata: page ===undefined? {} : {
            page: +page || 1,
            limit: +limit || 0,
            total: data?.count || 0,
            totalPages: Math.ceil((data?.count || 0) / limit) || 0,
        }
    };
};

module.exports = response