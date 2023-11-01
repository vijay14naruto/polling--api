const Option = require("../../models/option");


// add votes to options 
module.exports.addVote = async (req, res) => {

  try {
    let option = await Option.findOne({id : req.params.id});
    // console.log(option) ; 
    if (option) {
      const currentvote = option.votes + 1;
      // console.log("currentvote", currentvote);
      option.votes = currentvote ; 
      await option.save() ; 
      
      return res.status(501).json({
        message : "votes added successfully" 
      })

    }
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating votes",
      Error: error,
    });
  }
};

// delete options 

module.exports.deleteOption = async (req , resp)=>{
   const option = await Option.findOneAndRemove({ id:req.params.id});
   if(!option){
    resp.status(500).json(err);
   }
   resp.status(200).json({ message : "option deleted successfully" })

  }

