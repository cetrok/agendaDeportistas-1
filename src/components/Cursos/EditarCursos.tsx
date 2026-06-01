import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Grid,
  GridItem,
  Select,
  NumberInput,
  NumberInputField,
  Box,
  Heading,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Text,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ColorPicker } from "chakra-color-picker";
import { ServicioCursos } from "../../services/ServicioCursos";
import { Curso } from "../../models/Curso";
import { FaRegTimesCircle, FaSave } from "react-icons/fa";

type Props = {
  isSubmitting: boolean;
  setIsNewElement: (element: boolean) => void;
  servicioCursos: ServicioCursos;
  cursoEditar?: Curso | null;
};

function EditarCursos(props: Props) {
  const [nombreCurso, setNombreCurso] = useState("");
  const [sexo, setSexo] = useState("");
  const [clasificacionEdadInicial, setClasificacionEdadInicial] = useState("");
  const [edadInicial, setEdadInicial] = useState("");
  const [nivel, setNivel] = useState("");
  const [subNivel, setSubNivel] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [duracionClaseHoras, setDuracionClaseHoras] = useState("0");
  const [duracionClaseMinutos, setDuracionClaseMinutos] = useState("0");
  const [color, setColor] = useState("#FFFFFF");
  const [opcionesModalidad, setOpcionesModalidad] = useState<
    { id: string; value: string }[]
  >([]);
  const [opcionesEdadInicial, setOpcionesEdadInicial] = useState<
    { id: string; value: string }[]
  >([]);
  const [opcionesCategoria, setOpcionesCategoria] = useState<
    { id: string; value: string }[]
  >([]);
  const [opcionesNivel, setOpcionesNivel] = useState<
    { id: string; value: string }[]
  >([]);
  const [opcionesSubNivel, setOpcionesSubNivel] = useState<
    { id: string; value: string }[]
  >([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const toast = useToast();

  const isEditMode = !!props.cursoEditar;

  const customColors = [
    "#FFFFFF", "#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF",
    "#4B0082", "#EE82EE", "#FF1493", "#00FFFF", "#FF69B4", "#FFD1DC",
    "#AEC6CF", "#77DD77", "#FDFD96", "#CDB4DB", "#FFB347", "#FF6961",
    "#AFEEEE", "#FFDAB9", "#E6E6FA", "#98FF98", "#FF9AA2", "#B2DFEE",
    "#C8A2C8", "#F5F5DC", "#FAFAD2", "#F49AC2", "#A7C7E7", "#FFB6C1",
    "#DFFF00", "#87CEFA", "#C3CDE6", "#FFD1BA", "#D3D3A1", "#D2B48C",
    "#9FA8DA", "#D3AF37", "#D8D8D8", "#DC143C", "#D2691E",
  ];

  // Pre-llenar formulario cuando se edita un curso
  useEffect(() => {
    if (props.cursoEditar) {
      const c = props.cursoEditar;
      setNombreCurso(c.nombre);
      setSexo(c.sexo);
      setDuracionClaseHoras(c.duracionClaseHoras);
      setDuracionClaseMinutos(c.duracionClaseMinutos);
      setColor(c.color);
      // Disparar opciones en cascada
      handlerChangeClasificacionEdadInicial(c.clasificacionEdad);
      setEdadInicial(c.edad);
      if (c.categoria) {
        handleChangeCategoria(c.categoria);
      }
      setModalidad(c.modalidad ?? "");
      setNivel(c.nivel ?? "");
      setSubNivel(c.subNivel ?? "");
    }
  }, [props.cursoEditar?.idCurso]);

  useEffect(() => {
    const isValid =
      nombreCurso !== "" &&
      sexo !== "" &&
      clasificacionEdadInicial !== "" &&
      edadInicial !== "" &&
      (Number(duracionClaseHoras) > 0 || Number(duracionClaseMinutos) > 0) &&
      color !== "";
    setIsFormValid(isValid);
  }, [
    nombreCurso,
    sexo,
    clasificacionEdadInicial,
    edadInicial,
    duracionClaseHoras,
    duracionClaseMinutos,
    color,
  ]);

  const handleClickCancelar = () => {
    props.setIsNewElement(false);
  };

  const handlerChangeClasificacionEdadInicial = (event: string) => {
    setClasificacionEdadInicial(event);

    if (event === "Maternas") {
      setOpcionesEdadInicial([
        { id: "1t", value: "1er Trimestre" },
        { id: "2t", value: "2do Trimestre" },
        { id: "3t", value: "3er Trimestre" },
      ]);
      setOpcionesCategoria([]);
      setOpcionesModalidad([]);
      setOpcionesSubNivel([
        { id: "1", value: "1" },
        { id: "2", value: "2" },
        { id: "3", value: "3" },
      ]);
    } else if (event === "Bebes") {
      setOpcionesEdadInicial([
        { id: "2m", value: "2 meses" },
        { id: "4m", value: "4 meses" },
        { id: "7m", value: "7 meses" },
        { id: "10m", value: "10 meses" },
      ]);
      setOpcionesCategoria([]);
      setOpcionesModalidad([]);
      setOpcionesSubNivel([
        { id: "1", value: "1" },
        { id: "2", value: "2" },
        { id: "3", value: "3" },
        { id: "4", value: "4" },
      ]);
    } else if (event === "Infantes") {
      setOpcionesEdadInicial([
        { id: "13m", value: "13 meses" },
        { id: "19m", value: "19 meses" },
        { id: "25m", value: "25 meses" },
        { id: "31m", value: "31 meses" },
        { id: "37m", value: "37 meses" },
        { id: "43m", value: "43 meses" },
        { id: "49m", value: "49 meses" },
        { id: "55m", value: "55 meses" },
      ]);
      setOpcionesModalidad([]);
      setOpcionesSubNivel([
        { id: "1", value: "1" },
        { id: "2", value: "2" },
      ]);
    } else if (event === "Niños") {
      setOpcionesEdadInicial([
        { id: "4a", value: "4 años" },
        { id: "5a", value: "5 años" },
        { id: "6a", value: "6 años" },
        { id: "7a", value: "7 años" },
        { id: "8a", value: "8 años" },
        { id: "9a", value: "9 años" },
      ]);
      setOpcionesCategoria([
        { id: "BLR", value: "Bailarines" },
        { id: "FIG", value: "FIG" },
        { id: "USAG", value: "USAG" },
      ]);
      setOpcionesSubNivel([]);
    } else if (event === "Adultos") {
      setOpcionesEdadInicial(() => {
        const opciones = [];
        for (let i = 18; i <= 50; i++) {
          opciones.push({ id: i.toString() + "a", value: i.toString() + " años" });
        }
        return opciones;
      });
      setOpcionesModalidad([]);
      setOpcionesCategoria([]);
      setOpcionesNivel([]);
      setOpcionesSubNivel([]);
    }
  };

  const handleChangeCategoria = (event: string) => {
    setCategoria(event);
    if (event === "FIG" || event === "USAG") {
      setOpcionesModalidad([
        { id: "GAF", value: "GAF" },
        { id: "GAM", value: "GAM" },
        { id: "GRD", value: "GRD" },
      ]);
      if (event === "FIG") {
        setOpcionesNivel([
          { id: "TH", value: "Test de Habilidades" },
          { id: "AC1", value: "AC1" },
          { id: "AC2", value: "AC2" },
          { id: "AC3", value: "AC3" },
          { id: "AC4", value: "AC4" },
        ]);
        setOpcionesSubNivel([]);
      } else {
        setOpcionesNivel([
          { id: "TH", value: "Test de Habilidades" },
          { id: "N1", value: "Nivel 1" },
          { id: "N2", value: "Nivel 2" },
          { id: "N3", value: "Nivel 3" },
          { id: "N4", value: "Nivel 4" },
          { id: "N5", value: "Nivel 5" },
          { id: "N6", value: "Nivel 6" },
          { id: "N7", value: "Nivel 7" },
          { id: "N8", value: "Nivel 8" },
          { id: "N9", value: "Nivel 9" },
          { id: "N10", value: "Nivel 10" },
        ]);
        setOpcionesSubNivel([
          { id: "PTS", value: "Principiantes" },
          { id: "INT", value: "Intermedios" },
          { id: "AVZ", value: "Avanzados" },
          { id: "EXP", value: "Expertos" },
        ]);
      }
    } else if (event === "Bailarines") {
      setOpcionesModalidad([
        { id: "IND", value: "Individual" },
        { id: "PAR", value: "Parejas" },
      ]);
      setOpcionesSubNivel([
        { id: "BAS", value: "Básico" },
        { id: "INT", value: "Intermedio" },
        { id: "AVZ", value: "Avanzado" },
      ]);
      setOpcionesNivel([{ id: "acr", value: "Acrobacia" }]);
    } else {
      setOpcionesModalidad([]);
      setOpcionesNivel([]);
    }
  };

  const handleClickGuardar = async () => {
    setGuardando(true);
    try {
      const cursoData = new Curso(
        props.cursoEditar?.idCurso ?? 0,
        nombreCurso,
        sexo,
        clasificacionEdadInicial,
        edadInicial,
        nivel,
        subNivel,
        modalidad,
        categoria,
        duracionClaseHoras,
        duracionClaseMinutos,
        color
      );

      if (isEditMode) {
        await props.servicioCursos.actualizarCurso(cursoData);
        toast({
          title: "Curso actualizado",
          description: `"${nombreCurso}" fue actualizado correctamente.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        await props.servicioCursos.agregarCurso(cursoData);
        toast({
          title: "Curso creado",
          description: `"${nombreCurso}" fue creado correctamente.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      props.setIsNewElement(false);
    } catch (error) {
      console.error("Error al guardar el curso", error);
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar el curso. Intenta de nuevo.",
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
    <Box
      bg="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="#F48FB1"
      boxShadow="0 4px 20px rgba(233,30,140,0.10)"
      m={4}
      overflow="hidden"
    >
      {/* Header del formulario */}
      <Box bgGradient="linear(to-r, #E91E8C, #29B6F6)" px={6} py={4}>
        <Heading size="md" color="white" fontFamily="'Fredoka One', cursive">
          {isEditMode ? "✏️ Editar Curso" : "📚 Nuevo Curso"}
        </Heading>
      </Box>

      <Box p={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {/* Nombre */}
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Nombre Curso</FormLabel>
              <Input
                placeholder="Nombre del Curso"
                value={nombreCurso}
                onChange={(e) => setNombreCurso(e.target.value)}
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              />
            </FormControl>
          </GridItem>

          {/* Sexo */}
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Sexo</FormLabel>
              <Select
                placeholder="Seleccione"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Mixto">Mixto</option>
              </Select>
            </FormControl>
          </GridItem>

          {/* Clasificación Edad */}
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Clasificación Edad</FormLabel>
              <Select
                value={clasificacionEdadInicial}
                onChange={(e) => handlerChangeClasificacionEdadInicial(e.target.value)}
                placeholder="Seleccione"
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              >
                <option value="Maternas">Maternas</option>
                <option value="Bebes">Bebés</option>
                <option value="Infantes">Infantes</option>
                <option value="Niños">Niños</option>
                <option value="Adultos">Adultos</option>
              </Select>
            </FormControl>
          </GridItem>

          {/* Edad Inicial */}
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Edad Inicial</FormLabel>
              <Select
                value={edadInicial}
                onChange={(e) => setEdadInicial(e.target.value)}
                isDisabled={opcionesEdadInicial.length === 0}
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              >
                <option value="">Seleccione</option>
                {opcionesEdadInicial.map((op) => (
                  <option key={op.id} value={op.value}>{op.value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* Categoría */}
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">Categoría</FormLabel>
              {clasificacionEdadInicial === "Adultos" ? (
                <Input
                  placeholder="Categoría"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  borderColor="#F48FB1"
                  focusBorderColor="#E91E8C"
                />
              ) : (
                <Select
                  value={categoria}
                  onChange={(e) => handleChangeCategoria(e.target.value)}
                  isDisabled={opcionesCategoria.length === 0}
                  borderColor="#F48FB1"
                  focusBorderColor="#E91E8C"
                >
                  <option value="">Seleccione</option>
                  {opcionesCategoria.map((op) => (
                    <option key={op.id} value={op.value}>{op.value}</option>
                  ))}
                </Select>
              )}
            </FormControl>
          </GridItem>

          {/* Modalidad */}
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">Modalidad</FormLabel>
              <Select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                isDisabled={opcionesModalidad.length === 0}
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              >
                <option value="">Seleccione</option>
                {opcionesModalidad.map((op) => (
                  <option key={op.id} value={op.value}>{op.value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* Nivel */}
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">Nivel</FormLabel>
              <Select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                isDisabled={opcionesNivel.length === 0}
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              >
                <option value="">Seleccione</option>
                {opcionesNivel.map((op) => (
                  <option key={op.id} value={op.value}>{op.value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* SubNivel */}
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">SubNivel</FormLabel>
              <Select
                value={subNivel}
                onChange={(e) => setSubNivel(e.target.value)}
                isDisabled={opcionesSubNivel.length === 0}
                borderColor="#F48FB1"
                focusBorderColor="#E91E8C"
              >
                <option value="">Seleccione</option>
                {opcionesSubNivel.map((op) => (
                  <option key={op.id} value={op.value}>{op.value}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* Duración Clase */}
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Duración Clase</FormLabel>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>Horas</Text>
                  <NumberInput
                    value={duracionClaseHoras}
                    min={0}
                    max={4}
                    onChange={(value) => setDuracionClaseHoras(value)}
                  >
                    <NumberInputField borderColor="#F48FB1" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1}>Minutos</Text>
                  <NumberInput
                    value={duracionClaseMinutos}
                    min={0}
                    max={30}
                    step={30}
                    onChange={(value) => setDuracionClaseMinutos(value)}
                  >
                    <NumberInputField borderColor="#F48FB1" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </Grid>
            </FormControl>
          </GridItem>

          {/* Color */}
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">Color</FormLabel>
              <Box
                border="2px solid"
                borderColor="#F48FB1"
                borderRadius="md"
                p={1}
                width="52px"
              >
                <ColorPicker
                  defaultColor={color}
                  onChange={setColor}
                  colors={customColors}
                />
              </Box>
              <Text fontSize="xs" color="gray.400" mt={1} fontFamily="mono">
                {color}
              </Text>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Botones */}
        <HStack mt={5} spacing={3}>
          <Button
            variant="outline"
            borderColor="#F48FB1"
            color="#E91E8C"
            _hover={{ bg: "#FFF0F7" }}
            onClick={handleClickCancelar}
            leftIcon={<FaRegTimesCircle />}
          >
            Cancelar
          </Button>
          <Button
            bgGradient={isFormValid ? "linear(to-r, #E91E8C, #C2185B)" : undefined}
            colorScheme={isFormValid ? undefined : "gray"}
            color={isFormValid ? "white" : undefined}
            _hover={
              isFormValid
                ? { bgGradient: "linear(to-r, #C2185B, #E91E8C)" }
                : undefined
            }
            boxShadow={isFormValid ? "0 4px 12px rgba(233,30,140,0.35)" : undefined}
            isLoading={guardando}
            isDisabled={!isFormValid}
            onClick={handleClickGuardar}
            leftIcon={<FaSave />}
          >
            {isEditMode ? "Actualizar" : "Guardar"}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

export default EditarCursos;
