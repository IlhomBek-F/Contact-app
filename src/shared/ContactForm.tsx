import { Button, Form, Input } from "antd"
import type { ContactType } from "../models/ContactModel"

export type ContactFormMode = 'edit' | 'add'

export type ContactFormProps = {
    mode: ContactFormMode,
    payload?: ContactType
}

function ContactForm(props: ContactFormProps) {
  const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
        },
   };

     const onFinish = (values: any) => {
       console.log('Success:', values);
     };

     const onFinishFailed = (errorInfo: any) => {
       console.log('Failed:', errorInfo);
     };

    return (
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your password!', type: "email" }]}
      >
        <Input />
      </Form.Item>
    </Form>
    )
}

export {ContactForm}