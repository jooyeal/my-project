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
        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
          return res
            .status(401)
            .json({ success: false, message: "email is already existed" });
        }

        const existNickname = await User.findOne({
          nickname: req.body.nickname,
        });
        if (existNickname) {
          return res
            .status(401)
            .json({ success: false, message: "nickname is already existed" });
        }

        if (req.body.password !== req.body.passwordConfirm) {
          return res
            .status(400)
            .json({ success: false, message: "please check your password" });
        }

        const newUser = new User({
          email: req.body.email,
          nickname: req.body.nickname,
          password: req.body.password,
        });
        await newUser.save();

        res.status(200).json({ success: true, data: newUser });
      } catch (error) {
        res.status(500).json({ success: false, message: "system error" });
      }
  }
}
