import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Questions from "../q-a/Questions";
import AddQuestion from "../q-a/AddQuestion.jsx";
import "../q-a/QA.css";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchText: "",
      renderQuestions: 2,
      ShowModal: false
    };
  }

  ShowTwoMore = e => {
    this.setState(prevState => ({
      renderQuestions: prevState.renderQuestions + 2
    }));
  };

  SearchBox = event => {
    this.setState({ SearchText: event.target.value.toUpperCase() });
  };

  ShowModal = () => {
    this.setState({ ShowModal: !this.state.ShowModal });
  };

  render() {
    
    let questions = this.props.questions;

    function compare(a, b) {
      if (a.question_helpfulness < b.question_helpfulness) {
        return 1;
      }
      return -1;
    }

    questions = questions.sort(compare).slice(0, this.state.renderQuestions);
    if (this.state.SearchText.length >= 3) {
      questions = questions.filter(question =>
        question.question_body.toUpperCase().includes(this.state.SearchText)
      );
    }

    return (
      <div key={this.props.product_id}>
        <script src="vendor/mark.js/dist/mark.min.js"></script>
        {this.state.ShowModal === true ? (
          <AddQuestion
            currentProduct={this.props.currentProduct}
            ShowModal={this.ShowModal}
            Show={this.state.ShowModal}
          />
        ) : null}
        <Row className="layout">
          <FormControl
            size="lg"
            type="text"
            placeholder="Have a question? Search for answers…"
            onChange={this.SearchBox}
            id={this.state.SearchText}
          />
        </Row>
        {questions.map(question => (
          <Questions
            currentProduct={this.props.currentProduct}
            OneQuestion={question}
            key={question.question_id}
            SearchText={this.state.SearchText}
          />
        ))}
        {this.state.renderQuestions < this.props.questions.length &&
        this.props.questions.length > 2 ? (
          <Row className="layout">
            <Button
              size="sm"
              onClick={this.ShowTwoMore}
              style={{ padding: "1em", margin: "0.50em" }}
              variant="outline-primary"
            >
              MORE ANSWERED QUESTIONS
            </Button>
            <Button
              size="sm"
              style={{ padding: "1em", margin: "0.50em" }}
              onClick={this.ShowModal}
              variant="outline-primary"
            >
              ADD A QUESTION +
            </Button>
          </Row>
        ) : (
          <Row className="layout">
            <Button
              onClick={this.ShowModal}
              variant="outline-primary"
              style={{ padding: "1em" }}
            >
              ADD A QUESTION +
            </Button>
          </Row>
        )}
      </div>
    );
  }
}

export default List;
