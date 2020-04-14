/**
   * Use of Parameters:
  http://example.com/page?parameter=value&also=another
  * */

// ///////////////// PRODUCTS ////////////////////////////////

const apiAddress="http://52.26.193.201:3000"
// const apiAddress="http://18.224.200.47"
const qaAddress="http://localhost:4000"
const overviewAddress="http://localhost:3000" // product overview

const getAllProducts = callback => {
  fetch(`${apiAddress}/products/list`) // CHANGE: default is 5. example: /?count=50 to get 50...
  // fetch(`${overviewAddress}/products/list`) // CHANGE: default is 5. example: /?count=50 to get 50...
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
  // returns array of objects with id, name, description, ...
};

// example how to use:
// getAllProducts(result => console.log(result));

const getOneProduct = (productId, callback) => {
  fetch(`${apiAddress}/products/${productId}`)
  // fetch(`${overviewAddress}/productsdb/${productId}`)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
  // returns object with id, name, description, ...
};

const getOneProductStyle = (productId, callback) => {
  // console.log("h: gOPS: ENTER: productId, callback: ", productId, callback);
  fetch(`${apiAddress}/products/${productId}/styles`)
  // fetch(`${overviewAddress}/productsdb/${productId}/styles`)
  // console.log("h: gOPS: LEAVE: data, callback: ", this.data, callback)
  .then(response => response.json())
    .then(data => callback(data))
    // console.log("h: gOPS: LEAVE: data, callback: ", this.data, callback)
    .catch(err => true);
  // returns object with style_id, name, prices, photos,...
};

const getRelatedProductsIds = (productId, callback) => {
  fetch(`${apiAddress}/products/${productId}/related`)
    .then(response => response.json())
    .then(data => callback(data)) // CHANGE: to do what you want with it
    .catch(err => true);
  // This returns an array of related product id's
};

// ////////////Questions And Answers///////////////////

// Retrieves a list of questions for a particular product.
// This list does not include any reported questions
const getListQuestions = (productId, callback) => {
  // fetch(`${apiAddress}/qa/${productId}?count=999999`) // CHANGE: default is 5. example: /?count=50 to get 50...
  fetch(`${qaAddress}/qa/${productId}?count=999999`) // CHANGE: default is 5. example: /?count=50 to get 50...
    .then(response => response.json())
    .then(data => callback(data)) // CHANGE: to do what you want with it
    .catch(err => true);
  // returns object of productId, results: {questionId, question_body...}
};

const getAnswersList = (questionId, callback) => {
  fetch(`${apiAddress}/qa/${questionId}/answers`) // CHANGE: default is 5. example: /?count=50 to get 50...
  // fetch(`${qaAddress}/qa/${questionId}/answers`) // CHANGE: default is 5. example: /?count=50 to get 50...
    .then(response => response.json())
    .then(data => callback(data)) // CHANGE: to do what you want with it
    .catch(err => true);
  // returns an object with a results array that has more info
};

// Adds a question for the given product
const postAQuestion = (productId, body, name, email, callback) => {
  // Parameter | Type | Description
  // ------------------------------------------------
  // body | text | Text of question being asked
  // name | text | Username for question asker
  // email| text | Email address for question asker

  // fetch(`${apiAddress}/qa/${productId}`, {
  fetch(`${qaAddress}/qa/${productId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      body,
      name,
      email
    })
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
};

// Add an Answer
const postAnAnswer = (questionId, body, name, email, photos, callback) => {
  // Parameter | Type | Description
  // ------------------------------------------------
  // body | text | Text of question being asked
  // name | text | Username for question asker
  // email| text | Email address for question asker
  // phone|[text]| an array of urls corresponding to images to display

  // fetch(`${apiAddress}/qa/${questionId}/answers`, {
  fetch(`${qaAddress}/qa/${questionId}/answers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      body,
      name,
      email,
      photos
    })
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
};

// Updates a question to show it was found helpful
const putHelpfulQuestion = (questionId, callback) => {
  // fetch(`${apiAddress}/qa/question/${questionId}/helpful`, {
  fetch(`${qaAddress}/qa/question/${questionId}/helpful`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => callback(data))
    .catch(err => true);
};

const putReportQuestion = (questionId, callback) => {
  // fetch(`${apiAddress}/qa/question/${questionId}/report`, {
  fetch(`${qaAddress}/qa/question/${questionId}/report`, {
      method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => callback(data))
    .catch(err => true);
};

const putHelpfulAnswer = (answerId, callback) => {
  // fetch(`${apiAddress}/qa/answer/${answerId}/helpful`, {
  fetch(`${qaAddress}/qa/answer/${answerId}/helpful`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json:"
    }
  })
    .then(data => callback(data))
    .catch(err => true);
};

const putReportAnswer = (answerId, callback) => {
  // fetch(`${apiAddress}/qa/answer/${answerId}/report`, {
  fetch(`${qaAddress}/qa/answer/${answerId}/report`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json:"
    }
  })
    .then(data => callback(data))
    .catch(err => true);
};

// ///////// REVIEWS ////////////////////////////////

// Returns a list of reviews for a particular product.
// This list does not include any reported reviews
const getListReviews = (productId, sortedBy, callback) => {
  fetch(
    `${apiAddress}/reviews/${productId}/list/?count=99999999&sort=${sortedBy}`
  )
    // You can sort by /?sort="helpful" or "newest" or ...
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
};
// example:
// getListReviews(3, data => console.log(data));

// Returns review metadata for a given product
const getReviewMetadata = (productId, callback) => {
  fetch(`${apiAddress}/reviews/${productId}/meta`) // You can sort by /?sort="helpful" or "newest" or ...
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
  // this returns an object with results which has RATINGS, recommend, and summary...
};

const postReview = (productId, review, callback) => {
  /**
     * Parameter | Type     | Description
     * ------------------------------------------------------------
       rating        |    int      | Integer (1-5) indicating the review rating
       summary         | text     | Summary text of the review
       body            |    text     | Continued or full text of the review
       recommend       | bool     | Value indicating if the reviewer recommends the product
       name text       |  Username   | for question asker
       email        |    text     | Email address for question asker
       photos        |   [text]  | Array of text urls that link to images to be shown
       characteristics |   object  | Object of keys representing characteristic_id and
                                     values representing the review value for that
                                     characteristic. { "14": 5, "15": 5 //...}
     */

  //* **EITHER send it over in one object called review OR in individual parts***//

  //   let review = {
  //     rating: rating,
  //     summary: summary,
  //     body: body,
  //     recommend: recommend,
  //     name: name,
  //     email: email,
  //     photos: [],
  //     characteristics: characteristics
  //   };

  // Add a review
  fetch(`${apiAddress}/reviews/${productId}/`, {
    // You can sort by /?sort="helpful" or "newest" or ...
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review) // we need to make sure this is an object of all necessary info
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => true);
  // this returns an object with results which has RATINGS, recommend, and summary...
};

// Updates a review to show it was found helpful
const putHelpfulReview = (reviewId, callback) => {
  fetch(`${apiAddress}/reviews/helpful/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => callback(data))
    .catch(err => true);
};

const calculateReviewRating = ratings => {
  const calculated =
    ((ratings["1"] || 0) +
      (ratings["2"] || 0) * 2 +
      (ratings["3"] || 0) * 3 +
      (ratings["4"] || 0) * 4 +
      (ratings["5"] || 0) * 5) /
      ((ratings["1"] || 0) +
        (ratings["2"] || 0) +
        (ratings["3"] || 0) +
        (ratings["4"] || 0) +
        (ratings["5"] || 0)) || null;

  return Math.trunc(calculated * 100) / 100;
};

// const calculateStarRating = productMetaData => {
//   let average = calculateReviewRating(productMetaData);
//   let stars = { whole: 0, half: 0, quarter: 0, threeQuarter: 0 };
//   stars.whole =
//     average - (average % 1)(average % 1 >= 0.5 && average % 1 < 0.75)
//       ? (stars.half = 1)
//       : average % 1 >= 0.25 && average % 1 < 0.5
//       ? (stars.quarter = 1)
//       : average % 1 >= 0.75
//       ? (stars.threeQuarter = 1)
//       : null;
//   return stars;
// };

module.exports = {
  getAllProducts,
  getOneProduct,
  getOneProductStyle,
  getRelatedProductsIds,
  getListQuestions,
  getAnswersList,
  postAQuestion,
  postAnAnswer,
  putHelpfulQuestion,
  putReportQuestion,
  putHelpfulAnswer,
  putReportAnswer,
  getListReviews,
  getReviewMetadata,
  postReview,
  putHelpfulReview,
  calculateReviewRating
  // calculateStarRating
};
