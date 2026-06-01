import { Heading, Center } from "@chakra-ui/react";
import { useState } from "react";
import VerCursos from "./VerCursos";
import EditarCursos from "./EditarCursos";
import { ServicioCursos } from "../../services/ServicioCursos";
import { Curso } from "../../models/Curso";

type Props = { titulo: string };

function GestionCursos(props: Props) {
  const [isSubmitting] = useState(false);
  const [isNewElement, setIsNewElement] = useState(false);
  const [cursoEditar, setCursoEditar] = useState<Curso | null>(null);

  const servicioCursos = ServicioCursos.getInstancia();

  function handleEdit(curso: Curso) {
    setCursoEditar(curso);
    setIsNewElement(true);
  }

  function handleCloseForm(_val: boolean) {
    setCursoEditar(null);
    setIsNewElement(false);
  }

  return (
    <>
      <Center p="4">
        <Heading size="lg" textAlign="center">
          {props.titulo}
        </Heading>
      </Center>
      {!isNewElement ? (
        <VerCursos
          isSubmitting={isSubmitting}
          setIsNewElement={setIsNewElement}
          servicioCursos={servicioCursos}
          onEdit={handleEdit}
        />
      ) : (
        <EditarCursos
          isSubmitting={isSubmitting}
          setIsNewElement={handleCloseForm}
          servicioCursos={servicioCursos}
          cursoEditar={cursoEditar}
        />
      )}
    </>
  );
}

export default GestionCursos;
