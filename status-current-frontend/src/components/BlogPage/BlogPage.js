import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { fetchBlogPosts } from "../../app/slices/blogPostSlice";
import CardComponent from "../common/CardComponent/CardComponent";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import "./blog-page.css";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blogPosts.posts);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleCreatePost = () => {
    dispatch(fetchBlogPosts()); // Refetch posts to include the new one
    handleClose(); // Close the modal after refetching
  };

  return (
    <div className="blog-page-wrapper">
      <div className="buttons-wrapper">
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={"large"}
          onClick={showModal}
        >
          Create Post
        </Button>
      </div>
      <h1>Feed</h1>
      <div className="content-wrapper">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <CardComponent key={post.BlogPostId} post={post} />
          ))
        ) : (
          <p>No blog posts available</p>
        )}
      </div>
      <CreatePostModal
        visible={isModalVisible}
        onClose={handleClose}
        onPostCreated={handleCreatePost} // Pass the callback to refetch
      />
    </div>
  );
};

export default BlogPage;