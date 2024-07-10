const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    const { username, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hashSync(password, 8);
        const newUser = await User.create({ username, password: hashedPassword });
    
        res.status(201).json({message: 'User created'});
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(400).json({ error: 'Username already exists' });
        }else{
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if(!user || !await bcrypt.compare(password, user.password)){
        return res.status(401).json({ error: 'Invalid username and/or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
};

module.exports = { register, login };