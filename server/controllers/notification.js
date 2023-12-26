import Notifications from "../models/notification.js";

export const fetchNotis = async (req, res) => {
  const { id } = req.params;

  try {
    const notis = await Notifications.find({ reciever: id });
    res.send(notis);
  } catch (error) {
    console.log(error);
  }
};

export const saveNotification = async (req, res) => {
  const newNotification = new Notifications(req.body);

  const isNotification = await Notifications.find({
    $and: [{ reciever: req.body.reciever }, { sender: req.body.sender }],
  });

  if (isNotification.length > 0) {
    const updatedNotification = await Notifications.findOneAndUpdate(
      { $and: [{ reciever: req.body.reciever }, { sender: req.body.sender }] },
      req.body,
      { new: true }
    );
    res.send(updatedNotification);
  } else {
    try {
      await newNotification.save();
      res.send(newNotification);
    } catch (error) {
      console.log(error);
    }
  }
};
