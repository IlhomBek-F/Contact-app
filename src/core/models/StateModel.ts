import type { ContactType } from "./ContactModel";

export type StateModel = {
    contacts: ContactType[],
    selectedStatus: number,
    loadingContacts: boolean,
    savingContact: boolean,
    deletingContact: boolean
}