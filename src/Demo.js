import {useState} from "react";

const CommentItem = ({ comment }) => (
    <div className="comment-item">
        <strong>{comment.user.username}</strong>: {comment.content}
        <div className="timestamp">{comment.timestamp}</div>
        {comment.replies && comment.replies.length > 0 && (
            <div className="replies">
                {comment.replies.map(reply => (
                    <CommentItem key={reply.id} comment={reply} />
                ))}
            </div>
        )}
    </div>
);

// Component chính hiển thị danh sách bình luận
const CommentList = ({ comments }) => (
    <div className="comment-list">
        {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
);

// Component chính cho ứng dụng React
export default function Demo() {
    const [comments, setComments] = useState([
        {
            id: 1,
            content: 'Great product!',
            user: { userId: 1, username: 'User1' },
            isShopOwnerComment: false,
            parentId: null,
            timestamp: '2023-11-19T12:30:00',
            replies: [
                {
                    id: 2,
                    content: 'Thank you for your feedback!',
                    user: { userId: 2, username: 'ShopOwner' },
                    isShopOwnerComment: true,
                    parentId: 1,
                    timestamp: '2023-11-19T12:35:00',
                    replies: [],
                },
            ],
        },
        // ...more comments
    ]);

    return (
        <div className="App">
            <h1>Product Reviews and Comments</h1>
            <CommentList comments={comments} />
        </div>
    );
};