import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@nycgio-ticketsystem/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
