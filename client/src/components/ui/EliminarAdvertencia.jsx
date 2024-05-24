import { IoIosWarning } from "react-icons/io";

const Eliminar = () => {
  return (
    <div className="rounded-md bg-white ring-4 ring-[#E40000]">
      <div className="grid place-content-center my-2">
        <IoIosWarning style={{ fontSize: "52px", color: "#E40000" }} />
      </div>
      <p className="text-2xl text-center my-2">¡Advertencia!</p>
      <p className="text-lg text-center my-2 mx-4">
        ¿Está seguro que desea eliminar este producto?
      </p>
      <div className="grid grid-cols-[30%_30%] place-content-center my-4">
        <button className="w-[4rem] mx-auto text-white bg-[#E40000] hover:bg-[#BC0000] rounded-sm">
          Sí
        </button>
        <button className="w-[4rem] mx-auto bg-white text-[#E40000] ring-2 ring-[#E40000] hover:bg-[#F2F2F2] hover:text-[#BC0000] hover:ring-[#BC0000] rounded-sm">
          No
        </button>
      </div>
    </div>
  );
};

export default Eliminar;
