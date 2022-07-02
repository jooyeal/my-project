import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/mongodb";
import User from "../../models/User";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  console.log(req);
  switch (method) {
    case "GET":
      try {
      } catch (error) {}
    case "POST":
      try {
        console.log(req.body);
      } catch (error) {}
  }
}
