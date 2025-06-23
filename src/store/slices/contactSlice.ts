import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { StateModel } from "../../core/models/StateModel";
import type { ContactType } from "../../core/models/ContactModel";
import { deleteContact, getContacts, saveContact, updateContact } from "../../api";

export const AsyncThunkType = {
    FETCH_CONTACTS:  'contact/get',
    ADD_CONTACT:  'contact/add',
    DELETE_CONTACT: 'contact/delete',
    UPDATE_CONTACT:  'contact/updateTask'
}

const initialState = {
    contacts: [{} as ContactType],
    selectedStatus: 2,
    loadingContacts: false,
    savingContact: false,
    deletingContact: false,
}

export const AsyncThunkMap = new Map<string, any>([
    [AsyncThunkType.FETCH_CONTACTS, createAsyncThunk(AsyncThunkType.FETCH_CONTACTS, getContacts)],
    [AsyncThunkType.ADD_CONTACT, createAsyncThunk(AsyncThunkType.ADD_CONTACT, saveContact)],
    [AsyncThunkType.DELETE_CONTACT, createAsyncThunk(AsyncThunkType.DELETE_CONTACT, deleteContact)],
    [AsyncThunkType.UPDATE_CONTACT, createAsyncThunk(AsyncThunkType.UPDATE_CONTACT, updateContact)],
])

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        filterByDate: (state, { payload }) => {
            const data = JSON.parse(localStorage.getItem('tasks') || '[]');
            state.contacts = data.filter((task: ContactType) => task.dueTo === payload)
        },

        filterByStatus: ((state, { payload }) => {
            const data = JSON.parse(localStorage.getItem('contacts') || '[]');
            state.selectedStatus = payload;
            if (payload === 2) {
                state.contacts = data;
                return;
            }

            state.contacts = data.filter((task: ContactType) => task.completed === Boolean(payload))
        }),

    },
    extraReducers: (builder) => {
        builder.addCase(AsyncThunkMap.get(AsyncThunkType.FETCH_CONTACTS).pending, (state: StateModel) => {
            state.loadingContacts = true;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.FETCH_CONTACTS).fulfilled, (state: StateModel, { payload }) => {
            state.loadingContacts = false;
            state.contacts = payload;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.FETCH_CONTACTS).rejected, (state: StateModel) => {
            state.loadingContacts = false;
        })

        .addCase(AsyncThunkMap.get(AsyncThunkType.ADD_CONTACT).pending, (state: StateModel) => {
            state.savingContact = true
        }).addCase(AsyncThunkMap.get(AsyncThunkType.ADD_CONTACT).fulfilled, (state: StateModel, { payload }) => {
            state.contacts.push(payload)
            state.savingContact = false
        }).addCase(AsyncThunkMap.get(AsyncThunkType.ADD_CONTACT).rejected, (state: StateModel) => {
            state.savingContact = false
        })

        .addCase(AsyncThunkMap.get(AsyncThunkType.UPDATE_CONTACT).pending, (state: StateModel) => {
            state.savingContact = true
        }).addCase(AsyncThunkMap.get(AsyncThunkType.UPDATE_CONTACT).fulfilled, (state: StateModel, { payload }) => {
            state.contacts = state.contacts.map((contact: ContactType) => contact.id === payload.id ? payload : contact)
            state.savingContact = false
        }).addCase(AsyncThunkMap.get(AsyncThunkType.UPDATE_CONTACT).rejected, (state: StateModel) => {
            state.savingContact = false
        })
        
        .addCase(AsyncThunkMap.get(AsyncThunkType.DELETE_CONTACT).pending, (state: StateModel) => {
            state.deletingContact = true;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.DELETE_CONTACT).fulfilled, (state: StateModel, { payload }) => {
            state.contacts = state.contacts.filter(({id}: ContactType) => id !== payload);
            state.deletingContact = true;
        }).addCase(AsyncThunkMap.get(AsyncThunkType.DELETE_CONTACT).rejected, (state: StateModel) => {
            state.deletingContact = true;
        })
    }
})


export const { filterByDate, filterByStatus } = contactSlice.actions;
export default contactSlice.reducer