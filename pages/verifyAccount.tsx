import axios from "axios";
import { GetServerSideProps } from "next";
import { parseBody } from "next/dist/server/api-utils/node";
import Link from "next/link";
import React from "react";

interface Props {
  success: boolean;
}

const verifyAccount: React.FC<Props> = ({ success }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <div className="font-bold text-6xl uppercase">
        {success ? "verified" : "error occured"}
      </div>
      <Link href="/login">
        <a className="uppercase font-bold text-red-500 text-2xl">
          jump to login page
        </a>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const body = await parseBody(context.req, "1mb");
  let success = false;
  let notFound = false;
  if (body.email) {
    const res = await axios.get("http://localhost:3000/api/signup", {
      params: { email: body.email },
    });
    success = res.data.success;
  } else {
    notFound = true;
  }
  return {
    props: {
      success,
    },
    notFound: notFound,
  };
};

export default verifyAccount;
