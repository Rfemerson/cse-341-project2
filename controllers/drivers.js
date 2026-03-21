const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllDrivers = async (req, res) => {
    const result = await mongoDb.getDatabase().db().collection('drivers').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const getDriverById = async (req, res) => {
    const driverId = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection('drivers').findOne({_id: driverId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createDriver = async (req, res) => {
    //#swagger.tags = ['Drivers']
    const newDriver = {
        name: req.body.name,
        driversLicenseNumber: req.body.driversLicenseNumber,
        driversLicenseExpirationDate: req.body.driversLicenseExpirationDate,
        status: req.body.status,
    };
    const response = await mongoDb.getDatabase().db().collection('drivers').insertOne(newDriver);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the driver.');
    }
};

const updateDriver = async (req, res) => {
    //#swagger.tags= ['Vehicles']
    const driverId = new ObjectId(req.params.id);
    const updatedDriver = {
        name: req.body.name,
        driversLicenseNumber: req.body.driversLicenseNumber,
        driversLicenseExpirationDate: req.body.driversLicenseExpirationDate,
        status: req.body.status,
    };
    const response = await mongoDb.getDatabase().db().collection('drivers').updateOne({_id: driverId}, {$set: updatedDriver});
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the driver.');
    }
};

const deleteDriver = async (req, res) => {
    //#swagger.tags= ['Vehicles']
    const driverId = new ObjectId(req.params.id);
    const response = await mongoDb.getDatabase().db().collection('drivers').deleteOne({_id: driverId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the driver.');
    }
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};