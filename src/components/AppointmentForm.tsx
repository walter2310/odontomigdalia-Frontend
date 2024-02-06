import React, { useState, useEffect } from "react";

export function AppointmentForm() {
  type Day = {
    id: number;
    day: string;
  };

  type Hour = {
    start: string;
    end: string;
  };

  const [avaibleDays, setAvaibleDays] = useState<Day[]>([]);
  const [avaibleHours, setAvaibleHours] = useState<Hour[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Realiza una solicitud a la API cuando el componente se monta
    fetch("http://localhost:8080/api/hours/days")
      .then((response) => response.json())
      .then((data) => {
        // Almacena los datos de días disponibles en el estado local del componente
        setAvaibleDays(data.data.payload);
      })
      .catch((error) => {
        console.error(
          "Error al obtener datos de los días disponibles de la API:",
          error
        );
        setErrorMessage(error.message);
      });
  }, []);

  useEffect(() => {
    if (selectedDay !== "") {
      // Realiza una solicitud a la API cuando el día seleccionado cambia
      fetch(`http://localhost:8080/api/hours?day=${selectedDay}`)
        .then((response) => response.json())
        .then((data) => {
          // Almacena los datos de horas disponibles en el estado local del componente
          setAvaibleHours(data.data);
        })
        .catch((error) => {
          console.error(
            "Error al obtener datos de las horas disponibles de la API:",
            error
          );
          setErrorMessage(error.message);
        });
    }
  }, [selectedDay]);

  const handleDaySelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDay(event.target.value);
  };

  const handleServiceSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedService(event.target.value);
  };

  const handleHourSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedHour(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      service: selectedService,
      selectedDay,
      selectedHour,
    };

    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar el formulario");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <div className="flex justify-center -mt-3">
        <img src="logo.png" alt="Logo" className="h-auto max-w-xs block " />
      </div>
      <form action="#" className="flex flex-col items-center -mt-5">
        <div className="flex flex-col">
          <label className="text-xl/8">Nombre</label>
          <input
            id="name"
            className="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px]"
            type="text"
            name="name"
            autoComplete="off"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xl/8">Correo</label>
          <input
            id="email"
            className="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px]"
            type="text"
            name="email"
            autoComplete="off"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        <div className="flex flex-col ml-8">
          <label className="text-xl/8">Servicios</label>
          <div className="inline-block relative w-56">
            <select
              className="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px] block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="service-select"
              onChange={handleServiceSelectChange}
            >
              <option value="">Seleccione un servicio</option>
              <option>Instalación de ortodoncia</option>
              <option>Blanqueamiento dental</option>
              <option>Control de ortodoncia</option>
              <option>Retiro de ortodoncia</option>
              <option>Instalación de retenedores</option>
              <option>Carillas de cera</option>
              <option>Carillas de porcelana</option>
              <option>Consulta diagnostica</option>
              <option>Protesis fija</option>
              <option>Caries dentales</option>
              <option>Tratamiento de conducto</option>
              <option>Limpieza dental</option>
              <option>Tratamiento de bruxismo</option>
              <option>Botox</option>
            </select>
          </div>

          <label className="text-xl/8">Días disponibles</label>
          <div className="inline-block relative w-64">
            <select
              className="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px] block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="day-select"
              onChange={handleDaySelectChange}
              value={selectedDay}
            >
              <option value="">Seleccione un día</option>
              {avaibleDays.map((day: Day) => (
                <option key={day.id} value={day.day}>
                  {day.day}
                </option>
              ))}
            </select>
          </div>

          <label className="text-xl/8">Horas disponibles</label>
          <div className="inline-block relative w-64">
            <select
              className="border border-black/50 shadow-inner shadow-white/20 mb-2 px-2 py-1 rounded-lg lg:w-[230px] block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="hour-select"
              onChange={handleHourSelectChange}
            >
              <option value="">Seleccione una hora</option>
              {avaibleHours.map((hour: Hour, index) => (
                <option key={index}>
                  {hour.start} - {hour.end}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-3 -ml-2">
          <button
            type="button"
            className="bg-[#0c0b46] hover:bg-[#0c0b46]/80 text-white font-bold py-2 px-4 rounded"
            id="escoger-hora"
            onClick={handleSubmit}
          >
            <strong>Agendar cita</strong>
          </button>
        </div>
      </form>
    </>
  );
}
