import React from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./card-component.css";

const CardComponent = ({ post }) => {
  const title = post?.Title || "No Title";
  const author = post?.Author || "Unknown Author";
  const content = post?.Content || "No Content";
  
  return (
    <Card
      title={title}
      className="card-component-wrapper"
      bordered={false}
      style={{ width: "100%" }}
      actions={[
        <EditOutlined key="edit" />,
        <DeleteOutlined key="delete" />,
      ]}
    >
      <section className="author-wrapper">
        <Avatar style={{ backgroundColor: "#4096ff", color: "white" }}>
          {author.charAt(0)}
        </Avatar>
        <h3 className="author-name">{author}</h3>
      </section>

      <p>{content}</p>
    </Card>
  );
};

export default CardComponent;