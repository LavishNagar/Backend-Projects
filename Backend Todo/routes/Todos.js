const express =require("express");
const router = express.Router();

//import controller
const {createTodo}=require("../controllers/createTodo");

const {UpdateTodo}=require("../controllers/UpdateTodo");
const {deleteTodo}=require("../controllers/deleteTodo");


const {getTodo, getTodobyId}=require("../controllers/getTodo");

//define Api routes  // route ki controller se mapping
router.post("/createTodo",createTodo); 
router.get("/getTodo",getTodo);
router.get("/getTodo/:id",getTodobyId);
router.put("/UpdateTodo/:id",UpdateTodo);
router.delete("/deleteTodo/:id",deleteTodo);


module.exports = router;