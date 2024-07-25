import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, notification } from "antd";
import { fetchBlogPosts, updateBlogPost } from "../../app/slices/blogPostSlice";
import CardComponent from "../common/CardComponent/CardComponent";
import CreateOrUpdatePostModal from "../CreateOrUpdatePostModal/CreateOrUpdatePostModal";
import "./blog-page.css";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blogPosts.posts);
  const statusBlogPosts = useSelector((state) => state.blogPosts.status);
  const errorBlogPosts = useSelector((state) => state.blogPosts.error);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const showModal = () => {
    setIsEditMode(false);
    setSelectedPost(null);
    setIsModalVisible(true);
  };

  const handleEdit = (post) => {
    setIsEditMode(true);
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const openNotification = (message) => {
    api.success({
      message: "Success",
      description: message,
      placement: "topLeft",
    });
  };

  const handleCreatePost = () => {
    dispatch(fetchBlogPosts()); // Fetch posts after creating
    handleClose();
    openNotification("Post created successfully!");
  };

  const handleUpdatePost = (updatedPost) => {
    dispatch(updateBlogPost({ id: updatedPost.BlogPostId, updatedPost })).then(
      () => {
        dispatch(fetchBlogPosts()); // Fetch posts after updating
      }
    );
    handleClose();
    openNotification("Post updated successfully!");
  };

  const handleDeleteSuccess = () => {
    openNotification("Post deleted successfully!");
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
        {statusBlogPosts === "loading" ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : statusBlogPosts === "succeeded" ? (
          blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <CardComponent
                key={post.BlogPostId}
                post={post}
                onDeleteSuccess={handleDeleteSuccess}
                handleEdit={() => handleEdit(post)}
              />
            ))
          ) : (
            <p>No blog posts available</p>
          )
        ) : (
          <p>Failed to load blog posts: {errorBlogPosts}</p>
        )}
      </div>
      <CreateOrUpdatePostModal
        visible={isModalVisible}
        onClose={handleClose}
        onPostCreated={isEditMode ? handleUpdatePost : handleCreatePost}
        isEditMode={isEditMode}
        post={selectedPost}
      />
      {contextHolder}
    </div>
  );
};

export default BlogPage;
