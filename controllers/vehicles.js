const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllVehicles = async (req, res) => {
        //#swagger.tags = ['Vehicles']
    try {
    const result = await mongoDb.getDatabase().db().collection('vehicles').find().toArray();
    res.setHeader('Content-Type', 'application/json');

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No vehicles found' });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching vehicles' });
    }

};

const getVehicleById = async (req, res) => {
    //#swagger.tags = ['Vehicles']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        }

        const vehicleId = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection('vehicles').findOne({ _id: vehicleId });

        if (!result) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching vehicle' });
    }
};

const createVehicles = async (req, res) => {
    //#swagger.tags = ['Vehicles']
     try {
        if (!req.body || !req.body.plate || !req.body.model) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newVehicle = {
            plate: req.body.plate,
            model: req.body.model,
            year: req.body.year,
            status: req.body.status,
            fuelType: req.body.fuelType,
            currentMileage: req.body.currentMileage,
            lastMaintenanceDate: req.body.lastMaintenanceDate,
            deliveries: req.body.deliveries,
            createdAt: req.body.createdAt
        };

        const response = await mongoDb.getDatabase().db().collection('vehicles').insertOne(newVehicle);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Vehicle created', id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating vehicle' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while creating vehicle' });
    }
};

const updateVehicle = async (req, res) => {
    //#swagger.tags= ['Vehicles']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        }

        const vehicleId = new ObjectId(req.params.id);

        const updatedVehicle = {
            plate: req.body.plate,
            model: req.body.model,
            year: req.body.year,
            status: req.body.status,
            fuelType: req.body.fuelType,
            currentMileage: req.body.currentMileage,
            lastMaintenanceDate: req.body.lastMaintenanceDate,
            deliveries: req.body.deliveries,
            createdAt: req.body.createdAt
        };

        const response = await mongoDb.getDatabase().db().collection('vehicles')
            .updateOne({ _id: vehicleId }, { $set: updatedVehicle });

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Error updating vehicle' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while updating vehicle' });
    }
};

const deleteVehicle = async (req, res) => {
    //#swagger.tags= ['Vehicles']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        }

        const vehicleId = new ObjectId(req.params.id);

        const response = await mongoDb.getDatabase().db().collection('vehicles')
            .deleteOne({ _id: vehicleId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while deleting vehicle' });
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicles,
    updateVehicle,
    deleteVehicle
};