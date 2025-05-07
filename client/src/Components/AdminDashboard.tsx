/* Imports */
import { ChangeEvent, FormEvent, useState } from "react";
import WoorfLogo from "../assets/woorf-logo.svg?react";

const passkey = import.meta.env.VITE_ADMIN_PASSKEY;

export const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState("");

  /* Download Data */
  const [progName, setProgName] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("");
  const [label, setLabel] = useState("");

  const handleDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    data: string
  ) => {
    const val = e.target.value;
    switch (data) {
      case "progName":
        setProgName(val);
        break;
      case "downloadURL":
        setDownloadURL(val);
        break;
      case "platform":
        setPlatform(val);
        break;
      case "type":
        setType(val);
        break;
      case "label":
        setLabel(val);
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPass(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputPass === passkey) {
      setAuthenticated(true);
    } else {
      alert(`Wrong passkey`);
    }
  };

  return (
    <>
      {authenticated ? (
        <div>
          <h1 className="ml-4 mt-4">Woorf Admin Panel</h1>
          <div className="shadow-lg m-8 p-8 space-y-4">
            <h2 className="text-xl font-semibold">Add download data</h2>

            <input
              type="text"
              placeholder="Program Name"
              className="input max-w-sm"
              value={progName}
              onChange={(e) => handleDataChange(e, "progName")}
            />

            <input
              type="text"
              placeholder="Label"
              className="input max-w-sm"
              value={label}
              onChange={(e) => handleDataChange(e, "label")}
            />

            <input
              type="text"
              placeholder="Download URL"
              className="input w-full"
              value={downloadURL}
              onChange={(e) => handleDataChange(e, "downloadURL")}
            />

            <div className="form-control max-w-xs">
              <label className="label">
                <span className="label-text">Platform</span>
              </label>
              <select
                className="select select-bordered"
                value={platform}
                onChange={(e) => handleDataChange(e, "platform")}
              >
                <option value="">Select platform</option>
                <option value="Windows">Windows</option>
                <option value="Linux">Linux</option>
                <option value="MacOS">MacOS</option>
              </select>
            </div>

            <div className="form-control max-w-xs">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                className="select select-bordered"
                value={type}
                onChange={(e) => handleDataChange(e, "type")}
              >
                <option value="">Select type</option>
                <option value="Installer">Installer</option>
                <option value="Portable">Portable</option>
              </select>
            </div>

            <h2 className="text-xl font-semibold">Data preview</h2>
            <p>
              <strong>Program Name:</strong> {progName} <br />
              <strong>Label:</strong> {label} <br />
              <strong>Download URL:</strong> {downloadURL} <br />
              <strong>Platform:</strong> {platform || "—"} <br />
              <strong>Type:</strong> {type || "—"} <br />
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-12 ">
          <div className="shadow-lg w-96 p-6 rounded-2xl flex flex-col items-center space-y-4">
            <WoorfLogo />
            <h2>Authenticate to access admin panel</h2>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col space-y-2"
            >
              <input
                id="passkey"
                name="passkey"
                type="password"
                placeholder="Enter passkey"
                className="input w-full"
                onChange={handleChange}
                value={inputPass}
              />
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
