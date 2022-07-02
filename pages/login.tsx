import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { loginUser } from "../services/userApi";

interface Props {}

const Login: React.FC<Props> = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await loginUser(loginInfo);
    if (data.success === false) {
      setErrorMessage(data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col items-center gap-7" onSubmit={onSubmit}>
        <h2 className="font-bold text-5xl text-red-400">LOGIN</h2>
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
          type="password"
          placeholder="Password"
          className="p-4 border-2 w-full rounded-md border-red-200 outline-none"
          name="password"
          required
        />
        <button className="font-bold bg-red-400 w-full p-2 rounded-md text-white hover:bg-red-500">
          LOGIN
        </button>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <Link href="signup">
          <a className="text-blue-500 hover:text-blue-600">
            Click this link and please signup
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Login;
