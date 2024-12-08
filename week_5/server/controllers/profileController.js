const Profile = require('../models/profileModel');

// function to fetch profile details in the database
exports.fetchProfileDetail = async (req, res) => {
    try {
        //extractprofile details from mongoDB
        const profile = await Profile.find();
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}