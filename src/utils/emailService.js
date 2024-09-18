const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
  }
});

// Example of using POP3/IMAP (uncomment and configure as needed)
/*
const imapTransporter = nodemailer.createTransport({
  host: 'imap.example.com',
  port: 993,
  secure: true, // Use SSL
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
  },
  tls: {
    rejectUnauthorized: false
  }
});
*/

const sendWelcomeEmail = async (to, firstName) => {
  const mailOptions = {
    from: '"Rider Team" <noreply@bearider.se>',
    to: to,
    subject: '🚀 Välkommen till Rider - Din karriärboost börjar nu!',
    html: `
      <h1>Yo ${firstName}! Välkommen till Rider-gänget! 🎉</h1>
      <p>Du har precis tagit det första steget mot en grym karriär. Här är vad som händer nu:</p>
      <ul>
        <li>✨ Pimpa din profil och låt dina skills shina</li>
        <li>🧠 Boka en session med våra grymma coaches</li>
        <li>📝 Få ditt CV att sticka ut som en boss</li>
      </ul>
      <p>Har du frågor? Släng iväg ett DM till oss på Insta @bearider.se eller maila hej@bearider.se</p>
      <p>Let's get this show on the road! 🚀</p>
      <p>// Rider Crew</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

const sendPasswordResetEmail = async (to, resetToken) => {
  const resetUrl = `https://bearider.se/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: '"Rider Team" <noreply@bearider.se>',
    to: to,
    subject: '🔐 Återställ ditt lösenord på Rider',
    html: `
      <h1>Yo! Dags att fixa ditt lösenord 🛠️</h1>
      <p>Vi hörde att du tappat bort ditt lösenord. No worries, det händer den bästa!</p>
      <p>Klicka på länken nedan för att välja ett nytt, grymt lösenord:</p>
      <a href="${resetUrl}">Återställ mitt lösenord</a>
      <p>Länken är giltig i 1 timme. Efter det måste du begära en ny.</p>
      <p>Om du inte begärt att återställa ditt lösenord, kan du chilla. Ditt konto är säkert.</p>
      <p>Stay cool! 😎</p>
      <p>// Rider Crew</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail };