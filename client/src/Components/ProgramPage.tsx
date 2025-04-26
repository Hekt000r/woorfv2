import axios from "axios";
import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaTools } from "react-icons/fa";
interface Program {
  _id: string;
  name: string;
  displayName: string;
  photoURL: string;
  downloadLinks: Record<string, string>;
  author: string;
  category: string;
}

function ProgramPage() {
  const [programData, setProgramData] = useState<Program>();
  const params = useParams<{ name: string }>();

  const categoryIconMap: Record<string, JSX.Element> = {
    Utilities: <FaTools />,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5174/api/program?programName=${params.name}`)
      .then((response) => {
        setProgramData(response.data);
      });
  }, [params.name]);

  if (!programData) {
    return <>Loading</>;
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="shadow-2xl w-[65%] h-[600px] rounded-xl">
        <div className="m-8 flex">
          <img
            src={programData.photoURL}
            alt="Program icon"
            className="w-36 shadow-2xl p-4 rounded-2xl"
          />
          {/* Wrap the text elements in a flex column */}
          <div className="flex flex-col ml-6 mt-4">
            <h1 className="text-montserrat font-medium text-5xl">
              {programData.displayName}
            </h1>

            <p className="text-montserrat inline-flex mt-1 text-xl">
              By {programData.author}
            </p>
            <p className="bg-base-300 p-1.5 mt-1 rounded-xl w-fit">
              <span className="inline-flex items-center space-x-2 whitespace-nowrap">
                {categoryIconMap[programData.category]}
                <span>{programData.category}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramPage;
