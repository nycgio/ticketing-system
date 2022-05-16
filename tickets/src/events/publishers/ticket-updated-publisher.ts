import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@nycgio-ticketsystem/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
