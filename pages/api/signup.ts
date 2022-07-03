import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/mongodb";
import User from "../../models/User";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const verifyUser = await User.findOneAndUpdate(
          { email: req.query.email },
          {
            isVerified: true,
          },
          { new: true }
        );
        return res
          .status(200)
          .json({ success: true, message: "user verifed!" });
      } catch (error) {
        return res.status(500).json({ success: false });
      }
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

        const transporter = nodemailer.createTransport({
          port: 465,
          host: "smtp.gmail.com",
          auth: {
            user: process.env.EMAIL_USER_ID,
            pass: process.env.EMAIL_USER_PASSWORD,
          },
          secure: true,
        });

        const mailData = {
          from: "sereyoru@gmail.com",
          to: `${req.body.email}`,
          subject: `Please verify your account from review app`,
          html: `<div>
          hello ${req.body.nickname}
          <p>if you want verify your account please click button below</p>
          <form action="http://localhost:3000/verifyAccount" method="POST">
            <input type="hidden" name="email" value="${req.body.email}"/>
            <button>verify account</button>
          </form></div>`,
        };

        transporter.sendMail(mailData, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });

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
