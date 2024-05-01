import user1 from "../../../public/pictures/1cafeteria.jpg";
import camara from "../../../public/pictures/2wellness.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    fa1,
    fa2,
    fa3,
    fa4,
    faCircle,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

import LayoutPrincipal from "../../layouts/LayoutPrincipal";

const EditarPerfil = ({ usuario }) => {
    return (
        <LayoutPrincipal>
            <main className="w-[80%] m-auto  flex justify-between mt-20 mb-12">
                <div className="w-2/3 p-8 my-6 shadow-lg rounded-xl">
                    <div className="flex gap-56 my-6">
                        <a href="#" className="">
                            <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faAngleLeft} />{" "}
                            Volver
                        </a>
                        <h1 className="text-3xl text-rose-400">
                            Editar Perfil
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h2>INFORMACION PERSONAL</h2>
                        <h2 className="mr-32">ID DE USUARIO</h2>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="">Nombre:</label>
                            <input
                                id="lastname1"
                                type="text"
                                placeholder="Adolfo"
                                className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                        <input
                            id="lastname1"
                            type="text"
                            placeholder="#12345"
                            className="w-48 px-6 py-2 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Apellido Paterno:</label>
                        <input
                            id="lastname1"
                            type="text"
                            placeholder="Adolfo"
                            className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="">Apellido Materno:</label>
                            <input
                                id="lastname1"
                                type="text"
                                placeholder="Adolfo"
                                className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Telefono:</label>
                            <input
                                id="lastname1"
                                type="tel"
                                placeholder="#12345"
                                className="w-48 px-6 py-2 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <h2>FECHA DE NACIMIENTO</h2>
                    <div className="flex justify-start">
                        <div><label htmlFor="">Dia</label>
                            <input
                                id="lastname1"
                                type="number"
                                min={1}
                                max={31}
                                placeholder="12"
                                className="w-24 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                        <div><label htmlFor="">Mes</label>
                            <input
                                id="lastname1"
                                type="month"
                                placeholder="12"
                                className="w-24 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                        <div><label htmlFor="">Año</label>
                            <input
                                id="lastname1"
                                type="number"
                                placeholder="2024"
                                className="w-24 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <h2>E-MAIL</h2>
                    <input
                        id="lastname1"
                        type="email"
                        placeholder="correo@armony.com"
                        className="px-6 py-2 mb-1 rounded-full w-60 bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                    />
                    <h2>DOMICILIO</h2>
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="">Calle:</label>
                            <input
                                id="lastname1"
                                type="text"
                                placeholder="Eulogio sanchez"
                                className="w-48 px-6 py-2 mb-1 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Colonia:</label>
                            <input
                                id="lastname1"
                                type="tel"
                                placeholder="Valle de puebla"
                                className="w-48 px-6 py-2 mb-1 mr-24 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <label htmlFor="">Codigo Postal:</label>
                    <input
                        id="lastname1"
                        type="text"
                        placeholder="12345"
                        className="w-48 px-6 py-2 mb-1 mr-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 my-6">
                        <div className="grid place-content-start">
                            <button
                                aria-label="Cancelar"
                                className="px-4 py-2 mx-auto text-xl bg-white rounded-full text-rose-400 hover:bg-red-50 ring-2 ring-rose-400"
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="grid place-content-end">
                            <button
                                aria-label="Continuar"
                                className="px-4 py-2 mx-auto text-xl text-white rounded-full bg-rose-400 hover:bg-red-200"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2 text-center place-content-center">
                    <img src={user1} className="w-48 rounded-full shadow-2xl" alt="" />
                    <p>Usuario</p>
                    <p className="px-6 py-2 rounded-full bg-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-transparent"
                    >Usuario 1</p>
                </div>

            </main >
        </LayoutPrincipal >
    );
};

export default EditarPerfil;
