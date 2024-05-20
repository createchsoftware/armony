import twilio from 'twilio';

const accountSid = process.env.SID_TWILIO;
const authToken = process.env.TOKEN_TWILIO;

const client = new twilio(accountSid,authToken); //establecer la conexion con twilio


function SMS_VERIFICACION(codigo,telefono){
    client.messages.create({
        body:`Su codigo de verificacion para recuperar su contrasena es: ${codigo}`,
        to:telefono,
        from:process.env.PHONE_NUMBER
    })
}

function SMS_CONGRALUATION(telefono){
    client.messages.create({
        body:`Felicidades, su contraseña ha sido cambiada exitosamente`,
        to:telefono,
        from:process.env.PHONE_NUMBER
    })
}

export const methods ={
    SMS_VERIFICACION,
    SMS_CONGRALUATION
}