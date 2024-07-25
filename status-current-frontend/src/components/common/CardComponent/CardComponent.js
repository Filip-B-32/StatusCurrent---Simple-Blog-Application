import React from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./card-component.css";
import { useDispatch } from "react-redux";
import { deleteBlogPost } from "../../../app/slices/blogPostSlice";

const CardComponent = ({ post, onDeleteSuccess, handleEdit }) => {
  const title = post?.Title || "No Title";
  const author = post?.Author || "Unknown Author";
  const content = post?.Content || "No Content";
  
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const resultAction = await dispatch(deleteBlogPost(post.BlogPostId));
    if (deleteBlogPost.fulfilled.match(resultAction)) {
      onDeleteSuccess();
    }
  };

  // Function for formating date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  return (
    <Card
      title={title}
      className="card-component-wrapper"
      bordered={false}
      style={{ width: "100%" }}
      actions={[
        <EditOutlined key="edit" onClick={handleEdit} />,
        <DeleteOutlined key="delete" onClick={handleDelete} />,
      ]}
    >
      <section className="author-wrapper">
        <Avatar style={{ backgroundColor: "#4096ff", color: "white" }}>
          {author.charAt(0)}
        </Avatar>
        <h3 className="author-name">{author}</h3>
      </section>

      <p>{content}</p>
      <div className="timestamps">
        <p><strong>Created At:</strong> {formatDate(post.Created_at)}</p>
        <p><strong>Updated At:</strong> {formatDate(post.Updated_at)}</p>
      </div>
    </Card>
  );
};

export default CardComponent;