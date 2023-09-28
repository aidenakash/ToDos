const express = require("express");
const router = express.Router();
const AppError = require("../error/Apperror");
const globalErrorController = require("../error/errorControl");
const inputValidation = require("./task.inputValidation");
const service = require("./task.services");
const authVerify = require("../middleware/auth.middleware");

router.get("/getAllTask", authVerify.userAuthVerification, service.getAllTask);
router.get(
  "/getAllTaskCount",
  authVerify.userAuthVerification,
  service.getAllTaskCount
);
router.get(
  "/getAllTaskAndItem",
  authVerify.userAuthVerification,
  service.getAllTaskAndTaskItems
);
router.get(
  "/getTaskById/:id",
  authVerify.userAuthVerification,
  service.getTaskById
);
router.post(
  "/createTask",
  authVerify.userAuthVerification,
  inputValidation.createTaskInputValidation,
  service.createTask
);
router.put(
  "/updateTaskById/:id",
  authVerify.userAuthVerification,
  inputValidation.updateTaskInputValidation,
  service.updateTask
);
router.delete(
  "/deleteTaskById/:id",
  authVerify.userAuthVerification,
  service.deleteTask
);

router.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} in the server`, 404));
});

router.use(globalErrorController);

module.exports = router;
