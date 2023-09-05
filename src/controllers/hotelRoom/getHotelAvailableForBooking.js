const { Hotel, RoomType, HotelRoom } = require('../../models')

const getHotelAvailableForBooking = async (req, res) => {
  console.log(req.params)
  console.log(req.query)
  let checkInDate = new Date("2000-01-01"); // Fecha por defecto en el pasado.

  try {
    const search = req.params.search;
    // Verifica si checkInDate está definido y no es nulo ni una cadena vacía
    if (req.body.checkInDate) {
      checkInDate = new Date(req.query.checkInDate);
    }

    const availableHotels = await Hotel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { country: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } }
          ],
          isActive: true
        }
      },
      {
        $lookup: {
          from: "hotelrooms", // Colección de HotelRoom
          localField: "_id",
          foreignField: "Hotel_id",
          as: "hotelRooms"
        }
      },
      {
        $addFields: {
          roomTypeIds: "$hotelRooms.RoomType_id"
        }
      },
      {
        $lookup: {
          from: "roomtypes", // Colección RoomType
          localField: "roomTypeIds",
          foreignField: "_id",
          as: "roomTypes"
        }
      },
      {
        $lookup: {
          from: "deals",
          localField: "roomTypeIds",
          foreignField: "RoomType_id",
          as: "deals"
        }
      },
      {
        $addFields: {
          freeRooms: {
            $filter: {
              input: "$roomTypes",
              as: "roomType",
              cond: {
                $or: [
                  { $gt: ["$$roomType.freeRoom", 0] },
                  // {
                  //   $gt: [
                  //     {
                  //       $size: {
                  //         $filter: {
                  //           input: "$deals",
                  //           as: "deal",
                  //           cond: {
                  //             $expr: {
                  //               $lt: [
                  //                 { $subtract: [checkInDate, "$$deal.checkout"] },
                  //                 6 * 60 * 60 * 1000
                  //               ]
                  //             }
                  //           }
                  //         }
                  //       }
                  //     },
                  //     0
                  //   ]
                  // }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          country: 1,
          state: 1,
          address: 1,
          phone: 1,
          website: 1,
          email: 1,
          category: 1,
          rating: 1,
          image: 1,
          freeRooms: 1
          // freeRooms: {
          //   $map: {
          //     input: "$freeRooms",
          //     as: "roomType",
          //     in: {
          //       _id: "$$roomType._id",
          //       name: "$$roomType.name",
          //       free: "$$roomType.freeRooms",
          //       promisesOfRelease: checkInDate !== '' ? { $size: "$$roomType.promisesOfRelease" } : 0,
          //       totalFree: {
          //         $add: ["$$roomType.free", { $size: "$$roomType.promisesOfRelease" }]
          //       }
          //     }
          //   }
          // }
        }
      },
      {
        $match: {
          freeRooms: { $ne: [] }
        }
      }
    ])

    if (availableHotels.length > 0) {
      res.status(200).json(availableHotels)
    }
    else res.status(404).json({ message: 'There are no hotels available.' })
  } catch (error) {
    res.status(400).json({ error: error.message })

  };
}

module.exports = getHotelAvailableForBooking
