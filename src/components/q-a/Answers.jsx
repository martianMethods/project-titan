import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnswerImages from "../q-a/AnswerImages.jsx";
const helper = require("../../helper/helper.js");

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      hasVoted: false
    };
  }

  componentDidMount() {
    this.setState({
      helpfulness: this.props.OneAnswer.helpfulness
    });
  }

  VoteHelpful = () => {
    if (!this.state.hasVoted) {
      this.setState({
        hasVoted: true,
        helpfulness: this.state.helpfulness + 1
      });
      helper.putHelpfulAnswer(this.props.OneAnswer.id, () => true);
    }
  };

  render() {
    return (
      <Row className="layout" key={this.props.OneAnswer.id}>
        {this.props.index === 0 ? (
          <b>A:&nbsp;&nbsp;</b>
        ) : (
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        )}

        <Col className="layout" sm={9}>
          <Row className="layout">
            <Col className="layout">
              <Row className="layout">
                <p>{this.props.OneAnswer.body}</p>
              </Row>
              <Row className="layout">
                {this.props.OneAnswer.photos.map(image => (
                  <AnswerImages photo={image} key={image} />
                ))}
              </Row>
              <Row className="layout" style={{ padding: "2em, 0em, 0em, 0em" }}>
                By&nbsp;
                {this.props.OneAnswer.answerer_name === "Seller" ? (
                  <strong>{this.props.OneAnswer.answerer_name}</strong>
                ) : (
                  this.props.OneAnswer.answerer_name
                )}
                &nbsp;on&nbsp;
                {new Date(this.props.OneAnswer.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  }
                )}
                &nbsp; | Helpful?&nbsp;
                <div onClick={this.VoteHelpful}>
                  <u>Yes</u> ({this.state.helpfulness})
                </div>
                &nbsp; | Report
              </Row>
            </Col>
          </Row>
          <Row className="layout">
            <Col className="layout">
              <Row className="layout" style={{ padding: "5%" }}></Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Answers;
