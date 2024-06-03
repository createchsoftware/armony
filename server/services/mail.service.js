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


async function CancelacionSuscripcion(direccion,token,full_name){
    return await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:direccion,
        subject:'Tu suscripcion ha sido cancelada',
        html:cuerpoCancelacion(token,full_name)
    })
}


async function Cambio_de_correo(token,full_name,id,correo){
    return await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:correo,
        subject:'Armony te notifica que acabas de cambiar de correo',
        html:cuerpoCorreoNuevo(token,full_name,id,correo)
    })
}

async function Codigo_de_Verificacion(token,correo,codigo){
    return await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:correo,
        subject:'codigo de verificacion de Armony',
        html:cuerpoCodigoVerificacion(token,codigo)
    })
}

async function Confirmacion_Contraseña(token,correo){
    return await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:correo,
        subject:'Tu nueva contrasena ha sido establecida exitosamente',
        html:cuerpoConfirmacionContraseña(token)
    })
}








function cuerpoCorreoNuevo(token,full_name,id,correo){
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
            <span>Cambio de correo exitoso del usuario ${id}</span>
        </div>
        <div class="body">
            <span>Tu nuevo correo ya fue registrado, la proxima vez que inicies sesion, hazlo con tu correo</span>
            <ul>
                <li><strong>nombre: </strong>${full_name}</li>
                <li><strong>nuevo correo: </strong>${correo}</li>
            </ul>
        </div>
            
        </div>
    </body>
    </html>
    `;
}

function cuerpoCorreo(token, full_name, userID){
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




function cuerpoCodigoVerificacion(token,codigo){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            *{
                padding: 0;
                margin: 0;
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
                <span>Codigo de verificacion</span>
            </div>
            <div class="body">
                <span>Se te envio este codigo de verificacion: ${codigo}</span>
            </div>
        </div>
    </body>
    </html>`;
}



function cuerpoConfirmacionContraseña(token){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            *{
                padding: 0;
                margin: 0;
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
                <span>Cambio de contraseña</span>
            </div>
            <div class="body">
                <span>Es un placer informale que el cambio de contraseña ha sido exitoso</span>
            </div>
        </div>
    </body>
    </html>`;
}

function cuerpoCancelacion(token,full_name){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            *{
                padding: 0;
                margin: 0;
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
            <span>Tu suscripcion ha sido exitosamente cancelada.</span>
        </div>
        <div class="body">
            <p>Estimad@ ${full_name}, le informamos que al cancelar una suscripcion, no se hace ninguna clase de rembolso, ademas de que su renovacion automatica se desactiva, por lo que ya no se le volveran a hacer cargos mensuales de suscripcion de manera automatica, sin embargo, usted puede volver a adquirir una suscripcion en el futuro</p>
        </div>
            
        </div>
    </body>
    </html>`;
}





export const methods = {
    CrearCuentaEmail,
    Cambio_de_correo,
    Codigo_de_Verificacion,
    Confirmacion_Contraseña,
    CancelacionSuscripcion
}