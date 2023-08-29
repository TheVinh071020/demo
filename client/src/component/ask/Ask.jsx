import React, { useState } from "react";
import "./ask.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ask() {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };
  console.log(input.input);

  const clickSubmit = (e) => {
    e.preventDefault();
    if (input.input == "") {
      alert("Nhaapj vao");
      return;
    } else {
      const questions = {
        id: Math.floor(Math.random() * 1000000),
        content: input.input,
        like: 0,
        dislike: 0,
      };
      axios
        .post("http://localhost:3000/api/v1/questions", questions)
        .then((res) => {
          navigate("/index");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <section className="main-content">
        <h1>Hãy hỏi cộng đồng một câu hỏi đúng/sai hoặc có/không</h1>
        <div className="container">
          <div className="row">
            <div className="ask-area">
              <form className="main-form" onSubmit={clickSubmit}>
                <textarea
                  className="question-content"
                  name="input"
                  id="ask-question"
                  cols={150}
                  rows={15}
                  defaultValue={""}
                  onChange={handleInput}
                />
                <div>
                  Ký tự còn lại
                  <span className="letter">
                    {input?.input ? 200 - +input.input?.length : 200}
                  </span>
                  /200
                </div>
                <br />
                <input id="submit-btn" type="submit" defaultValue="Gửi" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Ask;
