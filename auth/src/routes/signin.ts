import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

// custom modules
import { Password } from "../utils/password";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // does user exists?
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    // does password match?
    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!
    );

    // store it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).json({ success: true, user });
  }
);

export { router as signinRouter };
