import { Button, Drawer, Form, Input, InputNumber, Space } from "antd";
import type { ContactType } from "../core/models/ContactModel";
import { useDispatch, useSelector } from "react-redux";
import type { StateModel } from "../core/models/StateModel";
import { AsyncThunkMap, AsyncThunkType } from "../store/slices/contactSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMessageProvider } from "../contexts/MessageProvider";
import { useEffect } from "react";
import { validateMessages } from "../utils";

type ContactDrawerPropsType = {
    open: boolean,
    payload: ContactType | null,
    closeContactFormDrawer: () => void
}

function ContactDrawer({open, payload, closeContactFormDrawer}: ContactDrawerPropsType) {
    const [form] = Form.useForm();
    const {callAsyncMessage} = useMessageProvider() as any

    const dispatch = useDispatch<any>();
    const loading = useSelector((state: StateModel) => state.savingContact);
    
    const saveContact = () => {
      const hideMessage = callAsyncMessage('Saving new contact...', 'Success');
      const newContact = {id: Date.now(), ...form.getFieldsValue()}

      dispatch(AsyncThunkMap.get(AsyncThunkType.ADD_CONTACT)(newContact))
        .then(unwrapResult)
        .then(() => {
          hideMessage()
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
         <Form name="basic"
              form={form}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              validateMessages={validateMessages}
              autoComplete="off"
            >
               <Form.Item
                 label="Username"
                 name="name"
                 rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
               </Form.Item>
               <Form.Item label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: "email" }]}
                >
               <Input />
              </Form.Item>
              <Form.Item name="phone"
                         label="Phone Number"
                         rules={[{ required: true, message: 'Please input your phone number!' }]}>
               <InputNumber addonBefore={+992} style={{ width: '100%' }} />
              </Form.Item>
        </Form>
        </Drawer>
    )
}

export {ContactDrawer}