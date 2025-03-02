import { getDB, saveDB, insertDB } from "./db.js";

export const newHope = async (hope, tags) => {
  const data = {
    tags,
    content: hope,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getAllHopes = async () => {
  const db = await getDB();
  return db.hopes;
};

export const findHope = async (filter) => {
  const hopes = await getAllHopes();
  return hopes.filter((hope) =>
    hope.content.toLowerCase().includes(filter.toLowerCase())
  );
};
