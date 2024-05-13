var numTicket = 123456;

const TicketServicio = () => {
  return (
    <>
      <div className="grid">
        <h1 className="justify-self-center text-2xl px-8  border-b-2 border-b-[#ec5766] font-bold mb-10">
          Ticket
        </h1>
        <div className="flex justify-between mx-16">
          <div className="rounded-xl shadow-md w-[45%] border-2 border-gray">
            <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Ticket #{numTicket}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketServicio;
