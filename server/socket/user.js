const onlineUsers = new Map();

const addOnlineUser = (socketId, userId) => {
  if (onlineUsers.has(userId)) {
    onlineUsers.get(userId).add(socketId);
  } else {
    onlineUsers.set(userId, new Set([socketId]));
  }
};

const removeOfflineUser = (socketId, userId) => {
  if (onlineUsers.has(userId)) {
    let userSocketIds = onlineUsers.get(userId);
    userSocketIds.delete(socketId);

    if (userSocketIds.size === 0) onlineUsers.delete(userId);
  }
};

const getOnlineUsers = () => [...onlineUsers.keys()];

module.exports = { addOnlineUser, removeOfflineUser, getOnlineUsers };
