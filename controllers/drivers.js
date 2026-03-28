const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllDrivers = async (req, res) => {
        //#swagger.tags = ['Drivers']
    try {
    const result = await mongoDb.getDatabase().db().collection('drivers').find().toArray();
    res.setHeader('Content-Type', 'application/json');

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No drivers found' });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching drivers' });
    }

};

const getDriverById = async (req, res) => {
        //#swagger.tags = ['Drivers']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid driver ID' });
        }

        const driverId = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection('drivers').findOne({ _id: driverId });

        if (!result) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching driver' });
    }
};
const createDriver = async (req, res) => {
    //#swagger.tags = ['Drivers']
    try {
        if (!req.body || !req.body.name || !req.body.driversLicenseNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newDriver = {
            name: req.body.name,
            driversLicenseNumber: req.body.driversLicenseNumber,
            driversLicenseExpirationDate: req.body.driversLicenseExpirationDate,
            status: req.body.status,
        };

        const response = await mongoDb.getDatabase().db().collection('drivers').insertOne(newDriver);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Driver created', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating driver' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while creating driver' });
    }
};

const updateDriver = async (req, res) => {
    //#swagger.tags= ['Drivers']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid driver ID' });
        }

        const driverId = new ObjectId(req.params.id);

        const updatedDriver = {
            name: req.body.name,
            driversLicenseNumber: req.body.driversLicenseNumber,
            driversLicenseExpirationDate: req.body.driversLicenseExpirationDate,
            status: req.body.status,
        };

        const response = await mongoDb.getDatabase().db().collection('drivers')
            .updateOne({ _id: driverId }, { $set: updatedDriver });

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Error updating driver' });
        }


    } catch (error) {
        res.status(500).json({ message: 'Error occurred while updating driver' });
    }
};

const deleteDriver = async (req, res) => {
    //#swagger.tags= ['Drivers']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid driver ID' });
        }

        const driverId = new ObjectId(req.params.id);

        const response = await mongoDb.getDatabase().db().collection('drivers').deleteOne({ _id: driverId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while deleting driver' });
    }
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};