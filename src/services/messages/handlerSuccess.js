const handlerMessages = require("./handlerMessages.js");

/**
 * handlerSuccess generates successful output messages to api requests
 * @param {*} msgKeys  type string object or string, owner message or keys ['create','found','empty', 'update', 'remove']
 * @param {*} nameModel Name of the model modifying
 * @param {*} res response function
 * @param {*} data data object
 * @returns
 */
const handlerSuccess = async (msgKeys, nameModel = '', res, data = null) => {
    try {
        const { status, message } = await handlerMessages(msgKeys, nameModel);

        if (data) {
            return res.status(status).json({ message: message, data: data });
        }
        return res.status(status).json({ message: message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = handlerSuccess;
