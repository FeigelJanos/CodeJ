const inserFinishedLessons = require("../../models/sql/insert-finished-lessons.model");
const insertFinishedLessons = require("../../models/sql/insert-finished-lessons.model");

module.exports = saveProgress;

async function saveProgress(progress, userId) {
  if (progress.lessons.length > 0) {
    insertFinishedLessons(progress.lessons, userId);
  }
}
