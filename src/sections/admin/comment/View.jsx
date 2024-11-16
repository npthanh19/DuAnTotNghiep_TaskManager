import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCommentsByTask } from '../../../services/commentService';
import { getTaskById } from '../../../services/tasksService';
import { getUserById } from '../../../services/usersService';
import { getTaskFiles } from '../../../services/fileService';
import { DeleteComment } from './Delete';

export const CommentForm = ({ taskId, showModal, handleCloseModal }) => {
  const [comments, setComments] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskFiles, setTaskFiles] = useState([]);
  const [repliesVisibility, setRepliesVisibility] = useState({});

  const fetchUserNames = async (comments) => {
    const commentsWithUserNames = await Promise.all(
      comments.map(async (comment) => {
        try {
          const user = await getUserById(comment.user_id);
          return { ...comment, userName: user.fullname };
        } catch (error) {
          console.error(`Error fetching user with ID ${comment.user_id}:`, error);
          return { ...comment, userName: 'Unknown User' };
        }
      })
    );
    setComments(commentsWithUserNames);
    setFilteredComments(commentsWithUserNames);
  };

  const fetchTaskFiles = async () => {
    try {
      const files = await getTaskFiles(taskId);
      setTaskFiles(files);
    } catch (error) {
      console.error('Error fetching task files:', error);
    }
  };

  useEffect(() => {
    const fetchCommentsAndTaskName = async () => {
      try {
        const fetchedComments = await getCommentsByTask(taskId);
        const taskData = await getTaskById(taskId);
        setTaskName(taskData.task_name);
        await fetchUserNames(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments or task name:', error);
      }
    };

    if (taskId) {
      fetchCommentsAndTaskName();
      fetchTaskFiles();
    }
  }, [taskId]);

  const handleDeleteCommentSuccess = (commentId, errorMsg) => {
    if (errorMsg) {
      toast.error(`Xóa bình luận thất bại: ${errorMsg}`);
    } else {
      toast.success('Xóa bình luận thành công!');
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      setFilteredComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const results = comments.filter((comment) => {
      const searchText = searchQuery.toLowerCase();
      const userNameMatch = comment.userName && comment.userName.toLowerCase().includes(searchText);
      const textMatch = comment.content && comment.content.toLowerCase().includes(searchText);
      return userNameMatch || textMatch;
    });
    setFilteredComments(results);
  }, [searchQuery, comments]);

  const toggleRepliesVisibility = (commentId) => {
    setRepliesVisibility((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));
  };

  const renderCommentsWithReplies = (comment, indent = 0) => {
    const commentDate = new Date(comment.created_at);
    const formattedDate = commentDate.toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = commentDate.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <li key={comment.id} className="list-group-item" style={{ marginLeft: indent, backgroundColor: indent ? '#f8f9fa' : 'white' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={comment.avatar}
              alt="Avatar"
              className="avatar me-2"
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
            <span>
              <strong>Name: </strong>{comment.userName} <br />
             <small>
  <strong>Comment: </strong>{comment.comment} <br />
  <strong>File Name:</strong> 
  {taskFiles
    .filter((file) => file.comment_id === comment.id || file.parent_id === comment.id) // Lọc theo comment_id hoặc parent_id
    .map((file) => <span key={file.id}>{file.file_name}</span>)
  }
  <br />
</small>

            </span>
          </div>
          <div>
            {formattedDate} at {formattedTime}
          </div>
        </div>
        <div className="d-flex m-2">
          <a
            href="#"
            className="text-danger ms-2"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCommentId(comment.id);
              setShowDeleteModal(true);
            }}
          >
            Xóa
          </a>

          {!comment.parent_id && (
            <a className="ms-3" onClick={() => toggleRepliesVisibility(comment.id)}>
              {repliesVisibility[comment.id] ? 'Ẩn bình luận ' : 'Xem thêm'}
            </a>
          )}
        </div>
        {repliesVisibility[comment.id] && comment.replies?.map((reply) => renderCommentsWithReplies(reply, indent + 20))}
      </li>
    );
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-xl">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-pencil" title="Edit Task">
              <small className="ms-3">Comments</small>
            </i>
          </div>
          <button onClick={handleCloseModal} className="btn-close ms-3" aria-label="Close"></button>
        </div>

        <div className="mb-3" style={{ flex: 1, maxWidth: '250px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo bình luận hoặc tên người dùng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="comment-section">
          <h5>Bình luận: {taskName}</h5>
          <nav aria-label="Page navigation">
            <ul className="list-group comment-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {filteredComments.map((comment) => renderCommentsWithReplies(comment))}
            </ul>
          </nav>
        </div>

        {showDeleteModal && (
          <DeleteComment
            show={showDeleteModal}
            id={selectedCommentId}
            onClose={() => setShowDeleteModal(false)}
            onDeleteSuccess={handleDeleteCommentSuccess}
          />
        )}
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
