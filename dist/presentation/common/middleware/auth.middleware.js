"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_adapter_1 = require("../../../config/jwt.adapter");
const data_1 = require("../../../data");
class AuthMiddleware {
    static async protect(req, res, next) {
        const token = req?.cookies?.token;
        if (!token) {
            res.status(401).json({ message: 'token not provided' });
            return;
        }
        try {
            const payload = (await jwt_adapter_1.JwtAdapter.validateToken(token));
            if (!payload) {
                res.status(401).json({ message: 'Unauthorized: Invalid token' });
                return;
            }
            const user = await data_1.User.findOne({
                where: {
                    id: payload.id,
                },
            });
            if (!user) {
                res.status(401).json({ message: 'invalid token' });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            res.status(500).json({ message: 'internal server error' });
        }
    }
    static allowAdminOrSelf(req, res, next) {
        const sessionUser = req.sessionUser;
        const { id } = req.params;
        if (sessionUser.rol === data_1.UserRole.ADMIN || sessionUser.id === id) {
            return next();
        }
        return res
            .status(403)
            .json({ message: 'You are not authorized to modify this user' });
    }
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.restrictTo = (...roles) => {
    return (req, res, next) => {
        const sessionUser = req.sessionUser;
        if (!sessionUser) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        if (!roles.includes(sessionUser.rol)) {
            return res
                .status(403)
                .json({ message: 'You are not authorized to access this route' });
        }
        next();
    };
};
