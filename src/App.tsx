import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState();
  const [numAllowed, setNumAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const passRef = useRef<HTMLInputElement>(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*(){}|`~-><_+";
    }

    for (let i = 0; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);


  const copyPassord = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);
  return (
    <div className="bg-gradient-to-r from-white to-gray-700 rounded-2xl">
      <h1 className="text-2xl p-4 font-mono">Generate Password</h1>
      <div>
        <input
          className="m-2 px-2 py-1 rounded-lg w-96 font-mono"
          type="text"
          value={password}
          placeholder="Password"
          ref={passRef}
          readOnly
        />
        <button onClick={copyPassord} className="bg-blue-700 px-2 py-1 rounded-xl text-white font-mono hover:bg-blue-600">
          copy
        </button>
      </div>
      <div className="p-2">
        <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numInput"
          onChange={() => {
            setNumAllowed((prev) => !prev);
          }}
        />
        <label className="px-2 text-emerald-900 font-mono ">
          Allow Numbers
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label className="px-2 text-sky-900 font-mono ">
          Allow Special Characters
        </label>
      </div>
      <div className="flex items-center justify-center p-2 ">
        <label className="text-xl font-mono justify-center px-4">Length: {length}</label>
        <input
          className="cursor-pointer w-20 px-2 py-1 rounded-lg font-mono"
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>
      <h2 className="font-mono font-semibold">Adjust the slider to get started!</h2>
      
    </div>
  );
}
export default App;
