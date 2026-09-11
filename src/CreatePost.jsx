import { useState } from "react";
import Button from "@mui/material/Button";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function CreatePost({ isLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  if (!isLoggedIn) {
    return null;
  }
  const [formData, setFormData] = useState({ question: "" });
  const [words, setWords] = useState([]);
  const [postError, setPostError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWords(value.trim().split(/\s+/));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}createpost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        setPostError(result.message || "Problem adding post.");
        return;
      }
      navigate("/");
    } catch (error) {
      console.log("Error posting question:", error);
      setPostError("Unable to connect to the server. Please try again.");
    }
  };
  return (
    <div className="ask-question-container">
      <form className="ask-question-form" onSubmit={handleSubmit}>
        <h1>Ask a Question</h1>
        {postError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{postError}</p>
        )}
        {words.length > 30 && (
          <p style={{ color: "red", fontSize: 14 }}>Maximum 30 words allowed</p>
        )}
        <textarea
          name="question"
          placeholder="Enter your question..."
          value={formData.question}
          onChange={handleChange}
          required
        />
        <p style={{ color: "red", fontSize: 14 }}>
          {Math.max(0, 30 - words.length)} Words left.
        </p>
        <Button variant="contained" type="submit">
          Post Question
        </Button>
      </form>
    </div>
  );
}
