import User from "../models/User.model.js";
import PointsTxn from "../models/PointsTxn.model.js";
import Notification from "../models/Notification.model.js";

// Event keys and default deltas for content actions
export const CONTENT_EVENT_POINTS = {
  CREATE_SHASTAR: 20,
  CREATE_RESOURCE: 20,
  CREATE_POST: 15,
  CREATE_COMMENT: 5,
  LIKE_CONTENT: 1,
  UNLIKE_CONTENT: 0,
};

export async function awardPoints(userId, eventKey, meta = {}) {
  const delta = CONTENT_EVENT_POINTS[eventKey] ?? 0;
  if (!delta) return null;

  const user = await User.findById(userId);
  if (!user) return null;

  const current = user.points || 0;
  const balanceAfter = current + delta;
  user.points = balanceAfter;
  await user.save();

  await PointsTxn.create({
    uid: user._id,
    user: user.name,
    type: eventKey,
    points: delta,
    balanceAfter,
    meta,
  });

  try {
    await Notification.create({
      user: user._id,
      type: "like",
      message: `+${delta} points for ${eventKey.replace(/_/g, ' ').toLowerCase()}`,
      link: meta.link || undefined,
    });
  } catch (e) {
    // ignore notification failures
  }

  return balanceAfter;
}
