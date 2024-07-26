import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { createBlogPost } from "../../app/slices/blogPostSlice";
import { notification } from "antd";

const CreateOrUpdatePostModal = ({
  visible,
  onClose,
  onPostCreated,
  isEditMode,
  post,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isEditMode && post) {
      form.setFieldsValue({
        Title: post.Title,
        Content: post.Content,
        Author: post.Author,
      });
    } else {
      form.resetFields();
    }
  }, [isEditMode, post, form]);

  const openNotification = (message) => {
    api.info({
      message: "No update was made",
      description: message,
      placement: "topLeft",
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (isEditMode && post) {
          const isUnchanged = Object.keys(values).every(
            (key) => values[key] === post[key]
          );
          if (isUnchanged)
            openNotification(
              "The post didn't update. The post must have some different changes for it to update!"
            );
          else onPostCreated({ ...post, ...values }); // Call the update function
        } else {
          dispatch(createBlogPost(values)).then(() => {
            form.resetFields();
            onPostCreated(); // Notify parent to refetch posts
          });
        }
      })
      .catch((err) => {
        console.log("Validate Failed:", err);
      });
  };

  return (
    <Modal
      title={isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEditMode ? "Update" : "Create"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="createPost">
        <Form.Item
          name="Title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Content"
          label="Content"
          rules={[{ required: true, message: "Please input the content!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="Author"
          label="Author"
          rules={[{ required: true, message: "Please input the author!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default CreateOrUpdatePostModal;
