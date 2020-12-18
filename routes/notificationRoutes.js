const { Router } = require("express");
const auth = require("../middleware/auth");
const {
  getNotifications,
  createNotification,
  removeNotification,
  markAsRead,
} = require("../controllers/notificationControllers");

const router = Router();

router.get("/", auth, getNotifications);
router.post("/", createNotification);
router.put("/:id", auth, markAsRead);
router.delete("/:id", auth, removeNotification);

module.exports = router;
