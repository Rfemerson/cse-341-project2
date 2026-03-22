const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllVehicles = async (req, res) => {
        //#swagger.tags = ['Vehicles']
    const result = await mongoDb.getDatabase().db().collection('vehicles').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const getVehicleById = async (req, res) => {
        //#swagger.tags = ['Vehicles']
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection('vehicles').findOne({_id: vehicleId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createVehicles = async (req, res) => {
    //#swagger.tags = ['Vehicles']
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
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the vehicle.');
    }
};

const updateVehicle = async (req, res) => {
    //#swagger.tags= ['Vehicles']
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
    const response = await mongoDb.getDatabase().db().collection('vehicles').updateOne({_id: vehicleId}, {$set: updatedVehicle});
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the vehicle.');
    }
};

const deleteVehicle = async (req, res) => {
    //#swagger.tags= ['Vehicles']
    const vehicleId = new ObjectId(req.params.id);
    const response = await mongoDb.getDatabase().db().collection('vehicles').deleteOne({_id: vehicleId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the vehicle.');
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicles,
    updateVehicle,
    deleteVehicle
};