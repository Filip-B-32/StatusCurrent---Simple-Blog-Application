import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { createBlogPost } from '../../app/slices/blogPostSlice';

const CreatePostModal = ({ visible, onClose, onPostCreated }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch(createBlogPost(values))
          .then(() => {
            form.resetFields();
            onPostCreated(); // Notify parent to refetch posts
          });
      })
      .catch(err => {
        console.log('Validate Failed:', err);
      });
  };

  return (
    <Modal
      title="Create New Blog Post"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Create"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="createPost"
      >
        <Form.Item
          name="Title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="Author"
          label="Author"
          rules={[{ required: true, message: 'Please input the author!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;