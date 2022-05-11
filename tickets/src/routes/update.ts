import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Ticket } from "../models/ticket";

import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@nycgio-ticketsystem/common";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    // does the ticket exists?
    if (!ticket) throw new NotFoundError();

    // is the user the owner of the ticket?
    if (ticket.userId !== req.user!.id) throw new NotAuthorizedError();

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    res.json({ success: true, data: ticket });
  }
);

export { router as updateTicketRouter };
