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

export const removeHope = async (id) =>{
  const hopes = await getAllHopes()
  const match = hopes.find(hope => hope.id == id)
  if(match){
    const newHopes = hopes.filter(item => item.id != id)
    await saveDB({hopes: newHopes})
    return id
  }
  return "Invalid ID, try again"
}
