import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { ServicioPaquetes } from "../../services/ServicioPaquetes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  deportistaId: string;
  deportistaNombre: string;
  onPagoRegistrado: () => void;
};

function RegistrarPago(props: Props) {
  const [cantidadClases, setCantidadClases] = useState(4);
  const [fechaPago, setFechaPago] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [guardando, setGuardando] = useState(false);
  const toast = useToast();

  const handleGuardar = async () => {
    if (!fechaPago) {
      toast({
        title: "Fecha requerida",
        description: "Por favor selecciona la fecha del pago.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setGuardando(true);
    try {
      await ServicioPaquetes.getInstancia().crearPaquete({
        deportista: { id: props.deportistaId, nombre: props.deportistaNombre },
        totalClases: cantidadClases,
        fechaPago,
      });

      toast({
        title: "Pago registrado",
        description: `Se registraron ${cantidadClases} clases para ${props.deportistaNombre}.`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      props.onPagoRegistrado();
      props.onClose();
      setCantidadClases(4);
    } catch {
      toast({
        title: "Error al registrar",
        description: "No se pudo conectar con el servidor. Intenta de nuevo.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl" overflow="hidden">
        <Box bgGradient="linear(to-r, #E91E8C, #C2185B)" px={6} py={4}>
          <ModalHeader
            fontSize="lg"
            fontWeight="bold"
            color="white"
            p={0}
            fontFamily="'Fredoka One', cursive"
          >
            💳 Registrar Pago de Clases
          </ModalHeader>
          <ModalCloseButton color="white" top={4} right={4} />
        </Box>

        <ModalBody pt={5} pb={2}>
          <Text mb={4} color="gray.600">
            Deportista:{" "}
            <Text as="span" fontWeight="bold" color="#E91E8C">
              {props.deportistaNombre}
            </Text>
          </Text>

          <FormControl mb={4}>
            <FormLabel fontWeight="semibold">Cantidad de clases</FormLabel>
            <NumberInput
              min={1}
              max={100}
              value={cantidadClases}
              onChange={(_, val) => setCantidadClases(isNaN(val) ? 4 : val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="semibold">Fecha del pago</FormLabel>
            <Input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button variant="outline" onClick={props.onClose}>
            Cancelar
          </Button>
          <Button
            bgGradient="linear(to-r, #E91E8C, #C2185B)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, #C2185B, #AD1457)" }}
            onClick={handleGuardar}
            isLoading={guardando}
            leftIcon={<FaSave />}
          >
            Registrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegistrarPago;
