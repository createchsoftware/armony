document.getElementById('step3').addEventListener('click', async () => {
    if (ejecutandose) {
        return;
    }

    ejecutandose = true;
    document.cookie = "Rem_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (!politicas.checked) {
        mostrarToast('Debes de aceptar las políticas', 'blue', 'fa-lock');
        ejecutandose = false;
        return;
    }

    ShowSoon('oculto');

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

        const respuesta = await fetch("/api/step3", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pass: contraseña.value,
                again_pass: confirmacion.value,
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!respuesta.ok) {
            throw new Error('Network response was not ok');
        }

        const respuestaJson = await respuesta.json();

        if (respuestaJson.confirmar) {
            manejarRespuestaInvalida('Las contraseñas no concuerdan', 'yellow', 'fa-equals');
        } else if (respuestaJson.invalidas) {
            manejarContraseñasInvalidas(respuestaJson.invalidas);
        } else if (respuestaJson.redirect) {
            await manejarRedireccion(respuestaJson.redirect);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        mostrarToast('Hubo un problema con la solicitud. Inténtalo de nuevo.', 'red', 'fa-exclamation-triangle');
    } finally {
        ShowSoon('oculto');
        ejecutandose = false;
    }
});

function mostrarToast(mensaje, color, icono) {
    let toastBox = document.getElementById('toastBox');
    let div = document.createElement('div');
    div.classList.add('toast', color);
    div.innerHTML = `<div id="texto">${mensaje}</div><div id="icono"><i class="fa-solid ${icono}"></i></div>`;
    toastBox.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 6000);
}

function manejarRespuestaInvalida(mensaje, color, icono) {
    contraseña.value = '';
    confirmacion.value = '';
    contraseña.style.borderColor = color;
    confirmacion.style.borderColor = color;
    mostrarToast(mensaje, color, icono);
}

function manejarContraseñasInvalidas(invalidas) {
    contraseña.value = '';
    confirmacion.value = '';
    contraseña.style.borderColor = 'red';
    confirmacion.style.borderColor = 'red';
    let toastBox = document.getElementById('toastBox');
    invalidas.forEach(mensaje => {
        let div = document.createElement('div');
        div.classList.add('toast', 'red');
        div.innerHTML = `<div id="texto">Tu contraseña ${mensaje}</div><div id="icono"><i class="fa-solid fa-circle-xmark"></i></div>`;
        toastBox.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 6000);
    });
}

async function manejarRedireccion(url) {
    if (url === '/spa/signUp/Confirmacion') {
        proximamente.innerHTML = `<img id="process-img" src="../../pictures/ArrowCut.png" />`;
        await new Promise(resolve => setTimeout(resolve, 1200));
        proximamente.innerHTML = `<h1 className="soon-title">
        <i id='alarm' class="fa-solid fa-user-plus"></i>
        Inserción de Usuario
        <i id='alarm' class="fa-solid fa-user-plus"></i>
        </h1>
        <h4 className="soon-desc">
            Felicidades, en un momento se creará tu cuenta. <br />
            Este proceso puede tardar unos segundos, se paciente. <br />
        </h4>`;
    }
    window.location.href = url;
}