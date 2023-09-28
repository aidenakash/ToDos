const mongoose = require("mongoose");
const { task } = require("./task.model");
const { taskList } = require("../todoTaskItems/taskList.model");


const findAllTask = async(id)=>{
  const response = await task.find({ userId: new mongoose.Types.ObjectId(id) });
  const result ={};
  result.docs =response;
  result.count = response.length;
  return result;
};
const findTaskCount = async(id)=>{
 return await task.countDocuments({ userId: new mongoose.Types.ObjectId(id) })
}

const findAllTaskAndItem = async (id)=>{
    const pipeline = [
        {$match:{userId:new mongoose.Types.ObjectId(id)}},
        {
          $lookup:{
            from: "todotasklists",
            localField: "_id",
            foreignField: "reference",
            as: "items"
          }
        },
        
     ]
     return await task.aggregate(pipeline);
};

const findTaskById = async(id)=>{
    return await task.findOne({_id: new mongoose.Types.ObjectId(id)});
};

const findTaskByIdWithTaskItem =async(id)=>{
 const pipeline = [
    {$match:{_id:new mongoose.Types.ObjectId(id)}},
    {
      $lookup:{
        from: "todotasklists",
        localField: "_id",
        foreignField: "reference",
        as: "items"
      }
    },
    
 ]
 return await task.aggregate(pipeline);
}

const createTask = async(newTask)=>{
    return await newTask.save();

};

const updateTask =async(id,update)=>{
    return await task.findOneAndUpdate({_id:id}, update);

};

const removeTask = async(id)=>{
    await task.deleteOne({_id:id});
  await taskList.deleteMany({reference:id})
return "delete"

  //   const session = await mongoose.startSession()
  // const transactionOptions = {
  //   readConcern: { level: "snapshot" },
  //   writeConcern: { w: "majority" },
  // };
  // const transaction =session.startTransaction(transactionOptions);
  // try {
  //   const tasks = await task.findOne({ _id: id }, { session });
  //   const reference = await taskList.findOne({reference:id},{session});
  //   await task.deleteOne({ _id: id }, { session });
  //   await taskList.deleteOne({ reference }, { session });
  //   await session.commitTransaction();
  // } catch (error) {
  //   await session.abortTransaction(next(AppError("error")))
  // }
 

}


module.exports = {
  findAllTask,
  findTaskCount,
  findTaskById,
  createTask,
  updateTask,
  removeTask,
  findTaskByIdWithTaskItem,
  findAllTaskAndItem,
};