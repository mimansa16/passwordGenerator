import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyColor, setCopyColor] = useState("gray");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&(){}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); //--> for selecting a random character(or number or anything) from str
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numAllowed, charAllowed, length, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();//highlights or selects the copied text
    //passwordRef.current?.setSelectionRange(0,9); --> selects range of text
      window.navigator.clipboard.writeText(password) //copies the current password to clipboard
     setCopyColor("lavender")
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [numAllowed, charAllowed, length, passwordGenerator]);

  return (
    <>
    <h1 className="text-center text-brown">PASSWORD GENERATOR</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 my-8 text-white bg-pink-300">
        <h1 className="text-white text-center ">Password Generator</h1>
        <div className="flex shadow-3xl rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3 mx-1  rounded text-gray-400"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none text-white px-3 py-0.5 mx-1  shrink-0 rounded "
            style={{backgroundColor: copyColor}}
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer mb-4 "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="mb-4">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              className="mb-4"
              id="numInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label className="mb-4">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="mb-4"
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="mb-4">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
