import bcrypt from 'bcryptjs';

const user = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'Jerry Down',
        email: 'jerry@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },
    {
        name: 'Tom Rise',
        email: 'tom@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },
];

export default user;