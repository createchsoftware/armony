import { Helmet, HelmetProvider } from "react-helmet-async";
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { useEffect, useState } from "react"; // Solo necesitas esta línea de importación
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCirclePlus , faCircleExclamation, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import EditarTarjeta from "../../components/ui/EditarTarjeta";
import { ToastContainer, toast } from 'react-toastify';

import TarjetasPagoEstatica from "../../components/ui/Tarjeta_de_pago_estaticas";
import { borderColor } from "@mui/system";

function TarjetaNueva() {
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

      setAdd(true);

      if (respuestaJson.logueado != true) {
        window.location.href = "/spa";
      }
    } catch (error) {
      window.location.href = "/spa";
    }
  }

  useEffect(() => checkLogin(), []);

  const [isSelected, setIsSelected] = useState(false);
  const [array, setArray] = useState([]);
  const [add, setAdd] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editar, setEditar] = useState(false);

  const editarTarjeta = (tarjeta) => {
    setAdd(false);
    setSelectedCard(tarjeta);
    setIsSelected(!isSelected);
  };
  const clearSelection = () => {
    setSelectedCard(null);
  };
  const editarPopUp = () => {
    setEditar(!editar);
  };
  const addCard = () => {
    setAdd(true);
    clearSelection();
    setIsSelected(false);
  };

  useEffect(() => {
    fetch("/api/tarjetas/1.5")
      .then((response) => response.json())
      .then((data) => {
        setArray(data.array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  const [ objeto, setObjeto] = useState({
    titular:'',
    numero:'',
    mes:'',
    año:'',
    cvv:'',
    recordar:false,
    principal:true,
    tipo:''
  });

  const [ colores, setColores] = useState({
    titular:'#ccc',
    numero:'#ccc',
    mes:'#ccc',
    año:'#ccc',
    cvv:'#ccc',
    tipo:'#ccc'
  });



  function change(evento){

    let {name, value} = evento.target;


    if(typeof value == 'string'){
      setColores(prevState => ({
        ...prevState,
        [name]: '#ccc'
      }));
    }

    setObjeto(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function llamadaBackend(evento){

    evento.preventDefault();

    const respuesta = await fetch('/api/tarjeta-nueva',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        titular:[objeto.titular,'titular'],
        numero:[objeto.numero,'numero'],
        mes:[objeto.mes,'mes'],
        año:[objeto.año,'año'],
        cvv:[objeto.cvv,'cvv'],
        recordar:[objeto.recordar,'recordar'],
        principal:[objeto.principal,'principal'],
        tipo:[objeto.tipo,'tipo']
      })
    })

    if(!respuesta.ok){
      return;
    }

    const respuestaJson = await respuesta.json();

    if(respuestaJson.campos_faltantes){
      let ar = respuestaJson.campos_faltantes;

      for(let i in ar){
        setColores(prevState => ({
          ...prevState,
          [ar[i]]: 'orange'
        }));
      }

      toast(<div>{`Tienes campos sin contestar`}<FontAwesomeIcon icon={faCircleExclamation} /></div>);

      return;
    }

    if(respuestaJson.incorrectos){
      let ar = respuestaJson.incorrectos;

      for(let i in ar){
        setObjeto(prevState => ({
          ...prevState,
          [ar[i]]: ''
        }));

        setColores(prevState => ({
          ...prevState,
          [ar[i]]: 'red'
        }));

      }

      toast(<div>{`Tienes campos incorrectos`}<FontAwesomeIcon icon={faCircleXmark} /></div>);

      return;
    }

    if(respuestaJson.redirect){
      window.location.href = respuestaJson.redirect;
    }

    if(respuestaJson.fallo){
      console.log("hubo un problema en la insercion de la tarjeta");
      return;
    }

  }
  
  return (
    <>
      <LayoutPrincipal>
        <main className="grid gap-12 my-24">
          <section className="flex rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <a
              href="/perfil/tarjetas"
              className="flex w-max items-center ml-6 text-black relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
              <p className="ml-2">Volver</p>
            </a>
            <div className="flex-glow"></div>
            <h1 className="text-[#056761] text-center font-semibold text-2xl absolute left-1/2 transform -translate-x-1/2">
              Tarjetas
            </h1>
          </section>
          <div className="flex justify-between mx-28">
            <div className="grid w-[40%] rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-min">
              {array.length === 0 ? (
                <p className="m-auto my-4">No hay tarjetas registradas.</p>
              ) : (
                // eslint-disable-next-line react/jsx-key
                array.map((objeto, index) => (
                  <TarjetasPagoEstatica
                    tarjetas={objeto}
                    isFirst={index === 0}
                    show={editarTarjeta}
                    clearSelection={clearSelection}
                  />
                ))
              )}
              {array.length === 0 && <hr />}
              <div className="grid justify-center">
                <button
                  onClick={addCard}
                  className="flex gap-2 items-center text-2xl w-max my-4 relative before:bg-[#056761] before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
                >
                  <p className="text-[#056761]">Agregar tarjeta</p>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="text-[#056761]"
                  />
                </button>
              </div>
            </div>
            {add ? (
              <form
                action=""
                className="grid gap-2 w-[55%] rounded-2xl p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                <button
                  onClick={() => setAdd(false)}
                  className="flex w-max items-center ml-6 text-black relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold"
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                  <p className="ml-2">Volver</p>
                </button>
                <div className="px-10">
                  <div className="grid">
                    <p>Tipo de tarjeta</p>
                    <div className="flex">
                      {/* VISA */}
                      <svg
                        className="w-12 mr-4"
                        viewBox="0 -140 780 780"
                        enableBackground="new 0 0 780 500"
                        version="1.1"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M40,0h700c22.092,0,40,17.909,40,40v420c0,22.092-17.908,40-40,40H40c-22.091,0-40-17.908-40-40V40 C0,17.909,17.909,0,40,0z"
                            fill="#0E4595"
                          ></path>
                          <path
                            d="m293.2 348.73l33.361-195.76h53.36l-33.385 195.76h-53.336zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-0.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-0.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882 0.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-0.27 30.09 3.535 39.938 7.5l4.781 2.26 7.232-42.429m137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555 0.084 68.338 0.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-0.316 0.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528h-44.293zm-363.3-126.41l-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-0.064 84.004-195.39h-56.521"
                            fill="#ffffff"
                          ></path>
                          <path
                            d="m146.92 152.96h-86.041l-0.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527"
                            fill="#F2AE14"
                          ></path>
                        </g>
                      </svg>
                      {/* MASTER CARD */}
                      <svg
                        className="w-12 mr-4"
                        viewBox="0 -54.25 482.51 482.51"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>mastercard</title>{" "}
                          <g>
                            <path
                              d="M220.13,421.67V396.82c0-9.53-5.8-15.74-15.32-15.74-5,0-10.35,1.66-14.08,7-2.9-4.56-7-7-13.25-7a14.07,14.07,0,0,0-12,5.8v-5h-7.87v39.76h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78Zm129.22-39.35h-14.5v-12H327v12h-8.28v7H327V408c0,9.11,3.31,14.5,13.25,14.5A23.17,23.17,0,0,0,351,419.6l-2.49-7a13.63,13.63,0,0,1-7.46,2.07c-4.14,0-6.21-2.49-6.21-6.63V389h14.5v-6.63Zm73.72-1.24a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76h7.87V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-111.41,4.14c-4.14-2.9-9.94-4.14-16.15-4.14-9.94,0-16.15,4.56-16.15,12.43,0,6.63,4.56,10.35,13.25,11.6l4.14.41c4.56.83,7.46,2.49,7.46,4.56,0,2.9-3.31,5-9.53,5a21.84,21.84,0,0,1-13.25-4.14l-4.14,6.21c5.8,4.14,12.84,5,17,5,11.6,0,17.81-5.38,17.81-12.84,0-7-5-10.35-13.67-11.6l-4.14-.41c-3.73-.41-7-1.66-7-4.14,0-2.9,3.31-5,7.87-5,5,0,9.94,2.07,12.43,3.31Zm120.11,16.57c0,12,7.87,20.71,20.71,20.71,5.8,0,9.94-1.24,14.08-4.56l-4.14-6.21a16.74,16.74,0,0,1-10.35,3.73c-7,0-12.43-5.38-12.43-13.25S445,389,452.07,389a16.74,16.74,0,0,1,10.35,3.73l4.14-6.21c-4.14-3.31-8.28-4.56-14.08-4.56-12.43-.83-20.71,7.87-20.71,19.88h0Zm-55.5-20.71c-11.6,0-19.47,8.28-19.47,20.71s8.28,20.71,20.29,20.71a25.33,25.33,0,0,0,16.15-5.38l-4.14-5.8a19.79,19.79,0,0,1-11.6,4.14c-5.38,0-11.18-3.31-12-10.35h29.41v-3.31c0-12.43-7.46-20.71-18.64-20.71h0Zm-.41,7.46c5.8,0,9.94,3.73,10.35,9.94H364.68c1.24-5.8,5-9.94,11.18-9.94ZM268.59,401.79V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm306.08-20.71a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76H532V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-30.65,20.71V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm111.83,0V366.17h-7.87v20.71c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25C564.73,415.46,560.17,409.25,560.17,401.79Z"
                              transform="translate(-132.74 -48.5)"
                            ></path>
                            <g>
                              {" "}
                              <rect
                                x="169.81"
                                y="31.89"
                                width="143.72"
                                height="234.42"
                                fill="#ff5f00"
                              ></rect>
                              <path
                                d="M317.05,197.6A149.5,149.5,0,0,1,373.79,80.39a149.1,149.1,0,1,0,0,234.42A149.5,149.5,0,0,1,317.05,197.6Z"
                                transform="translate(-132.74 -48.5)"
                                fill="#eb001b"
                              ></path>
                              <path
                                d="M615.26,197.6a148.95,148.95,0,0,1-241,117.21,149.43,149.43,0,0,0,0-234.42,148.95,148.95,0,0,1,241,117.21Z"
                                transform="translate(-132.74 -48.5)"
                                fill="#f79e1b"
                              ></path>{" "}
                            </g>{" "}
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="grid mt-4">
                    <label htmlFor="titular">Titular de la tarjeta</label>
                    <input
                      type="text"
                      id="titular"
                      name="titular"
                      value={objeto.titular}
                      style={{borderColor:colores.titular}}
                      onChange={change}
                      className="grid mt-2 rounded shadow-md"
                    />
                  </div>
                  <div className="grid mt-4">
                    <label htmlFor="">Número de la tarjeta</label>
                    <input
                      type="text"
                      id="numero"
                      maxLength={16}
                      name="numero"
                      value={objeto.numero}
                      style={{borderColor:colores.numero}}
                      onChange={change}
                      className="grid mt-2 rounded shadow-md"
                    />
                  </div>
                  <div className="flex justify-around mt-4">
                    <div className="grid">
                      <label className="text-center">
                        Fecha de vencimiento
                      </label>
                      <div className="flex items-center justify-center mt-2">
                        <input
                          type="text"
                          id="mes"
                          name="mes"
                          maxLength={2}
                          value={objeto.mes}
                          style={{borderColor:colores.mes}}
                          onChange={change}
                          className="w-20 text-center rounded shadow-md"
                        />
                        <h2 className="mx-4 text-xl font-bold text-center">
                          /
                        </h2>
                        <input
                          type="text"
                          id="año"
                          name="año"
                          maxLength={2}
                          value={objeto.año}
                          style={{borderColor:colores.año}}
                          onChange={change}
                          className="w-20 text-center rounded shadow-md"
                        />
                      </div>
                    </div>
                    <div className="grid">
                      <label htmlFor="cvv" className="text-center">
                        Código de seguridad
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={objeto.cvv}
                        style={{borderColor:colores.cvv}}
                        maxLength={3}
                        onChange={change}
                        className="w-20 text-center rounded shadow-md justify-self-center"
                      />
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <label htmlFor="tipo" className="mr-4">
                      Tipo
                    </label>
                    <input
                      type="text"
                      id="tipo"
                      name="tipo"
                      value={objeto.tipo}
                      style={{borderColor:colores.tipo}}
                      onChange={change}
                      placeholder="debito/credito"
                    />
                  </div>

                  <div className="grid mt-4">
                    <div>
                      <input type="checkbox" id="recordar" name="recordar" value={objeto.recordar} onChange={change}/>
                      <label htmlFor="recordar" className="ml-2">
                        Recordar tarjeta
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" id="principal" name="principal" value={objeto.principal} onChange={change}/>
                      <label htmlFor="principal" className="ml-2">
                        Poner como tarjeta principal
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <a
                      href="/perfil/tarjetas"
                      className="bg-[#fccfc6] cursor-pointer justify-self-center mr-4 text-xl text-[#EB5765] px-10 py-2 rounded-full duration-200 hover:font-bold"
                    >
                      Cancelar
                    </a>
                    <button
                      id="add-Tarjeta"
                      onClick={llamadaBackend}
                      className="bg-[#ec5766] cursor-pointer justify-self-center text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]"
                    >
                      Agregar tarjeta
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              ""
            )}
            {isSelected && (
              <div className="flex w-[55%] h-max rounded-2xl p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <img
                  src="../../../pictures/showTarjeta.png"
                  alt={selectedCard.empresa}
                  className="w-[45%] h-min"
                />
                <div className="ml-4 w-full">
                  <div className="flex justify-between mt-1">
                    <h1 className="font-bold text-2xl">
                      {selectedCard.empresa}
                    </h1>
                    <p
                      onClick={editarPopUp}
                      className="py-1 text-[#EB5765] cursor-pointer"
                    >
                      Editar
                    </p>
                  </div>
                  <h1 className="my-4 text-xl">Dirección de la tarjeta</h1>
                  <p>Ejido Puebla, calle 1ra</p>
                  <p>Mexicali, Baja California, 21620</p>
                  <p>México, 6862302208</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </LayoutPrincipal>
      {editar && (
        <div className="overflow-y-auto soon-fondo">
          <div className="overflow-y-auto soon-fx">
            <EditarTarjeta cerrar={editarPopUp} />
          </div>
        </div>
      )}
      <ToastContainer position={'bottom-right'} theme={'light'} />
    </>
  );
}

export default TarjetaNueva;
