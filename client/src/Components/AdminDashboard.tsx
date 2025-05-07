/* Imports */
import { ChangeEvent, FormEvent, useState } from "react";
import WoorfLogo from "../assets/woorf-logo.svg?react";

const passkey = import.meta.env.VITE_ADMIN_PASSKEY;

export const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPass(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (inputPass === passkey) {
      alert("correct");
      setAuthenticated(true);
    } else {
      alert(`wrong: ${inputPass} and ${passkey}`);
    }
  };
  return (
    <>
      {authenticated ? (
        <>Woorf Admin Panel</>
      ) : (
        <div className="flex items-center justify-center">
          <div className="shadow-lg w-[40%] h-[30%] flex flex-col items-center p-2 m-2 rounded-3xl justify-center">
            <WoorfLogo></WoorfLogo>
            <h1>To access this page, you must be authenticated.</h1>
            <label htmlFor="passkey">Enter passkey</label>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="flex flex-col items-center justify-center"
            >
              {" "}
              <input
                id="passkey"
                name="passkey"
                type="password"
                className="input"
                onChange={(e) => {
                  handleChange(e);
                }}
              />{" "}
              <button className="btn btn-primary">Submit</button>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};
