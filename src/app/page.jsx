"use client"
import { useState } from "react";

export default function Home() {

  const [options, setOptions] = useState({

    length: 10,
    uppercase: false,
    lowercase: false,
    number: false,
    symbols: false,
    isError: false

  })

  const [isError, setIsError] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")

  //Function to generate a random password based on selected options

  const generateRandomPassword = () => {

    if (
      !options?.uppercase &&
        !options?.lowercase &&
          !options?.number &&
            !options?.symbols) {
      setIsError(true)
      return
    } else {
      setIsError(false)
    }

    //Define character set for each option
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
    const numberChars = '0123456789'
    const symbols = '!@#$%^&*()_+={}[]|:;"<>,.?/~'

    let passwordChars = ''
    let password = ''

    //Add selected character sets to passwordChars
    if (options.uppercase) {
      passwordChars += upperChars
    }

    if (options.lowercase) {
      passwordChars += lowerChars
    }

    if (options.number) {
      passwordChars += numberChars
    }

    if (options.symbols) {
      passwordChars += symbols
    }

    const passwordLength = options.length

    //Generate the random password
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length)
      password += passwordChars[randomIndex]
    }

    //Update the generated password state
    setGeneratedPassword(password)

  }

  return (

    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#e4e4ee] text-black">

      <div className="w-[400px] bg-[#fff] rounded-xl overflow-hidden mx-2">

        <div className="border-1 border-[#f6f6f6] p-4 bg-[#E7C285]">
          <p className="text-lg font-medium text-white">Generate Random Password</p>
        </div>
 
        <div className="p-4">

          {/* Input field for password length */}
          <label>Password length</label>
          <input
            className="w-[320px] text-sm p-3 rounded-md border-1 border-[#f3f3f3] m-2"
            value={options.length}
            onChange={({ target }) => {
              setOptions({ ...options, length: Number(target.value) })
            }}
            name="confirmPassword"
            type="number"
            placeholder="Password length"
            min={4}
          />

          {/* Checkboxes for selecting options */}
          <div className="flex items-center justify-between">

            <div className="w-[130px] p-1.5">
              <input
              className="bg-[#E7C285]"
                type="checkbox"
                checked={options.uppercase}
                onChange={() => {
                  setOptions({ ...options, uppercase: !options.uppercase })
                }}
              />
              <label>Uppercase</label>

            </div>

            <div className="w-[130px] p-1.5">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={() => {
                  setOptions({ ...options, lowercase: !options.lowercase })
                }}
              />
              <label>lowercase</label>

            </div>

          </div>

          <div className="flex items-center justify-between">

            <div className="w-[130px] p-1.5">
              <input
                type="checkbox"
                name="languages"
                checked={options.number}
                onChange={() => {
                  setOptions({ ...options, number: !options.number })
                }}
              />
              <label>Number</label>

            </div>

            <div className="w-[130px] p-1.5">
              <input
                type="checkbox"
                name="languages"
                checked={options.symbols}
                onChange={() => {
                  setOptions({ ...options, symbols: !options.symbols })
                }}
              />
              <label>Symbols</label>

            </div>

          </div>

          {/* Error message if no options are selected */}
          {isError &&
            (
              <span className="text-sm font-medium text-[#f00]">Please select at least one option</span>
            )}

          {/* Button to generate a random password */}
          <button className="rounded-4xl bg-[#E7C285] py-[10px] px-[20px] text-white font-medium cursor-pointer mt-4 hover:bg-[#e39a25] transition-colors duration-200" onClick={generateRandomPassword}>Generate password</button>


        </div>
      </div>

      {/* Display the generated password if available */}

      { (generatedPassword) &&
        (
          <div className="w-[400px]  bg-white rounded-lg p-4 mt-4">
            <label className="text-lg text-black">Generated Password: </label>
            <p className="text-lg font-medium text-black mt-2">{generatedPassword}</p>
          </div>
        )}

    </div>
  );
}
