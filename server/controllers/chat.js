import Chat from "../models/chat.js";
import Notifications from "../models/notification.js";

export const saveChat = async (req, res) => {
  const { chatId } = req.params;
  const newMessage = req.body;

  const chat = await Chat.findById(chatId);
  await chat.messages.push(newMessage);

  const updateChat = await Chat.findByIdAndUpdate(chatId, chat, {
    new: true,
  });
  res.send(updateChat);
};

export const getChats = async (req, res) => {
  const { id } = req.params;

  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: id } } }).sort({
      updatedAt: -1,
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const accessChat = async (req, res) => {
  const isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.body.senderId } } },
      { users: { $elemMatch: { $eq: req.body.recieverId } } },
    ],
  });

  if (isChat.length > 0) {
    await Notifications.findOneAndDelete({
      $and: [{ reciever: req.body.senderId }, { sender: req.body.recieverId }],
    });
    res.send(isChat[0]);
  } else {
    const chatData = new Chat({
      users: [req.body.senderId, req.body.recieverId],
      messages: [],
    });

    try {
      // const createdChat = await Chat.create(chatData);
      const createdChat = await chatData.save();
      const fullChat = await Chat.findOne({ _id: createdChat._id });
      res.status(200).send(fullChat);
    } catch (error) {
      console.log(error);
    }
  }
};
