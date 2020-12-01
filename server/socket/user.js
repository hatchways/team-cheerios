const onlineUsers = new Map();

const addOnlineUser = (socketId, userId) => {
  const alreadyIn = onlineUsers.has(userId);
  if (alreadyIn) return false;

  onlineUsers.set(userId, socketId);
  return true;
};

const removeOfflineUser = (userId) => onlineUsers.delete(userId);

module.exports = { addOnlineUser, removeOfflineUser };
