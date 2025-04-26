import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Program {
  displayName: string;
  photoURL: string;
}

function ProgramPage() {
  const [programData, setProgramData] = useState<Program>();
  let params = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5174/api/program?programName=${params.name}`)
      .then((response) => {
        setProgramData(response.data);
      });
  }, []);
  if (!programData) {
    return <>Loading</>;
  }
  return (
    <>
      <div>
        <h1>{programData.displayName}</h1>
      </div>
    </>
  );
}

export default ProgramPage;
