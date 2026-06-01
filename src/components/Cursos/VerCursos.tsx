import {
  TableContainer,
  Table,
  Th,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Box,
  Text,
  HStack,
  Badge,
  Icon,
  Center,
} from "@chakra-ui/react";
import { ServicioCursos } from "../../services/ServicioCursos";
import { useEffect, useState, useRef } from "react";
import { Curso } from "../../models/Curso";
import { FaTrashAlt, FaPlus, FaEdit, FaBook } from "react-icons/fa";

type Props = {
  isSubmitting: boolean;
  setIsNewElement: (element: boolean) => void;
  servicioCursos: ServicioCursos;
  onEdit: (curso: Curso) => void;
};

function VerCursos(props: Props) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoAEliminar, setCursoAEliminar] = useState<Curso | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await props.servicioCursos.obtenerCursos();
        setCursos(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  const confirmarEliminar = (curso: Curso) => {
    setCursoAEliminar(curso);
    onOpen();
  };

  const handleEliminar = async () => {
    if (!cursoAEliminar) return;
    try {
      await props.servicioCursos.eliminarCurso(cursoAEliminar.idCurso);
      setCursos((prev) => prev.filter((c) => c.idCurso !== cursoAEliminar.idCurso));
      toast({
        title: "Curso eliminado",
        description: `"${cursoAEliminar.nombre}" fue eliminado correctamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el curso. Intenta de nuevo.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      onClose();
      setCursoAEliminar(null);
    }
  };

  const sexoBadgeColor = (sexo: string) => {
    if (sexo === "Femenino") return "pink";
    if (sexo === "Masculino") return "blue";
    return "purple";
  };

  const formatDuracion = (horas: string, minutos: string) => {
    const h = Number(horas);
    const m = Number(minutos);
    const partes = [];
    if (h > 0) partes.push(`${h}h`);
    if (m > 0) partes.push(`${m}min`);
    return partes.length > 0 ? partes.join(" ") : "—";
  };

  return (
    <Box m={4}>
      {/* Botón agregar */}
      <Button
        mb={5}
        bgGradient="linear(to-r, #E91E8C, #C2185B)"
        color="white"
        _hover={{
          bgGradient: "linear(to-r, #C2185B, #E91E8C)",
          transform: "translateY(-1px)",
          boxShadow: "0 6px 16px rgba(233,30,140,0.45)",
        }}
        _active={{ transform: "translateY(0)" }}
        leftIcon={<FaPlus />}
        boxShadow="0 4px 12px rgba(233,30,140,0.35)"
        fontFamily="'Fredoka One', cursive"
        onClick={() => props.setIsNewElement(true)}
      >
        Agregar Nuevo
      </Button>

      {/* Empty state */}
      {cursos.length === 0 ? (
        <Center flexDir="column" py={16} color="gray.400">
          <Icon as={FaBook} boxSize={12} mb={4} color="#F48FB1" />
          <Text fontSize="lg" fontWeight="bold" color="gray.500">
            No hay cursos registrados
          </Text>
          <Text fontSize="sm" color="gray.400">
            Haz clic en "Agregar Nuevo" para comenzar
          </Text>
        </Center>
      ) : (
        <Box
          borderRadius="xl"
          overflow="hidden"
          border="1px solid"
          borderColor="#F48FB1"
          boxShadow="0 2px 16px rgba(233,30,140,0.10)"
        >
          <TableContainer>
            <Table size="sm" variant="unstyled">
              <Thead>
                <Tr bgGradient="linear(to-r, #E91E8C, #29B6F6)">
                  {[
                    "Nombre",
                    "Sexo",
                    "Clasificación",
                    "Edad Inicial",
                    "Duración Clase",
                    "Color",
                    "Acciones",
                  ].map((col) => (
                    <Th
                      key={col}
                      color="white"
                      py={3}
                      px={4}
                      fontFamily="'Fredoka One', cursive"
                      fontSize="sm"
                      textTransform="none"
                      letterSpacing="0.5px"
                    >
                      {col}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {cursos.map((curso, idx) => (
                  <Tr
                    key={curso.idCurso}
                    bg={idx % 2 === 0 ? "white" : "#FFF5FA"}
                    _hover={{ bg: "#FFE4F3", transition: "background 0.15s" }}
                    borderBottom="1px solid"
                    borderColor="#F8D7EA"
                  >
                    <Td px={4} py={3} fontWeight="600" color="gray.700">
                      {curso.nombre}
                    </Td>
                    <Td px={4} py={3} textAlign="center">
                      <Badge
                        colorScheme={sexoBadgeColor(curso.sexo)}
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {curso.sexo}
                      </Badge>
                    </Td>
                    <Td px={4} py={3} textAlign="center" color="gray.600">
                      {curso.clasificacionEdad || "—"}
                    </Td>
                    <Td px={4} py={3} textAlign="center" color="gray.600">
                      {curso.edad || "—"}
                    </Td>
                    <Td px={4} py={3} textAlign="center" color="gray.600">
                      {formatDuracion(curso.duracionClaseHoras, curso.duracionClaseMinutos)}
                    </Td>
                    <Td px={4} py={3} textAlign="center">
                      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                        <Box
                          bg={curso.color}
                          borderRadius="full"
                          width="28px"
                          height="28px"
                          border="2px solid"
                          borderColor="#F48FB1"
                          boxShadow="0 1px 4px rgba(0,0,0,0.18)"
                          flexShrink={0}
                        />
                        <Text fontSize="xs" color="gray.500" fontFamily="mono">
                          {curso.color}
                        </Text>
                      </Box>
                    </Td>
                    <Td px={4} py={3} textAlign="center">
                      <HStack spacing={2} justify="center">
                        <Button
                          size="sm"
                          colorScheme="cyan"
                          variant="outline"
                          leftIcon={<FaEdit />}
                          borderColor="#29B6F6"
                          color="#0288D1"
                          _hover={{ bg: "#E1F5FE" }}
                          onClick={() => props.onEdit(curso)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          leftIcon={<FaTrashAlt />}
                          onClick={() => confirmarEliminar(curso)}
                        >
                          Eliminar
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* AlertDialog confirmación eliminar */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="xl" overflow="hidden">
            <Box bgGradient="linear(to-r, #E91E8C, #C2185B)" px={6} py={4}>
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                color="white"
                p={0}
                fontFamily="'Fredoka One', cursive"
              >
                🗑️ Eliminar Curso
              </AlertDialogHeader>
            </Box>
            <AlertDialogBody pt={5}>
              ¿Estás seguro que deseas eliminar el curso{" "}
              <Text as="span" fontWeight="bold" color="#E91E8C">
                "{cursoAEliminar?.nombre}"
              </Text>
              ?{" "}
              <Text as="span" color="gray.500">
                Esta acción no se puede deshacer.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button ref={cancelRef} variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handleEliminar}
                leftIcon={<FaTrashAlt />}
              >
                Sí, eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default VerCursos;
