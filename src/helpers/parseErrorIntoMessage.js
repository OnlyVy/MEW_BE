const parseErrorIntoMessage = (error) => {
    return {
        message: error?.message || 'Lỗi không xác định',
    };
};

export default parseErrorIntoMessage;