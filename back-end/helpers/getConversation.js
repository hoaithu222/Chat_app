import { ConversationModel } from "../models/Conversation.js";

export default async function getConversation(userId) {
    if (userId) {
        const currentUserConversation = await ConversationModel.find({
            "$or": [
                { sender: userId },
                { receiver: userId }
            ]
        }).sort({ updateAt: -1 }).populate('message').populate('sender').populate('receiver')

        const conversation = currentUserConversation.map((conv) => {

            const userIdStr = userId.toString();

            const countUnseenMsg = conv.message.reduce((prev, curr) => {

                if (curr.msgByUserId?.toString() !== userIdStr && curr.seen === false) {
                    return prev + 1;
                }
                return prev;
            }, 0);

            return {
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: countUnseenMsg,
                lastMsg: conv.message[conv?.message?.length - 1],
            }
        });

        return conversation;
    } else {
        return []
    }
}