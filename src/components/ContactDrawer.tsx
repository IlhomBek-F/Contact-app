import { Button, Drawer, Form, Space } from "antd";
import type { ContactType } from "../core/models/ContactModel";
import { useDispatch, useSelector } from "react-redux";
import type { StateModel } from "../core/models/StateModel";
import { AsyncThunkMap, AsyncThunkType } from "../store/slices/contactSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMessageProvider } from "../contexts/MessageProvider";
import { useEffect } from "react";
import { ContactForm } from "./ContactForm";

type ContactDrawerPropsType = {
    open: boolean,
    payload: ContactType | null,
    closeContactFormDrawer: () => void
}

function ContactDrawer({open, payload, closeContactFormDrawer}: ContactDrawerPropsType) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();
  const {callAsyncMessage} = useMessageProvider() as any
  const loading = useSelector((state: StateModel) => state.savingContact);

    
  const saveContact = () => {
    const hideMessage = callAsyncMessage('Saving new contact...', 'Success');
    const newContact = {id: Date.now(), ...form.getFieldsValue()}

    dispatch(AsyncThunkMap.get(AsyncThunkType.ADD_CONTACT)(newContact))
      .then(unwrapResult)
      .then(() => {
        hideMessage()
        form.resetFields()
        closeContactFormDrawer()
      });
  }

    const updateContact = () => {
      const hideMessage = callAsyncMessage('Updating contact...', 'Success')

      dispatch(AsyncThunkMap.get(AsyncThunkType.UPDATE_CONTACT)({id: payload?.id, ...form.getFieldsValue()}))
        .then(unwrapResult)
        .then(() => {
          hideMessage()
          closeContactFormDrawer()
        });
    }

    useEffect(() => {
      if(payload) {
        form.setFieldsValue(payload)
      } else {
        form.resetFields()
      }
    }, [payload])

    return (
         <Drawer title={payload ? 'Edit contact' : 'Add contact'}
                 placement='bottom'
                 width={500}
                 height={285}
                 getContainer={false}
                 onClose={closeContactFormDrawer}
                 open={open}
                 extra={
                   <Space>
                     <Button onClick={closeContactFormDrawer}>Cancel</Button>
                     <Button type="primary" onClick={payload ? updateContact : saveContact} disabled={loading}>Save</Button>
                   </Space>
                 }
          >
          <ContactForm form={form}/>
        </Drawer>
    )
}

export {ContactDrawer}