import React, { ChangeEvent, useState } from "react";
import { createUser } from "../services/userApi";

interface Props {}

const Signup: React.FC<Props> = () => {
  const [userInfo, setUserInfo] = useState<User>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    // Set form datas in userInfo and request create user
    e.preventDefault();
    const data = await createUser(userInfo);
    if (data.success === false) {
      setErrorMessage(data.message);
    }
    // TODO: send email to verify account
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col items-center gap-7" onSubmit={onSubmit}>
        <h2 className="font-bold text-5xl text-red-400">SIGNUP</h2>
        <input
          onChange={onChange}
          type="text"
          placeholder="Email"
          className="p-4 border-2 w-full rounded-md border-red-200 outline-none"
          name="email"
          required
        />
        <input
          onChange={onChange}
          type="text"
          placeholder="Nickname"
          className="p-4 border-2 w-full rounded-md border-red-200 outline-none"
          name="nickname"
          required
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="Password"
          className="p-4 border-2 w-full rounded-md border-red-200 outline-none"
          name="password"
          required
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="Password confirm"
          className="p-4 border-2 w-full rounded-md border-red-200 outline-none"
          name="passwordConfirm"
          required
        />
        <button className="font-bold bg-red-400 w-full p-2 rounded-md text-white hover:bg-red-500">
          SIGNUP
        </button>
        {errorMessage && (
          <p className="text-red-600 font-bold">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
