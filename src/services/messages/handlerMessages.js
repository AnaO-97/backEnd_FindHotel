const messagesGenerator = require("./messagesGenerator.js");

const handlerMessages = async (msgKeys, nameModel, type = 'success') => {
    switch (typeof msgKeys) {
        case 'string':
            return await messagesGenerator(msgKeys.trim().toLowerCase(), nameModel, type);
        case 'object':
            if (Array.isArray(msgKeys) && msgKeys.length !== 0) {
                return await messagesGenerator(msgKeys, nameModel, type);
            } else {
                if (typeof msgKeys === 'object' && msgKeys !== null) {
                    const keys = Object.values(msgKeys);
                    return await messagesGenerator(keys, nameModel, type);
                } else {
                    throw new Error('Invalid input, msgKeys args must contain a string or strings object');
                }
            }
            break;
        default:
            throw new Error('Invalid input, msgKeys args must contain a string or strings object');
    }
};

module.exports = handlerMessages;
