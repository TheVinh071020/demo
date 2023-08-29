import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Index() {
  const [quesList, setQuesList] = useState([]);
  const [randomQues, setRandomQues] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/questions")
      .then((res) => {
        setQuesList(res.data.questions);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (quesList.length > 0) {
      const number = Math.floor(Math.random() * quesList.length);
      setRandomQues(quesList[number]);
    }
  }, [quesList]);
  console.log(randomQues);

  const handleDisLike = () => {
    if (randomQues.id) {
      const updatedQuestion = { ...randomQues };
      updatedQuestion.dislike += 1;
      axios
        .put(`http://localhost:3000/api/v1/questions/${updatedQuestion.id}`, {
          content: updatedQuestion.content,
          like: updatedQuestion.like,
          dislike: updatedQuestion.dislike,
        })
        .then((res) => {
          setRandomQues(updatedQuestion);
          navigate(`/detail/${updatedQuestion.id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLike = () => {
    if (randomQues.id) {
      const updatedQuestion = { ...randomQues };
      updatedQuestion.like += 1;
      axios
        .put(`http://localhost:3000/api/v1/questions/${updatedQuestion.id}`, {
          content: updatedQuestion.content,
          like: updatedQuestion.like,
          dislike: updatedQuestion.dislike,
        })
        .then((res) => {
          setRandomQues(updatedQuestion);
          navigate(`/detail/${updatedQuestion.id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRandom = () => {
    console.log();
  };

  return (
    <div>
      <>
        <button className="btn" id="like" onClick={handleRandom}>
          Random comment
        </button>
        <section className="main-content">
          <div className="question-content">{randomQues.content}</div>
          <div className="btn-group">
            <button className="btn" id="dislike" onClick={handleDisLike}>
              Sai/Không/Dislike
            </button>
            <button className="btn" id="like" onClick={handleLike}>
              Đúng/Có/Like
            </button>
          </div>
        </section>
      </>
    </div>
  );
}

export default Index;
