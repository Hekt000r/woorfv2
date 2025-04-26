import axios from "axios";
import { JSX, use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaTools } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
interface Program {
  _id: string;
  name: string;
  displayName: string;
  photoURL: string;
  downloadLinks: DownloadLink[];
  author: string;
  category: string;
}

interface DownloadLink {
  platform: string;
  downloadURL: string;
  label: string;
}

function ProgramPage() {
  const [programData, setProgramData] = useState<Program>();
  const [downloadLinks, setDownloadLinks] = useState<DownloadLink[]>([]);
  const params = useParams<{ name: string }>();

  const categoryIconMap: Record<string, JSX.Element> = {
    Utilities: <FaTools />,
  };
  const platformIconMap: Record<string, JSX.Element> = {
    Windows: <FaWindows className="w-6 h-6" />,
  };

  useEffect(() => {
    axios
      .get<Program>(
        `http://localhost:5174/api/program?programName=${params.name}`
      )
      .then((response) => {
        setProgramData(response.data);

        // Now that Program.downloadLinks is DownloadLink[],
        // you can just do:
        setDownloadLinks(response.data.downloadLinks);
      });
  }, []);

  if (!programData) {
    return <>Loading</>;
  }

  const tabGroupName = `tabs_${programData._id}`;

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
            <p className="bg-base-300 pr-1.5 pl-1.5 pt-0.5 pb-0.5 mt-1 rounded-xl w-fit">
              <span className="inline-flex items-center space-x-2 whitespace-nowrap">
                {categoryIconMap[programData.category]}
                <span>{programData.category}</span>
              </span>
            </p>
          </div>
        </div>
        <div className="tabs tabs-lift">
          {downloadLinks.map((link, idx) => (
            <>
              {/* Radio input */}
              <input
                type="radio"
                name={tabGroupName}
                id={`${tabGroupName}_tab_${idx}`}
                className="tab"
                defaultChecked={idx === 0}
                aria-label={link.platform}
              />
              {/* Content for this tab */}
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <a
                  href={link.downloadURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                      inline-flex items-center space-x-2
                      w-fit p-2 btn shadow-2xl
                      text-lg font-normal text-montserrat
                      rounded-xl bg-zinc-300
                    "
                >
                  {platformIconMap[link.platform] || null}
                  <span>{link.label}</span>
                </a>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgramPage;
