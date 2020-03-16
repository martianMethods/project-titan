/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ReviewsTiles.css";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import ImageComponent from "../Image/ImageComponent";

class ReviewTiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpfulness: 0,
      clicked: false
    };
  }

  // ////////// TODO ///////////////////////
  /**
 * Review Body - The review body will be a free-form multimedia input where the user can submit text and images regarding their experience with the product. 
                 The text submitted as part of the review will be between 50 and 1000 characters long.  
                 Users should be able to submit up to 5 images along with a single review.
                 By default, the first 250 characters of the review should display.  If the review is longer than 250 characters, below the body the a link reading “Show more” will appear.  Upon clicking this link, the review tile should expand and the rest of the review should display.
                 Any images that were submitted as part of the review should appear as *thumbnails* below the review text. Upon clicking a thumbnail, the image should open in a modal window, displaying at full resolution.  The only functionality available within this modal should be the ability to close the window. 
 
 * Reviewer name - The username for the reviewer will appear.  Only the username will appear. No email addresses or other personal information will display.  However, if the user’s email is associated to a sale in the system then next to the username the text “Verified Purchaser” will appear.
 * Rating Helpfulness - There is no data for "No" so only doing "Yes". Will add as future implementation

 */

  componentDidMount = () => {
    const { review } = this.props;
    this.setState({ helpfulness: review.helpfulness });
  };

  handleHelpfulness = ({ helper }) => {
    const { review } = this.props;
    const { helpfulness } = this.state;
    this.setState({ helpfulness: helpfulness + 1 });
    this.setState({ clicked: true });
    helper.putHelpfulReview(review.review_id, () => true);
  };

  render() {
    const { review } = this.props;
    const { helpfulness } = this.state;
    const { clicked } = this.state;
    const { date } = this.props;
    if (review.body.length < 50) {
      return null;
    }
    return (
      <dl>
        <React.Fragment key={review.review_id}>
          <Row className="layout">
            <Col className="layout">
              <Row className="layout">
                <Col className="layout" sm={2}>
                  <Row className="layout stars">
                    <StarRatings
                      rating={review.rating}
                      starDimension="1em"
                      starSpacing="0"
                    />{" "}
                  </Row>
                </Col>
                <Col className="layout" sm={{ offset: 3 }}>
                  <Row className="layout floaty">
                    {review.reviewer_name}, {date}
                  </Row>
                </Col>
              </Row>
              <Row className="layout">
                <Col className="layout">
                  <Row className="layout">
                    <strong>{review.summary.slice(0, 60)}</strong>
                  </Row>
                  {review.summary.length > 60 ? (
                    <Row className="layout">
                      {`... ${review.summary.slice(60)}`}
                    </Row>
                  ) : null}
                  {review.body.length <= 1000 ? (
                    <Row className="layout">{review.body}</Row>
                  ) : null}
                  {review.photos.length >= 1 ? (
                    <Row className="layout">
                      <ImageComponent
                        review={review}
                        reviewId={review.review_id}
                        photos={review.photos}
                      />
                    </Row>
                  ) : null}
                  <Row className="layout">
                    {review.recommend === 1 ? (
                      <p>&#10004; I recommend this product</p>
                    ) : null}
                  </Row>
                </Col>
              </Row>
              <Row className="layout">
                <Col className="layout response">
                  {typeof review.response === "string" &&
                  review.response !== "null" ? (
                    <dl>
                      <Row className="layout response">
                        Response From Seller:
                      </Row>
                      <Row className="layout response">{review.response}</Row>
                    </dl>
                  ) : null}
                </Col>
              </Row>
              <Row className="layout">
                Helpful?{" "}
                {clicked === false ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <p
                    name="helpfulness"
                    className="buffer"
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
