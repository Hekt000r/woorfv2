import axios from "axios";
import React, { useEffect, useState, Fragment, JSX } from "react";
import { useParams } from "react-router";
import { FaTools, FaWindows } from "react-icons/fa";
import { MdOutlineInstallDesktop } from "react-icons/md";
import { FaRegFileZipper } from "react-icons/fa6";

interface Program {
  _id: string;
  name: string;
  displayName: string;
  photoURL: string;
  downloadLinks: DownloadLink[];
  author: string;
  category: string;
  description: string;
}

interface DownloadLink {
  platform: string;
  downloadURL: string;
  label: string;
  type: string;
}

function ProgramPage() {
  const [programData, setProgramData] = useState<Program>();
  const [groupedLinks, setGroupedLinks] = useState<[string, DownloadLink[]][]>(
    []
  );
  const params = useParams<{ name: string }>();

  const categoryIconMap: Record<string, JSX.Element> = {
    Utilities: <FaTools />,
    // add other categories here
  };

  const downloadTypeIconMap: Record<string, JSX.Element> = {
    Installer: <MdOutlineInstallDesktop className="w-6 h-6" />,
    Portable: <FaRegFileZipper className="w-6 h-6" />,
  };

  useEffect(() => {
    axios
      .get<Program>(
        `http://localhost:5174/api/program?programName=${params.name}`
      )
      .then((response) => {
        setProgramData(response.data);
        // 1. Group by platform
        const grouped = response.data.downloadLinks.reduce((acc, link) => {
          const key = link.platform;
          if (!acc[key]) acc[key] = [];
          acc[key].push(link);
          return acc;
        }, {} as Record<string, DownloadLink[]>);
        // 2. Convert to [platform, links[]] pairs
        setGroupedLinks(Object.entries(grouped));
      })
      .catch(console.error);
  }, [params.name]);

  if (!programData) {
    return <>Loading…</>;
  }

  const tabGroupName = `tabs_${programData._id}`;

  return (
    <div className="flex relative justify-center mt-4">
      <div className="shadow-2xl w-[65%] h-[600px] rounded-xl">
        <div className="m-8 flex">
          <img
            src={programData.photoURL}
            alt="Program icon"
            className="w-36 shadow-2xl p-4 rounded-2xl"
          />
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

        <div>
          <p className="text-montserrat text-lg p-2 ml-4 mr-4">
            {programData.description}
          </p>
        </div>

        <div className="absolute bottom-0">
          <h2 className="text-montserrat font-medium text-2xl mb-2 ml-2">
            Download {programData.displayName}
          </h2>
          <div className="tabs tabs-lift max-w-[90%] ">
            {groupedLinks.map(([platform, links], idx) => (
              <Fragment key={platform}>
                {/* Radio input */}
                <input
                  type="radio"
                  name={tabGroupName}
                  id={`${tabGroupName}_${platform}`}
                  className="tab"
                  defaultChecked={idx === 0}
                  aria-label={platform}
                />

                {/* Tab content with 2-per-row grid */}
                <div className="tab-content bg-base-100 border-base-300 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {links.map((link) => (
                      <a
                        key={link.downloadURL}
                        href={link.downloadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                      inline-flex items-center space-x-2
                      w-full p-2 btn shadow-2xl
                      text-lg font-normal text-montserrat
                      rounded-xl bg-zinc-300
                    "
                      >
                        {downloadTypeIconMap[link.type]}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramPage;
