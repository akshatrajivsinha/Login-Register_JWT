const router = require("express").Router();
const Employee = require("../models/Employee");
const verify = require("../jwkverify")



router.get("/",verify,async (req, res) => {
  try {
    const result = await Employee.find();
    res.json(result);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error blank" });
    }
  });
  
  
  router.get("/filter",async (req, res) => {
    
    try {
      const result = await Employee.find({$or:[{name:req.query.name},{email:req.query.email},{id:req.query.id}]});
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/:id",verify,async (req, res) => {
    try {
      const result = await Employee.findOne({_id:req.params.id});
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error id" });
    }
  });
  
  router.delete("/:employee_id",verify, async (req, res) => {
    try {
      await Employee.deleteOne({ _id: req.params.employee_id });
      res.status(200).json("employee deleted");
    } catch (err) {
      res.status(500).json("error");
    }
  });
  
  router.post("/create", async (req, res) => {
    try {
          const email = await Employee.findOne({email:req.body.email})
          if(email) return(res.status(503).json("email has already been used"))
      
      const saveuser = new Employee(req.body);
      const rest = await saveuser.save();
      res.status(201).json(rest);
    } catch (err) {
      res.status(500).json("error");
    }
  });
  
  router.put("/:id",async (req,res) => {
    try{
        const email = await Employee.findOne({email:req.body.email})
        if(email) return(res.status(503).json("email has already been used"))
        const updatedPost = await Employee.findByIdAndUpdate(req.params.id,{$set: req.body,},{new:true});
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router;