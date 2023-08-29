import React, { useEffect, useState } from "react";
import "./detail.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [quesTotal, setQuesTotal] = useState();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/questions/${id}`)
      .then((res) => {
        setQuestion(res.data.question);
        setQuesTotal(res.data.question.like + res.data.question.dislike);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(quesTotal);

  return (
    <div>
      <>
        <div className="main-content">
          <div className="question-content">{question?.content}</div>
          <div className="vote">
            <span className="vote-number">{quesTotal}</span> vote
          </div>
          <div className="rate-bar">
            <div
              className="dislike"
              style={{ width: (question?.dislike / quesTotal) * 1000 }}
            >
              {Math.floor((question?.dislike / quesTotal) * 100)}%
            </div>
            <div
              className="like"
              style={{ width: (question?.like / quesTotal) * 1000 }}
            >
              {Math.floor((question?.like / quesTotal) * 100)}%
            </div>
          </div>
          <div className="btn">
            <Link to={"/index"}>
              <button id="btn">Xem câu hỏi khác</button>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
}

export default Detail;
