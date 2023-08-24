const schedule = require('node-schedule');
const { Schema, model } = require("mongoose");

const dealSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Hotel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    RoomType_id: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },
    status: {
        type: String,
        enum: ["booking", "purchase", "cancelled", "active", "finished"],
        required: true
    },
    checkIn: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                if (this.checkOut != null)
                    return value < this.checkOut;
            },
            message: 'end_Rent must be after checkout.',
        },
    },
    checkOut: {
        type: Date,
        required: false,
        validate: {
            validator: function (value) {
                return value > this.checkIn;
            },
            message: 'end_Rent must be after checkout.',
        },
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


schedule.scheduleJob('0 0 * * *', async () => {
    const currentDate = new Date();
    // Obtener los documentos que necesitan actualización
    const dealsToUpdate = await Deal.find({
        status: { $ne: 'cancelled' },
        checkOut: { $gt: currentDate },
        checkIn: { $lte: currentDate }
    });

    // Actualiza el campo "deal" en los todos los documentos
    for (const deal of dealsToUpdate) {
        deal.status = 'active';
        await deal.save();
    }
});

const Deal = model("Deal", dealSchema);
module.exports = Deal; 