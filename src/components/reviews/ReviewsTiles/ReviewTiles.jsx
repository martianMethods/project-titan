/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ReviewsTiles.css";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
// import Highlighter from "react-highlight-words";
import ImageComponent from "../Image/ImageComponent";
import Button from "react-bootstrap/Button";

class ReviewTiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpfulness: 0,
      clicked: false,
      showMore: false
      // activeIndex: -1
    };
  }

  componentDidMount = () => {
    const { review } = this.props;
    this.setState({ helpfulness: review.helpfulness });
  };

  handleHelpfulness = () => {
    const { helper } = this.props;
    const { review } = this.props;
    const { helpfulness } = this.state;
    this.setState({ helpfulness: helpfulness + 1 });
    this.setState({ clicked: true });
    helper.putHelpfulReview(review.review_id, () => true);
  };

  showMore = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  render() {
    const { review } = this.props;
    const { helpfulness } = this.state;
    const { clicked } = this.state;
    const { date } = this.props;
    // const { activeIndex } = this.state;
    if (review.body.length < 50) {
      return null;
    }
    return (
      <dl className=" layout spreadOut">
        <script src="vendor/mark.js/dist/mark.min.js"></script>
        <React.Fragment key={review.review_id}>
          {/* <b>
            <Highlighter
              highlightClassName=""
              activeIndex={activeIndex}
              searchWords={[...this.props.search]}
              autoEscape={true}
              textToHighlight={review.body}
              style={{ padding: "unset" }}
            />
          </b> */}
          <Col>
            <Row className="layout noBorder">
              <Col className="layout noBorder">
                <Row className="layout noBorder">
                  <Col className="layout noBorder">
                    <Row className="layout stars noBorder">
                      <StarRatings
                        rating={review.rating}
                        starDimension="1em"
                        starSpacing="0"
                      />{" "}
                    </Row>
                    {/* </Col>
                  <Col className="layout noBorder" sm={{ offset: 3 }}> */}
                    <Row
                      className="layout floaty noBorder"
                      style={{ fontSize: "small" }}
                    >
                      {review.reviewer_name}, {date}
                    </Row>
                  </Col>
                </Row>
                <Row className="layout noBorder">
                  <Col className="layout noBorder">
                    <Row className="layout noBorder">
                      <strong>{review.summary.slice(0, 60)}</strong>
                    </Row>
                    {review.summary.length > 60 ? (
                      <Row className="layout noBorder summaryRow">
                        {`... ${review.summary.slice(60)}`}
                      </Row>
                    ) : null}
                    {review.body.length >= 250 &&
                    review.body.length <= 1000 &&
                    this.state.showMore === false ? (
                      <Row className="layout noBorder">
                        {review.body.slice(0, 200) + "..."}
                        <Button
                          name="showMore"
                          className="showBtn"
                          onClick={this.showMore} //////////////////////HERE!!!!!!!!!!!!!!!!!
                        >
                          Show more
                        </Button>
                      </Row>
                    ) : (
                      <Row className="layout noBorder">{review.body}</Row>
                    )}
                    {/* {review.body.length <= 1000 ? (
                    <Row className="layout">{review.body}</Row>
                  ) : null} */}
                    <Row className="layout noBorder">
                      {review.photos.length >= 1
                        ? review.photos.map((photo, i) => (
                            <ImageComponent
                              photo={photo.url}
                              id={photo.id}
                              handleShowImage={this.handleShowImage}
                              // eslint-disable-next-line react/no-array-index-key
                              key={i}
                            />
                          ))
                        : null}
                    </Row>
                    <Row className="layout noBorder">
                      {review.recommend === 1 ? (
                        <p>&#10004; I recommend this product</p>
                      ) : null}
                    </Row>
                  </Col>
                </Row>
                <Row className="layout noBorder">
                  <Col className="layout response noBorder">
                    {typeof review.response === "string" &&
                    review.response !== "null" ? (
                      <dl>
                        <Row className="layout response noBorder">
                          <strong>Response From Seller:</strong>
                        </Row>
                        <Row className="layout response noBorder">
                          {review.response}
                        </Row>
                      </dl>
                    ) : null}
                  </Col>
                </Row>
                <Row className="layout imgBorder">
                  Helpful?{" "}
                  {clicked === false ? (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <p
                      name="helpfulness"
                      className="buffer pointer"
                      onClick={() => this.handleHelpfulness()}
                      type="disabled"
                    >
                      Yes
                    </p>
                  ) : (
                    <p className="buffer">Yes</p>
                  )}
                  ({helpfulness}) | Report
                </Row>
              </Col>
            </Row>
          </Col>
        </React.Fragment>
      </dl>
    );
  }
}

ReviewTiles.propTypes = {
  review: PropTypes.objectOf(PropTypes.shape),
  date: PropTypes.string
};

ReviewTiles.defaultProps = {
  review: {},
  date: ""
};

export default ReviewTiles;
