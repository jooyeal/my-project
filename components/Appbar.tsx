import Link from "next/link";
import React, { FormEvent } from "react";
import { FaUserAlt } from "react-icons/fa";

interface Props {}

const Appbar = (props: Props) => {
  const onSubmit = (e: FormEvent) => {
    console.log(e);
  };

  return (
    <div className="fixed w-full h-16 bg-red-400 text-white flex justify-between items-center pl-9 pr-9 font-bold">
      <div>
        <Link href="/">
          <a>APP NAME</a>
        </Link>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md outline-none text-black"
          />
        </form>
      </div>
      <div>
        <FaUserAlt />
      </div>
    </div>
  );
};

export default Appbar;
