import { Form, Input, InputNumber, type FormInstance } from "antd";
import { validateMessages } from "../utils";


function ContactForm({form}: {form: FormInstance}) {

    return <Form name="basic"
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
}

export {ContactForm}