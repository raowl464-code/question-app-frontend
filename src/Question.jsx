import { useState } from "react";
import { Link } from "react-router-dom";

export default function Question({ question, isLoggedIn }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [answered, setAnswered] = useState(question.answered);
  const [upVotes, setUpvotes] = useState(question.upvotes);
  const [liked, setLiked] = useState(false);
  const clickedLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}question/${question.question_id}/liked`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      if (!response.ok) {
        console.log(result);
        return;
      }

      setLiked((prev) => !prev);
      setUpvotes(result.upvotes);
    } catch (error) {
      console.log("Database error", error);
    }
  };
  const marked = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}question/${question.question_id}/answered`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        return;
      }

      setAnswered(1);
    } catch (error) {
      console.log("Database error", error);
    }
  };
  return (
    <div className={`question-card ${answered ? "answered" : ""}`}>
      {/* Avatar */}
      <img
        className="question-avatar"
        src={question.avatar}
        alt="User avatar"
      />

      <div className="question-content">
        {/* Date and username */}
        <div className="question-info">
          <strong>{question.date_posted}</strong>
          <span> • </span>

          <Link to={`/profile/${question.user_id}`}>{question.first_name}</Link>

          {isLoggedIn && question.user_id === loggedInUser.id && (
            <span> (You)</span>
          )}
        </div>

        {/* Question */}
        <p className="question-text">{question.question_text}</p>

        {/* Likes */}
        <div className="question-actions">
          <div onClick={clickedLike}>
            {liked ? (
              <span className="likes">💗{upVotes}</span>
            ) : (
              <span className="likes">♡{upVotes}</span>
            )}
          </div>

          {/* Small avatars */}
          {/* <div className="small-avatars">
            {question.users.map((user, index) => (
              <img key={index} src={user} alt="User" />
            ))}
          </div> */}
        </div>

        {/* Mark as answered */}
        {isLoggedIn && question.user_id === loggedInUser.id && !answered && (
          <button className="answered-button" onClick={(e) => marked(e)}>
            Mark as Answered
          </button>
        )}
      </div>
    </div>
  );
}
