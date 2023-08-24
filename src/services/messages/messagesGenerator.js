const messagesJSON = require('./messages.json');

const messagesGenerator = async (keys, nameModel, type) => {
    const messageType = messagesJSON[type];
    let message = '';

    if (typeof keys === 'string') {
        const isMsgType = messageType.hasOwnProperty(keys);
        if (isMsgType) {
            if (nameModel !== null && nameModel !== '') {
                message = `${nameModel.trim().toLowerCase().replace(/^./, (match) => match.toUpperCase())} `;
            }
            message == '' ?
                message = `${messageType[keys].msg.replace(/^./, (match) => match.toUpperCase())}` :
                message = message + `${messageType[keys].msg}`;
            message = type == 'success' ? `${message} succesfully.` : `${message}.`;
            return {
                status: messageType[keys].status,
                message: message
            };
        } else {
            if (type == 'success') {
                return { status: 200, message: keys.replace(/^./, (match) => match.toUpperCase()) };
            }
            if (type == 'error') {
                return { status: 400, message: keys.replace(/^./, (match) => match.toUpperCase()) };
            }
        }
    } else {
        let gtMessages = false; // Mayor a 1 mensaje

        if (keys.length === 0) {
            throw new Error('You have not provided keys');
        }

        const isKeys = keys.filter((key) =>
            messageType.hasOwnProperty(key.trim().toLowerCase())
        );

        if (isKeys.length === 0) {
            throw new Error('No matches found for entered keys');
        } else if (isKeys.length > 1) {
            gtMessages = true;
        }

        if (nameModel !== null && nameModel !== '') {
            const model = nameModel.trim().toLowerCase().replace(/^./, (match) => match.toUpperCase());
            message = `${model} `;
        }

        let key = '';
        while (isKeys.length > 0) {
            key = isKeys.shift().trim().toLowerCase();
            if (message !== null && message !== '') {
                message += `${messageType[key].msg}`;
            } else {
                message += `${messageType[key].msg.replace(/^./, (match) => match.toUpperCase())}`;
            }

            if (isKeys.length !== 0) {
                message += ', ';
            } else {
                message += ' succesfully.';
            }
        }

        if (gtMessages) {
            return { status: 207, message: message };
        } else {
            return { status: messageType[key].status, message: message };
        }
    }
};

module.exports = messagesGenerator;

