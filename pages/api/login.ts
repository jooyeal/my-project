import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/mongodb";
import User from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
      } catch (error) {}
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          if (user.password !== req.body.password)
            return res
              .status(401)
              .json({ success: false, message: "please check your password" });
          if (!user.isVerified)
            return res
              .status(401)
              .json({ success: false, message: "please verify your account" });
        } else {
          return res
            .status(401)
            .json({ success: false, message: "please check your email" });
        }

        // TODO: AUTHENTICATION

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ success: false, message: "system error" });
      }
  }
}
