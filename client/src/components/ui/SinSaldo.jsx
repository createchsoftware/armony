import { IoIosWarning } from "react-icons/io";

const Eliminar = () => {

    const handleClose = () => {
        console.log("Cerrar");
    }

    return (
        <div className="rounded-md bg-white ring-4 ring-[#E40000]">
            <div className="grid my-2 place-content-center">
                <IoIosWarning style={{ fontSize: "52px", color: "#E40000" }} />
            </div>
            <p className="my-2 text-2xl text-center">¡Advertencia!</p>
            <p className="mx-4 my-2 text-lg text-center">
                No tienes suficiente saldo en el monedero.
            </p>
            <div className="grid grid-cols-[30%_30%] place-content-center my-4">
                <button onClick={() => handleClose()} className="w-[4rem] mx-auto text-white bg-[#E40000] hover:bg-[#BC0000] rounded-sm">
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default Eliminar;
