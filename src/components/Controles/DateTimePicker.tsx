import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";

type Props = {
  fechaNacimiento: Date;
  setFechaNacimiento: (fechaNacimiento: Date) => void;
  isRequired: boolean;
  label: string;
};

// Definir la interfaz para los props del componente CustomInput fuera del componente
interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

// Extraer componente de entrada personalizado para evitar advertencias de ESLint
const CustomInput = React.forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <Box
      as="button"
      height="40px"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Box>
  ),
);

function DateTimePicker(props: Props) {
  return (
    <>
      <FormControl isRequired={props.isRequired}>
        <FormLabel>{props.label}</FormLabel>
        <Box display="flex">
          <DatePicker
            selected={props.fechaNacimiento}
            onChange={(date: Date | null) => {
              if (date !== null) {
                props.setFechaNacimiento(date);
              }
            }}
            locale="es"
            dateFormat="dd/MM/yyyy"
            customInput={<CustomInput />}
            popperPlacement="right-start" // Posiciona el selector de fechas a la derecha del input
            showMonthDropdown // Mostrar dropdown para seleccionar el mes
            showYearDropdown // Mostrar dropdown para seleccionar el año
            dropdownMode="select" // Usar select en vez de scroll para el dropdown
          />
        </Box>
      </FormControl>
    </>
  );
}

export default DateTimePicker;
