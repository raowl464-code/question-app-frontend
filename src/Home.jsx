import Button from "@mui/material/Button";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import { useEffect } from "react";
import { useState } from "react";
export default function Home({ isLoggedIn }) {
  const navigate = useNavigate();
  // This keep track of the questions
  const [questions, setQuestions] = useState([]);
  // This to get data at start
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${import.meta.env.VITE_API_URL}`);
      const jsonData = await data.json();
      setQuestions(jsonData);
    };
    getData();
    const interval = setInterval(
      () => {
        getData();
      },
      10 * 60 * 1000,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="questions-page">
      <div className="questions-header">
        <h1>Question list page title</h1>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/createpost");
          }}
        >
          Post-Question
        </Button>
      </div>

      <main className="questions-container">
        {questions.map((question) => (
          <Question
            key={question.question_id}
            question={question}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </main>
    </div>
  );
}
