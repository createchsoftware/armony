import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


// transporter es la configuracion del correo emisor
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:587, //no es el puerto del server
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }

});

async function CrearCuentaEmail(direccion,token,full_name,userID){
    return await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:direccion,
        subject:'Bienvenido a Armony, tu cuenta ha sido creada exitosamente',
        html:cuerpoCorreo(token,full_name,userID)
    })
}





function cuerpoCorreo(token, full_name, userID){

    console.log("mensaje de que llego hasta aqui");
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            *{
                padding: 0;
                margin: 0;
            }

            .body-email li{
                text-decoration:underline;
                list-style: none;
            }

            .body-email{
                background-color: #82E0AA;
                padding: 8px;
                display: flex;
                flex-direction: column;
            }

            .body-email .header{
                position: relative;
                width: 100%;
                background-color: aliceblue;
                font-size: 25px;
                padding: 2px;
            }
            
        </style>
    </head>
    <body>
        <div class="body-email">
        <div class="header">
            <span>Bienvenido a Armony, nos alegra que ahora formes parte de nuestro desarrollo.</span>
        </div>
        <div class="body">
            <span>Se te recomienda guardar tu usuario, ya que con el podras logearte sin el correo</span>
            <ul>
                <li><strong>nombre: </strong>${full_name}</li>
                <li><strong>usuario: </strong>${userID}</li>
            </ul>
        </div>
            
        </div>
    </body>
    </html>
    `;
};

export default CrearCuentaEmail;