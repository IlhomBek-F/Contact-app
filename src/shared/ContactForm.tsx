import { Form, Input, InputNumber } from "antd"
import type { ContactType } from "../core/models/ContactModel"
import { validateMessages } from "../utils/formValidation";
import { useEffect } from "react";

export type ContactFormProps = {
    payload?: ContactType | null
}

function ContactForm({payload}: ContactFormProps) {
    const [form] = Form.useForm();

    useEffect(() => {
      if(payload) {
        form.setFieldsValue(payload)
      }else {
        form.resetFields()
      }
    }, [payload])

    return (
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
    )
}

export {ContactForm}