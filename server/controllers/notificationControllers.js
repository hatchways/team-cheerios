const mongoose = require("mongoose");

const Notification = require("../models/notificationModel");

exports.getNotifications = async (req, res) => {
  const userId = req.user._id;

  try {
    const notifications = await Notification.aggregate([
      { $match: { recipient: mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "polls",
          localField: "pollId",
          foreignField: "_id",
          as: "poll",
        },
      },
      {
        $unwind: {
          path: "$poll",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          type: 1,
          read: 1,
          createdAt: 1,
          poll: { $ifNull: ["$poll.question", null] },
          sender: { name: "$user.name", image: "$user.image" },
        },
      },
    ]);

    if (notifications.length === 0) res.send({ message: "No notification" });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.createNotification = async (req, res) => {
  try {
    validateInput(req.body);

    const newNotification = await new Notification({
      ...req.body,
    }).save();

    res.json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

const validateInput = (body) => {
  const { type, recipient, sender } = body;
  const validType = ["add", "vote", "accept", "send"];

  if (!mongoose.Types.ObjectId.isValid(recipient))
    throw new Error("RecipientId is not valid userId");

  if (!mongoose.Types.ObjectId.isValid(sender))
    throw new Error("SenderId is not valid userId");

  if (!validType.includes(type.toLowerCase()))
    throw new Error("Type is not validType");

  if (
    (type === "add" || type === "vote") &&
    !mongoose.Types.ObjectId.isValid(body.pollId)
  )
    throw new Error("Not valid pollId");

  return true;
};

exports.markAsRead = async (req, res) => {
  const userId = req.user._id;
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId,
    });
    if (!notification) throw new Error("Notification not found");
    if (notification.read) throw new Error("Already marked as read");

    await Notification.update(
      { _id: notificationId },
      { $set: { read: true } }
    );

    res.json({ message: `Updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(400).json(err.toString());
  }
};

exports.removeNotification = async (req, res) => {
  const userId = req.user._id;
  const notificationId = req.params.id;

  await Notification.remove(
    { _id: notificationId, recipient: userId },
    (err) => {
      if (err) res.status(500).json(err);

      res.json({ message: "Removed notification successfully" });
    }
  );
};

exports.deleteAll = async () => {
  await Notification.deleteMany();
};
