import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Login } from "../../auth/LoginOut";

export function Comment() {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: user?.username || "Anonyme",
      date: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="comments-section">
      <h3>Commentaires</h3>

      {user ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Votre commentaire..."
            required
          />
          <button type="submit">Envoyer</button>
        </form>
      ) : (
        <>
            <p>Connectez-vous pour laisser un commentaire</p>
            <Login />
        </>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <strong>{comment.author}</strong>
            <small>{comment.date.toLocaleDateString()}</small>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}