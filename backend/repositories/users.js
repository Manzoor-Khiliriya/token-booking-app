const User = require('../models/user');
const { hashPassword } = require('../utilts/passwordHelper');


const getUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password');
        return user;
    } catch (error) {
        throw error;
    }

}


const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByPhoneNumber = async (phone_number) => {
     try {
        const user = await User.findOne({ phone_number: phone_number });
        return user;
    } catch (error) {
        throw error;
    }
}


const createUser = async (userData) => {
    try {
        const hashedPassword = hashPassword(userData.password);
        const newUserData = { ...userData, password: hashedPassword };
        const user = new User(newUserData);
        const savedUser = await user.save();
        return savedUser._id;
    } catch (error) {
        throw error;
    }
}


const updateUser = async (id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}


const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);; 
        return deletedUser; 
    } catch (error) {
        throw error; 
    }
};


module.exports = {
    getUserById,
    getUserByUsername,
    getUserByPhoneNumber,
    createUser,
    updateUser,
    deleteUser
}