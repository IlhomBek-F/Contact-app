import { Form, Input } from "antd"
import type { ContactType } from "../models/ContactModel"
import { validateMessages } from "../utils/formValidation";

export type ContactFormProps = {
    payload?: ContactType | null
}

function ContactForm(props: ContactFormProps) {
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