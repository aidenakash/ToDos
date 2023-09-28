const { taskList } = require("./taskList.model");
const repository = require("./taskList.repository");

const getAllTaskItem = async (req, res) => {
  try {
    const Users = await repository.findAllTaskItem();
    res.status(200).send(Users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getAllTaskItemById = async (req, res) => {
  try {
    const id = req.params.id
    const Users = await repository.findAllTaskItemById(id);
    res.status(200).send(Users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getAllTaskItemCount = async (req, res, next) => {
  try {
    const Users = await repository.findAllTaskItem();
    res.status(200).send(Users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getTaskItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const User = await repository.findTaskItemById(id);
    if (!User) {
      res.status(404).send("Data Not Found");
    } else {
      res.status(200).send(User);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const createTaskItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newTask = new taskList({
      reference:id,
      taskItem: req.body.taskItem,
      DueDate: req.body.DueDate,
    });
    const saveTask = await repository.createTaskItem(newTask);
    console.log(saveTask);
    if (saveTask) {
      console.log("User saved successfully");
      return res.status(201).send(saveTask);
    } else {
      console.log("User not saved");
      return res.status(400).send("Error saving User");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const updateTaskItem = async (req, res) => {
  
  try {
    const id = req.params.id;
    const User = await repository.findTaskItemById(id);
    console.log(User)
    if (User) {
      const update = {
        taskItem: req.body.taskItem,
        DueDate: req.body.DueDate,
      };
      await repository.updateTaskItem(id, update);
      const User = await repository.findTaskItemById(id);

      return res.status(200).send(User);
    }
    res.status(404).send("Data Not found");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const updateTaskStatus = async(req,res)=>{
  const id = req.params.id;
  try{
    const  User=repository.findTaskItemById(id)
    if(User){
      await repository.updateStatus(id);
      return res.status(200).send("status update")
    }
  }catch(error){
    console.log(error);
    return res.status(500).send(error);
  }
}


const deleteTaskItem = async (req, res) => {
  const id = req.params.id;
  try {
    const User = await repository.findTaskItemById(id);
    if (User) {
      await repository.removeTaskItem(id);
      return res.status(200).send("DELETED");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getAllTaskItem,
  getAllTaskItemById,
  getAllTaskItemCount,
  getTaskItemById,
  createTaskItem,
  updateTaskItem,
  updateTaskStatus,
  deleteTaskItem,
};
