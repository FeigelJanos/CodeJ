const startupSQLQueryList = [
  {
    query: `CREATE TABLE IF NOT EXISTS users(user_id serial primary key, email varchar(254) NOT NULL, user_name varchar(100) NOT NULL, password varchar(200) NOT NULL, activation_id varchar(20) NOT NULL, user_type char(3) NOT NULL, status varchar(10), activity json NOT NULL, register_date timestamp NOT NULL, update_date timestamp, storno_date timestamp)`,
    params: null,
    name: "users",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS private_message(message_id serial primary key, sender_id integer NOT NULL, recipient_id integer NOT NULL, message text NOT NULL, status char(1) NOT NULL, sent_date timestamp NOT NULL, reply_to integer, FOREIGN KEY (sender_id) REFERENCES users(user_id), FOREIGN KEY (recipient_id) REFERENCES users(user_id))`,
    params: null,
    name: "private-messages",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS quizes(quiz_id serial primary key, quiz_content json NOT NULL, create_date timestamp NOT NULL, update_date timestamp, storno_date timestamp)`,
    params: null,
    name: "quizes",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS lesson_texts(lesson_text_id serial primary key, lesson_text json NOT NULL, create_date timestamp NOT NULL, update_date timestamp, storno_date timestamp)`,
    params: null,
    name: "lesson_texts",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS practice_tasks(task_id serial primary key, task_name varchar(100), connected_lessons json NOT NULL, task_text text NOT NULL, task_tests json NOT NULL, task_solutions json NOT NULL, create_date timestamp NOT NULL, update_date timestamp, storno_date timestamp)`,
    params: null,
    name: "practice_tasks",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS lessons(lesson_id serial primary key, lesson_name varchar(150) NOT NULL, topic varchar(30) NOT NULL, language varchar(5) NOT NULL, level varchar(1) NOT NULL, video_url varchar(250), version integer NOT NULL, text_id integer, tags text[] NOT NULL, quiz_id integer, practice_tasks text[], likes integer, dislikes integer, create_date timestamp NOT NULL, update_date timestamp, storno_date timestamp, FOREIGN KEY (text_id) REFERENCES lesson_texts(lesson_text_id), FOREIGN KEY (quiz_id) REFERENCES quizes(quiz_id))`,
    params: null,
    name: "lessons",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS lesson_messages(lesson_message_id serial primary key, lesson_id integer NOT NULL, message_text text NOT NULL, sender_id integer NOT NULL, FOREIGN KEY (sender_id) REFERENCES users(user_id))`,
    params: null,
    name: "lesson_messages",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS user_lessons(user_lessons_id serial primary key, user_id integer NOT NULL, lesson_list_beginner json, lesson_list_intermediate json, lesson_list_expert json, projects_completed json, certificates json, update_date timestamp, storno_date timestamp, lessons_liked integer[], lessons_disliked integer[], FOREIGN KEY (user_id) REFERENCES users(user_id))`,
    params: null,
    name: "user_lessons",
  },
  {
    query: `CREATE TABLE IF NOT EXISTS projects(project_id serial primary key, project_name varchar(100) NOT NULL, project_topic varchar(200) NOT NULL, project_content json NOT NULL, tags json, tests json)`,
    params: null,
    name: "projects",
  },
];

module.exports = startupSQLQueryList;
