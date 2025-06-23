import type { ContactType } from "./ContactModel";

export type ContactDrawerState = {
  open: boolean;
  payload: ContactType | null;
};