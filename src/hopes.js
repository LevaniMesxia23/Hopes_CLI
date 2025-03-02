import { getDB, saveDB, insertDB } from "./db.js";

export const newHope = async (hope,tags) =>{
  const data = {
    tags,
    content: hope,
    id: Date.now()
  }
  await insertDB(data)
  return data
}

