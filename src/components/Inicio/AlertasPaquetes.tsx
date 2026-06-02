import {
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { PaqueteClases } from "../../models/PaqueteClases";
import { ServicioPaquetes } from "../../services/ServicioPaquetes";

function AlertasPaquetes() {
  const [agotados, setAgotados] = useState<PaqueteClases[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgotados = async () => {
      const data = await ServicioPaquetes.getInstancia().obtenerDeportistasAgotados();
      setAgotados(data);
      setLoading(false);
    };
    fetchAgotados();
  }, []);

  if (loading) {
    return <Spinner size="sm" color="red.400" />;
  }

  if (agotados.length === 0) {
    return (
      <HStack color="green.500" spacing={2} mt={2}>
        <Icon as={FaCheckCircle} />
        <Text fontSize="sm">Todos los deportistas tienen clases disponibles</Text>
      </HStack>
    );
  }

  return (
    <VStack align="stretch" spacing={2} mt={2}>
      {agotados.map((paquete) => {
        const sinPaquete = paquete.totalClases === 0;
        return (
          <Box
            key={paquete.deportista.id}
            bg={sinPaquete ? "orange.50" : "red.50"}
            border="1px solid"
            borderColor={sinPaquete ? "orange.200" : "red.200"}
            borderRadius="lg"
            px={4}
            py={2}
          >
            <HStack justify="space-between">
              <HStack spacing={2}>
                <Icon
                  as={FaExclamationTriangle}
                  color={sinPaquete ? "orange.400" : "red.400"}
                />
                <Text fontWeight="semibold" fontSize="sm">
                  {paquete.deportista.nombre}
                </Text>
              </HStack>
              <Badge
                colorScheme={sinPaquete ? "orange" : "red"}
                borderRadius="full"
                px={2}
              >
                {sinPaquete ? "Sin paquete" : "Sin clases"}
              </Badge>
            </HStack>
          </Box>
        );
      })}
    </VStack>
  );
}

export default AlertasPaquetes;
