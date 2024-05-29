import { useEffect } from "react";
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Seguridad() {
  async function checkLogin() {
    let respuestaJson = null;
    try {
      const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      respuestaJson = await respuesta.json();

      if (respuestaJson.logueado != true) {
        window.location.href = "/spa";
      }
    } catch (error) {
      window.location.href = "/spa";
    }
  }

  useEffect(() => checkLogin(), []);

  return (
    <LayoutPrincipal>
      <main className="grid gap-6 my-24">
        <section className="rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <a
            className="flex items-baseline content-center text-sm gap-x-4"
            href="/perfil"
          >
            {" "}
            <IoIosArrowBack className="" />
            Volver
          </a>
          <img
            className="w-32 m-auto my-6 -mt-24 rounded-full aspect-square"
            src="../../pictures/seguridadMarco.png"
            alt=""
          />
          <div className="m-auto text-center ">
            <h1 className="text-[#036C65] font-semibold text-2xl mb-2">
              Seguridad
            </h1>
            <h2>Configuración para ayudarte a proteger tu cuenta</h2>
          </div>
        </section>

        <section className="w-[60%] m-auto mt-8">
          <h2 className="text-[#036C65] text-2xl mb-4">
            Tu información de contacto
          </h2>
          <div className="rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <a
              href="/perfil/seguridad/correo"
              className="flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100"
            >
              <div className="flex gap-6">
                <div className="rounded-full  w-12 place-content-center flex justify-center items-center md:bg-[#D9D9D9]">
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.6539 12.4615H0.346191V29.9615H32.6539V12.4615Z"
                      fill="#1AA6B8"
                    />
                    <path
                      d="M32.6539 12.502H0.346191L16.5 0.346191L32.6539 12.502Z"
                      fill="#24B9CC"
                    />
                    <path
                      d="M25.3308 3.09906H2.84326V24.5904H30.1567V8.30868L25.3308 3.09906Z"
                      fill="#EAE8E8"
                    />
                    <path
                      d="M25.3308 3.09906V8.30868H30.1568L25.3308 3.09906Z"
                      fill="#D7D4D4"
                    />
                    <path
                      d="M32.6538 12.4615V32.6539L16.5 21.8846L32.6538 12.4615Z"
                      fill="#80DEEA"
                    />
                    <path
                      d="M16.5 21.8846L0.346191 32.6539V12.4615L16.5 21.8846Z"
                      fill="#80DEEA"
                    />
                    <path
                      d="M32.6539 32.6539H0.346191L16.5 21.8846L32.6539 32.6539Z"
                      fill="#5CD4E3"
                    />
                    <path
                      d="M16.5001 7.07697C15.632 7.07595 14.7766 7.2848 14.0067 7.68572C13.2368 8.08665 12.5753 8.66775 12.0784 9.37953C11.5816 10.0913 11.2642 10.9126 11.1533 11.7736C11.0424 12.6345 11.1412 13.5094 11.4414 14.3239C11.7417 15.1384 12.2343 15.8682 12.8775 16.4511C13.5206 17.0341 14.2951 17.4529 15.1351 17.672C15.975 17.891 16.8555 17.9037 17.7014 17.709C18.5473 17.5143 19.3336 17.118 19.9933 16.5539L19.3203 15.7327C18.5774 16.3761 17.6369 16.7461 16.6548 16.7814C15.6727 16.8167 14.7081 16.5152 13.921 15.9268C13.1338 15.3384 12.5716 14.4986 12.3274 13.5467C12.0833 12.5947 12.172 11.588 12.5788 10.6934C12.9856 9.79881 13.686 9.07022 14.5639 8.6285C15.4417 8.18679 16.4442 8.05852 17.405 8.26497C18.3658 8.47142 19.2272 9.00018 19.8461 9.76352C20.465 10.5269 20.8043 11.4789 20.8078 12.4616V13.2693C20.8078 13.4835 20.7227 13.6889 20.5712 13.8404C20.4197 13.9919 20.2143 14.077 20.0001 14.077C19.7858 14.077 19.5804 13.9919 19.4289 13.8404C19.2775 13.6889 19.1924 13.4835 19.1924 13.2693V9.76928H18.1154V10.3212C17.6511 9.96687 17.0841 9.77315 16.5001 9.76928C16.0542 9.76758 15.6148 9.87666 15.2215 10.0867C14.8282 10.2968 14.4932 10.6013 14.2466 10.9728C14 11.3443 13.8496 11.7713 13.8088 12.2153C13.768 12.6594 13.8382 13.1066 14.0129 13.5168C14.1877 13.927 14.4616 14.2874 14.8101 14.5656C15.1586 14.8438 15.5707 15.0311 16.0095 15.1107C16.4482 15.1902 16.8999 15.1596 17.3238 15.0214C17.7478 14.8833 18.1308 14.642 18.4385 14.3193C18.6466 14.6449 18.9501 14.8984 19.3075 15.0453C19.665 15.1921 20.059 15.225 20.4359 15.1397C20.8128 15.0543 21.1542 14.8547 21.4134 14.5681C21.6727 14.2816 21.8373 13.922 21.8847 13.5385V12.4616C21.8847 11.0335 21.3174 9.6639 20.3076 8.65409C19.2977 7.64427 17.9281 7.07697 16.5001 7.07697ZM16.5001 14.077C16.1806 14.077 15.8682 13.9822 15.6026 13.8047C15.337 13.6272 15.1299 13.3749 15.0076 13.0798C14.8854 12.7846 14.8534 12.4598 14.9157 12.1464C14.978 11.8331 15.1319 11.5453 15.3578 11.3193C15.5837 11.0934 15.8716 10.9396 16.1849 10.8772C16.4983 10.8149 16.8231 10.8469 17.1182 10.9692C17.4134 11.0914 17.6657 11.2985 17.8432 11.5641C18.0207 11.8298 18.1154 12.1421 18.1154 12.4616C18.1154 12.89 17.9453 13.3009 17.6423 13.6038C17.3394 13.9068 16.9285 14.077 16.5001 14.077Z"
                      fill="#FF6E40"
                    />
                  </svg>
                </div>
                <div>
                  <h2>Tu correo electrónico</h2>
                  <p className="text-gray-500">
                    Actualiza tu correo electrónico
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <MdNavigateNext />
              </div>
            </a>
            <a
              href="/perfil/seguridad/contrasena"
              className="flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100"
            >
              <div className="flex gap-6">
                <div className="rounded-full  w-12 place-content-center flex justify-center items-center md:bg-[#D9D9D9]">
                  <svg
                    width="26"
                    height="39"
                    viewBox="0 0 26 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 38.3249C5.82032 38.3249 0 32.5046 0 25.325V17.3549C0 15.5322 1.47754 14.0547 3.30019 14.0547H22.6998C24.5225 14.0547 26 15.5322 26 17.3549V25.325C26 32.5046 20.1797 38.3249 13 38.3249Z"
                      fill="#00886F"
                    />
                    <path
                      d="M13 35.7249C5.82032 35.7249 0 29.9046 0 22.7249V16.6457C0 14.8231 1.47754 13.3455 3.30019 13.3455H22.6998C24.5225 13.3455 26 14.8231 26 16.6457V22.7249C26 29.9046 20.1797 35.7249 13 35.7249Z"
                      fill="#00A388"
                    />
                    <path
                      d="M21.6266 8.62945V13.3458H17.8177V8.62945C17.8177 7.3424 17.3158 6.13082 16.4058 5.22082C15.4958 4.31082 14.2868 3.81164 12.9998 3.81164C10.3427 3.81164 8.18204 5.97219 8.18204 8.62945V13.3458H4.37305V8.62945C4.37305 3.87143 8.24185 0 12.9998 0C15.306 0 17.4718 0.899655 19.102 2.52986C20.7296 4.1574 21.6266 6.32322 21.6266 8.62945Z"
                      fill="#4B687F"
                    />
                    <path
                      d="M11.2539 23.7192C11.2142 23.868 11.1928 24.0239 11.1928 24.1848V28.1141C11.1928 29.1125 12.0016 29.9213 13 29.9213C13.9984 29.9213 14.8073 29.1125 14.8073 28.1141V24.1848C14.8073 24.0239 14.7859 23.868 14.7461 23.7192C15.5 23.1773 15.99 22.292 15.99 21.2926C15.99 19.6412 14.6514 18.3026 13 18.3026C11.3486 18.3026 10.01 19.6412 10.01 21.2926C10.01 22.292 10.5 23.1773 11.2539 23.7192Z"
                      fill="#3E5063"
                    />
                    <path
                      d="M8.18204 11.3776H4.37305V13.3458H8.18204V11.3776Z"
                      fill="#3E5063"
                    />
                    <path
                      d="M21.6269 11.3776H17.8179V13.3458H21.6269V11.3776Z"
                      fill="#3E5063"
                    />
                  </svg>
                </div>
                <div>
                  <h2>Tu contraseña</h2>
                  <p className="text-gray-500">
                    Cambia tu contraseña de tu cuenta Armony
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <MdNavigateNext />
              </div>
            </a>
          </div>
        </section>

        <section className="w-[60%] m-auto mt-8">
          <h2 className="text-[#036C65] text-2xl mb-4">
            Recomendaciones de seguridad
          </h2>
          <div className="rounded-2xl m-auto grid  p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <a
              href="/perfil/informacion"
              className="flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100"
            >
              <div className="flex gap-6">
                <div className="rounded-full  w-12 place-content-center flex justify-center items-center md:bg-[#D9D9D9]">
                  <svg
                    width="47"
                    height="42"
                    viewBox="0 0 47 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.2164 0.553833H14.7592C13.7824 0.554018 12.8227 0.811293 11.9768 1.29981C11.1308 1.78832 10.4284 2.49087 9.93993 3.33686L1.21133 18.4558C0.722007 19.3017 0.464355 20.2616 0.464355 21.2388C0.464355 22.2161 0.722007 23.176 1.21133 24.0219L9.93993 39.1408C10.4278 39.9876 11.1301 40.691 11.9761 41.1802C12.8221 41.6695 13.782 41.9273 14.7592 41.9279H32.2164C33.1939 41.9281 34.1542 41.671 35.0008 41.1824C35.8475 40.6939 36.5507 39.9912 37.0398 39.1449L45.7684 24.0464C46.2577 23.2005 46.5154 22.2405 46.5154 21.2633C46.5154 20.2861 46.2577 19.3262 45.7684 18.4803L37.0398 3.38175C36.5564 2.52708 35.8557 1.81537 35.0086 1.31875C34.1616 0.822131 33.1983 0.558245 32.2164 0.553833Z"
                      fill="url(#paint0_linear_2422_3576)"
                    />
                    <path
                      d="M14.3552 11.4289H32.6245C33.088 11.4289 33.547 11.5202 33.9753 11.6976C34.4035 11.875 34.7927 12.135 35.1204 12.4628C35.4482 12.7905 35.7082 13.1796 35.8856 13.6079C36.063 14.0362 36.1543 14.4952 36.1543 14.9587V27.5231C36.1543 28.4582 35.7828 29.355 35.1216 30.0162C34.4604 30.6774 33.5636 31.0489 32.6286 31.0489H14.3552C13.4191 31.0489 12.5213 30.677 11.8593 30.015C11.1973 29.353 10.8254 28.4552 10.8254 27.5191V14.9546C10.8254 14.4913 10.9168 14.0325 11.0942 13.6044C11.2716 13.1764 11.5317 12.7876 11.8595 12.4601C12.1874 12.1327 12.5765 11.873 13.0047 11.6961C13.433 11.5192 13.8919 11.4284 14.3552 11.4289Z"
                      fill="url(#paint1_linear_2422_3576)"
                    />
                    <path
                      d="M32.6246 12.2246C33.3497 12.2246 34.0451 12.5126 34.5578 13.0254C35.0706 13.5381 35.3586 14.2335 35.3586 14.9586V27.5231C35.3586 28.2475 35.0711 28.9423 34.5593 29.4549C34.0474 29.9675 33.3531 30.2561 32.6286 30.2572H14.3553C13.9965 30.2572 13.6411 30.1864 13.3097 30.049C12.9782 29.9115 12.677 29.7101 12.4235 29.4561C12.1699 29.2022 11.9689 28.9008 11.832 28.5691C11.695 28.2374 11.6248 27.8819 11.6253 27.5231V14.9586C11.6248 14.5998 11.695 14.2444 11.832 13.9127C11.9689 13.581 12.1699 13.2796 12.4235 13.0256C12.677 12.7717 12.9782 12.5702 13.3097 12.4328C13.6411 12.2953 13.9965 12.2246 14.3553 12.2246H32.6246ZM32.6246 10.6331H14.3553C13.2084 10.6342 12.1089 11.0903 11.2979 11.9012C10.4869 12.7122 10.0309 13.8118 10.0298 14.9586V27.5231C10.0319 28.6696 10.4884 29.7686 11.2991 30.5793C12.1098 31.39 13.2088 31.8465 14.3553 31.8486H32.6246C33.7707 31.8465 34.8693 31.3899 35.6793 30.5791C36.4894 29.7682 36.9449 28.6693 36.946 27.5231V14.9586C36.946 13.8122 36.4909 12.7126 35.6805 11.9015C34.8702 11.0904 33.7711 10.6342 32.6246 10.6331Z"
                      fill="white"
                    />
                    <path
                      d="M34.5628 12.7796L25.5241 21.851C24.9655 22.4092 24.2081 22.7227 23.4185 22.7227C22.6288 22.7227 21.8714 22.4092 21.3128 21.851L12.2129 12.751"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M26.3606 21.6183L34.8525 30.0817"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.417 29.9103L20.7294 21.6469"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M28.3356 14.4812H24.614"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2422_3576"
                        x1="5.57359"
                        y1="31.5834"
                        x2="41.402"
                        y2="10.8984"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.02" stop-color="#FF0000" />
                        <stop offset="1" stop-color="#9E005D" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_2422_3576"
                        x1="10.8295"
                        y1="21.2389"
                        x2="36.1502"
                        y2="21.2389"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.02" stop-color="#FF0000" />
                        <stop offset="1" stop-color="#9E005D" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h2>Correo electrónico de recuperación</h2>
                  <p className="text-gray-500">
                    Agrega un correo de recuperación si detecta actividad
                    inusual en tu cuenta o no puedes acceder.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <MdNavigateNext />
              </div>
            </a>
            <a
              href="/perfil/informacion"
              className="flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100"
            >
              <div className="flex gap-6">
                <div className="rounded-full  w-12 place-content-center flex justify-center items-center md:bg-[#D9D9D9]">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.24 3H15.76C12.855 3 10.5 5.35498 10.5 8.26V39.74C10.5 42.645 12.855 45 15.76 45H32.24C35.145 45 37.5 42.645 37.5 39.74V8.26C37.5 5.35498 35.145 3 32.24 3Z"
                      fill="url(#paint0_linear_2422_3584)"
                    />
                    <path
                      d="M32.39 6.00001H29.12C28.8579 5.99903 28.6017 6.07794 28.3855 6.22622C28.1693 6.3745 28.0035 6.58511 27.91 6.83001L27.81 7.08001C27.7165 7.32491 27.5507 7.53552 27.3345 7.6838C27.1183 7.83208 26.8621 7.91098 26.6 7.91001H21.39C21.1279 7.91098 20.8717 7.83208 20.6555 7.6838C20.4393 7.53552 20.2735 7.32491 20.18 7.08001L20.08 6.83001C19.9871 6.5867 19.8228 6.3772 19.6086 6.22905C19.3944 6.08091 19.1404 6.00106 18.88 6.00001H15.61C15.0504 6.00001 14.5137 6.22231 14.118 6.61801C13.7223 7.01372 13.5 7.5504 13.5 8.11001V39.89C13.5 40.4496 13.7223 40.9863 14.118 41.382C14.5137 41.7777 15.0504 42 15.61 42H32.39C32.9496 42 33.4863 41.7777 33.882 41.382C34.2777 40.9863 34.5 40.4496 34.5 39.89V8.11001C34.5 7.5504 34.2777 7.01372 33.882 6.61801C33.4863 6.22231 32.9496 6.00001 32.39 6.00001Z"
                      fill="url(#paint1_linear_2422_3584)"
                    />
                    <path
                      d="M31.5 19.5H16.5V42H31.5V19.5Z"
                      fill="url(#paint2_linear_2422_3584)"
                    />
                    <path
                      d="M32.39 6.00001H29.12C28.8579 5.99903 28.6017 6.07794 28.3855 6.22622C28.1693 6.3745 28.0035 6.58511 27.91 6.83001L27.81 7.08001C27.7165 7.32491 27.5507 7.53552 27.3345 7.6838C27.1183 7.83208 26.8621 7.91098 26.6 7.91001H21.39C21.1279 7.91098 20.8717 7.83208 20.6555 7.6838C20.4393 7.53552 20.2735 7.32491 20.18 7.08001L20.08 6.83001C19.9871 6.5867 19.8228 6.3772 19.6086 6.22905C19.3944 6.08091 19.1404 6.00106 18.88 6.00001H15.61C15.0504 6.00001 14.5137 6.22231 14.118 6.61801C13.7223 7.01372 13.5 7.5504 13.5 8.11001V9.23001C13.5 8.6704 13.7223 8.13372 14.118 7.73801C14.5137 7.34231 15.0504 7.12001 15.61 7.12001H18.88C19.1481 7.12274 19.4087 7.20896 19.6256 7.36667C19.8425 7.52439 20.0048 7.74576 20.09 8.00001L20.19 8.25001C20.2952 8.47836 20.4648 8.67099 20.678 8.80424C20.8912 8.93748 21.1387 9.00553 21.39 9.00001H26.61C26.8721 9.00098 27.1283 8.92208 27.3445 8.7738C27.5607 8.62552 27.7265 8.41491 27.82 8.17001L27.92 7.92001C28.0135 7.67511 28.1793 7.46449 28.3955 7.31622C28.6117 7.16794 28.8679 7.08903 29.13 7.09001H32.4C32.6788 7.0913 32.9546 7.14783 33.2114 7.25633C33.4682 7.36483 33.701 7.52315 33.8962 7.72213C34.0915 7.92112 34.2454 8.15683 34.349 8.41564C34.4527 8.67446 34.504 8.95124 34.5 9.23001V8.11001C34.5 7.5504 34.2777 7.01372 33.882 6.61801C33.4863 6.22231 32.9496 6.00001 32.39 6.00001Z"
                      fill="url(#paint3_linear_2422_3584)"
                    />
                    <path
                      d="M24 27.01C28.1421 27.01 31.5 23.6521 31.5 19.51C31.5 15.3679 28.1421 12.01 24 12.01C19.8579 12.01 16.5 15.3679 16.5 19.51C16.5 23.6521 19.8579 27.01 24 27.01Z"
                      fill="url(#paint4_linear_2422_3584)"
                    />
                    <path
                      d="M24 21.67C22.9079 21.6697 21.829 21.9087 20.8391 22.3699C19.8492 22.8312 18.9723 23.5036 18.27 24.34C18.9731 25.1752 19.8502 25.8465 20.84 26.3071C21.8298 26.7677 22.9083 27.0064 24 27.0064C25.0917 27.0064 26.1702 26.7677 27.16 26.3071C28.1498 25.8465 29.027 25.1752 29.73 24.34C29.0277 23.5036 28.1508 22.8312 27.1609 22.3699C26.171 21.9087 25.0921 21.6697 24 21.67Z"
                      fill="url(#paint5_linear_2422_3584)"
                    />
                    <path
                      d="M24 21.67C23.054 21.6729 22.1173 21.8562 21.24 22.21C21.472 22.7482 21.8565 23.2067 22.3461 23.5288C22.8357 23.8509 23.4089 24.0226 23.995 24.0226C24.5811 24.0226 25.1543 23.8509 25.6439 23.5288C26.1335 23.2067 26.518 22.7482 26.75 22.21C25.8758 21.8574 24.9426 21.6742 24 21.67Z"
                      fill="url(#paint6_linear_2422_3584)"
                    />
                    <path
                      d="M24 21.01C25.6569 21.01 27 19.6669 27 18.01C27 16.3532 25.6569 15.01 24 15.01C22.3431 15.01 21 16.3532 21 18.01C21 19.6669 22.3431 21.01 24 21.01Z"
                      fill="url(#paint7_linear_2422_3584)"
                    />
                    <path
                      d="M30.8901 31.5H17.3601C17.1612 31.5 16.9704 31.421 16.8298 31.2803C16.6891 31.1397 16.6101 30.9489 16.6101 30.75C16.6101 30.5511 16.6891 30.3603 16.8298 30.2197C16.9704 30.079 17.1612 30 17.3601 30H30.8901C31.089 30 31.2798 30.079 31.4204 30.2197C31.5611 30.3603 31.6401 30.5511 31.6401 30.75C31.6401 30.9489 31.5611 31.1397 31.4204 31.2803C31.2798 31.421 31.089 31.5 30.8901 31.5Z"
                      fill="url(#paint8_linear_2422_3584)"
                    />
                    <path
                      d="M23.3301 36H17.3301C17.1312 36 16.9404 35.921 16.7997 35.7803C16.6591 35.6397 16.5801 35.4489 16.5801 35.25C16.5801 35.0511 16.6591 34.8603 16.7997 34.7197C16.9404 34.579 17.1312 34.5 17.3301 34.5H23.3301C23.529 34.5 23.7198 34.579 23.8604 34.7197C24.0011 34.8603 24.0801 35.0511 24.0801 35.25C24.0801 35.4489 24.0011 35.6397 23.8604 35.7803C23.7198 35.921 23.529 36 23.3301 36Z"
                      fill="url(#paint9_linear_2422_3584)"
                    />
                    <path
                      d="M30.8601 36C30.6612 36 30.4704 35.921 30.3298 35.7803C30.1891 35.6397 30.1101 35.4489 30.1101 35.25C30.1101 35.0511 30.1891 34.8603 30.3298 34.7197C30.4704 34.579 30.6612 34.5 30.8601 34.5C31.059 34.5 31.2498 34.579 31.3904 34.7197C31.5311 34.8603 31.6101 35.0511 31.6101 35.25C31.6101 35.4489 31.5311 35.6397 31.3904 35.7803C31.2498 35.921 31.059 36 30.8601 36Z"
                      fill="url(#paint10_linear_2422_3584)"
                    />
                    <path
                      d="M27.1101 36C26.9112 36 26.7204 35.921 26.5798 35.7803C26.4391 35.6397 26.3601 35.4489 26.3601 35.25C26.3601 35.0511 26.4391 34.8603 26.5798 34.7197C26.7204 34.579 26.9112 34.5 27.1101 34.5C27.309 34.5 27.4998 34.579 27.6404 34.7197C27.7811 34.8603 27.8601 35.0511 27.8601 35.25C27.8601 35.4489 27.7811 35.6397 27.6404 35.7803C27.4998 35.921 27.309 36 27.1101 36Z"
                      fill="url(#paint11_linear_2422_3584)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2422_3584"
                        x1="24"
                        y1="49.67"
                        x2="24"
                        y2="-19.53"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#273A9B" />
                        <stop offset="0.56" stop-color="#202F65" />
                        <stop offset="1" stop-color="#021E2F" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_2422_3584"
                        x1="24"
                        y1="50"
                        x2="24"
                        y2="-7.99999"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#27E9DE" />
                        <stop offset="0.52" stop-color="#03A4EC" />
                        <stop offset="1" stop-color="#2547A8" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_2422_3584"
                        x1="-3.53456e-07"
                        y1="50.44"
                        x2="24"
                        y2="10.74"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#27E9DE" />
                        <stop offset="0.52" stop-color="#03A4EC" />
                        <stop offset="1" stop-color="#2547A8" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_2422_3584"
                        x1="-2.67491e-07"
                        y1="18.71"
                        x2="24"
                        y2="5.60001"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#27E9DE" />
                        <stop offset="0.52" stop-color="#03A4EC" />
                        <stop offset="1" stop-color="#2547A8" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_2422_3584"
                        x1="24"
                        y1="23.87"
                        x2="24"
                        y2="-6.97999"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="0.52" stop-color="#CCE2E6" />
                        <stop offset="1" stop-color="#8FA1BB" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_2422_3584"
                        x1="24"
                        y1="36.24"
                        x2="24"
                        y2="15.89"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F3C57A" />
                        <stop offset="0.49" stop-color="#F39369" />
                        <stop offset="1" stop-color="#E94867" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_2422_3584"
                        x1="24"
                        y1="37.49"
                        x2="24"
                        y2="17.18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F3C57A" />
                        <stop offset="0.49" stop-color="#F39369" />
                        <stop offset="1" stop-color="#E94867" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_2422_3584"
                        x1="24"
                        y1="30.83"
                        x2="24"
                        y2="12.64"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F3C57A" />
                        <stop offset="0.49" stop-color="#F39369" />
                        <stop offset="1" stop-color="#E94867" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_2422_3584"
                        x1="24.1201"
                        y1="33.19"
                        x2="24.1201"
                        y2="18.17"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="0.52" stop-color="#CCE2E6" />
                        <stop offset="1" stop-color="#8FA1BB" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_2422_3584"
                        x1="20.3401"
                        y1="33.19"
                        x2="20.3401"
                        y2="18.17"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="0.52" stop-color="#CCE2E6" />
                        <stop offset="1" stop-color="#8FA1BB" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_2422_3584"
                        x1="30.8601"
                        y1="33.19"
                        x2="30.8601"
                        y2="18.17"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="0.52" stop-color="#CCE2E6" />
                        <stop offset="1" stop-color="#8FA1BB" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_2422_3584"
                        x1="27.1101"
                        y1="33.19"
                        x2="27.1101"
                        y2="18.17"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="0.52" stop-color="#CCE2E6" />
                        <stop offset="1" stop-color="#8FA1BB" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h2>Teléfono de recuperación</h2>
                  <p className="text-gray-500">
                    Agrega un teléfono de recuperación
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <MdNavigateNext />
              </div>
            </a>
          </div>
        </section>
      </main>
    </LayoutPrincipal>
  );
}

export default Seguridad;
