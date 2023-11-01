require('dotenv').config()
const Question = require("../../models/question");
const Option = require("../../models/option");

// create question in database and give json response of that question
module.exports.create = async (req, res) => {
  try {
    let question = await Question.create({
      title: req.body.title,
      vote: false,
    });

    if (question) {
      return res.json(200, {
        message: "Question successfully Created",
        data: question,
      });
    } else {
      return res.json(400, {
        message: "Question not created",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// delete that question whose id is passed as a params in the url
module.exports.deleteQuestion = async function (req, res) {
  console.log(req.params.id);
  try {
    let deleteQues = await Question.findByIdAndDelete({ _id: req.params.id });
    if (deleteQues) {
      await Option.deleteMany({ question: req.params.id });

      return res.json(200, {
        message: "Question and associated options deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

// adding options to questions which are already present in the database

module.exports.addOptions = async function (req, res) {
  try {
    let ques = await Question.findById({ _id: req.params.id });
    // console.log(ques) ;
    const id = ques.options.length + 1;
    const uniqueId = `${req.params.id}${id}`;

    if (ques) {
      let option = await Option.create({
        id: uniqueId,
        question: req.params.id,
        text: req.body.text,
        votes: 0,
//         link_to_vote: `${process.env.APP_URL}/options/${uniqueId}/add_vote`,
        link_to_vote: `https://${req.headers.host}/options/${uniqueId}/add_vote`,
      });

      await ques.options.push(option);
      await ques.save();

      return res.status(200).json({
        message: "options added successfully !",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Error in creating options",
    });
    console.log("Error", err);
  }
};

// show the qustion and details whose id is passed as a params in the url
module.exports.showQuestion = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id).populate({
      path: "options",
    });

    if (question) {
      return res.status(200).json({
        message: "Here is the questions",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not does not exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server ",
      data: err,
    });
  }
};
