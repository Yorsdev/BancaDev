import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';
import { envs } from '../../config';

export class NodemailerAdapter {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendConfirmationEmail(to: string, name: string) {
    // Verifica si se debe enviar correo (env-var ya devuelve booleano)
    if (!envs.SEND_MAIL) {
      console.log('⏭️ Envío de correo deshabilitado por configuración.');
      return;
    }

    // Ruta al archivo Pug
    // const templatePath = path.join(__dirname, '..', 'templates', 'welcome.pug');
    const templatePath = path.resolve(
      process.cwd(),
      'src',
      'presentation',
      'emails',
      'templates',
      'welcome.pug',
    );

    // Renderiza el HTML con datos
    const html = pug.renderFile(templatePath, {
      name,
      date: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });

    // Envía el correo
    const info = await this.transporter.sendMail({
      from: `"Banco Dev 🏦" <${envs.MAILER_EMAIL}>`,
      to,
      subject: '¡Bienvenido a Banco Dev!',
      html,
    });

    console.log(`📨 Correo enviado a ${to}. Message ID: ${info.messageId}`);
  }
}
