"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../../config");
class NodemailerAdapter {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: config_1.envs.MAILER_SERVICE,
            auth: {
                user: config_1.envs.MAILER_EMAIL,
                pass: config_1.envs.MAILER_SECRET_KEY,
            },
        });
    }
    async sendConfirmationEmail(to, name) {
        // Verifica si se debe enviar correo (env-var ya devuelve booleano)
        if (!config_1.envs.SEND_MAIL) {
            console.log('⏭️ Envío de correo deshabilitado por configuración.');
            return;
        }
        // Ruta al archivo Pug
        // const templatePath = path.join(__dirname, '..', 'templates', 'welcome.pug');
        const templatePath = path_1.default.resolve(process.cwd(), 'src', 'presentation', 'emails', 'templates', 'welcome.pug');
        // Renderiza el HTML con datos
        const html = pug_1.default.renderFile(templatePath, {
            name,
            date: new Date().toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        });
        // Envía el correo
        const info = await this.transporter.sendMail({
            from: `"Banco Dev 🏦" <${config_1.envs.MAILER_EMAIL}>`,
            to,
            subject: '¡Bienvenido a Banco Dev!',
            html,
        });
        console.log(`📨 Correo enviado a ${to}. Message ID: ${info.messageId}`);
    }
}
exports.NodemailerAdapter = NodemailerAdapter;
