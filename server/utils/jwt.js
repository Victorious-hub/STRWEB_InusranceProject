import 'dotenv/config'; 
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const serverSecret = process.env.SECRET;
const refreshTokens = [];

export function generateAccessToken(userId) {
    return sign({ userId }, serverSecret, { expiresIn: '20m' });
}

export function generateRefreshToken(userId) {
    const refreshToken = sign(userId, serverSecret);
    refreshTokens.push(refreshToken);
    return refreshToken;
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    verify(token, serverSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export function refreshToken(req, res) {
    const { token } = req.body;
    if (token == null) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    verify(token, serverSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
}