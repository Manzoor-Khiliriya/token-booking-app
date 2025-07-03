const usersRepositories = require('../repositories/users');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utilts/errorResponse');
const { createJwt } = require('../utilts/jwtHelper');
const { compareWithHashedPassword } = require('../utilts/passwordHelper');


const getUserById = asyncHandler(async (req, res, next) => {
    const id = req.userId;
    const user = await usersRepositories.getUserById(id);

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({ success: true, data: user });
})



const createUser = asyncHandler(async (req, res, next) => {
    const { username, phone_number, date_of_birth, gender, place, password } = req.body;

    if (!username || !phone_number || !date_of_birth || !gender || !place || !password) {
        return next(new ErrorResponse('All fields are required', 400))
    }


    const existingUser = await usersRepositories.getUserByPhoneNumber(phone_number);
    if (existingUser) {
        return next(new ErrorResponse('Phone number already registered', 400));
    }


    let currentDate = new Date();
    let givenDateOfBirth = new Date(date_of_birth);

    if (givenDateOfBirth > currentDate) {
        return next(new ErrorResponse('Please select correct date of birth', 400));
    }

    if (password.length < 8) {
        return next(new ErrorResponse('Password must be at least 8 characters long', 400));
    }
    const userId = await usersRepositories.createUser({
        username,
        phone_number,
        date_of_birth,
        gender,
        place,
        password
    });

    const token = createJwt(userId);
    res.status(201).json({ success: true, data: { token } });

})


const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const existingUser = await usersRepositories.getUserById(id);
    if (!existingUser) {
        return next(new ErrorResponse('User not found', 404));
    }
    await usersRepositories.updateUser(id, data);
    const updatedData = await usersRepositories.getUserById(id);
    res.status(200).json({ success: true, data: updatedData })
})

const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existingUser = await usersRepositories.getUserById(id);
    if (!existingUser) {
        return next(new ErrorResponse('User not found', 404));
    }

    await usersRepositories.deleteUser(id);
    res.status(200).json({ success: true, data: { message: 'User deleted successfully' } });
});


const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorResponse('Username and password required', 400));
    }

    const user = await usersRepositories.getUserByUsername(username);

    if (!user) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const isMatch = compareWithHashedPassword(password, user.password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const token = createJwt(user._id);
    res.status(200).json({ success: true, data: { token } });
})




module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}