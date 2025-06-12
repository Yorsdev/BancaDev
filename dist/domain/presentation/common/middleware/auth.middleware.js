"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_adapter_1 = require("../../../../config/jwt.adapter");
const data_1 = require("../../../../data");
class AuthMiddleware {
    static async protect(req, res, next) {
        const token = req?.cookies?.token; //se cambió let por const
        if (!token) {
            return res.status(401).json({ message: 'token no provided' });
        }
        try {
            const payload = (await jwt_adapter_1.JwtAdapter.validateToken(token));
            if (!payload)
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            const user = await data_1.User.findOne({
                where: {
                    id: payload.id,
                },
            });
            if (!user)
                return res.status(401).json({ message: 'invalid token' });
            req.sessionUser = user;
            next();
        }
        catch (error) {
            return res.status(500).json({ message: 'internal server error' });
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
