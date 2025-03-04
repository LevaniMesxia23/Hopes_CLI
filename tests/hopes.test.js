import {expect, jest} from "@jest/globals"

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn()
}))

const {insertDB, getDB, saveDB} = await import("../src/db.js")

const {newHope,getAllHopes, removeHope} = await import("../src/hopes.js")

beforeEach(() => {
  insertDB.mockClear(),
  getDB.mockClear(),
  saveDB.mockClear()
})

test("newHope should call insertDB with the correct arguments", async () => {
  const hope = {
    content: "test hope",
    tags: ["happy", "sad"],
    id: Date.now()
  };
  const result = await newHope(hope.content, hope.tags)
  expect(result).toEqual(hope)
})

test("getAllHopes returns all hopes", async () => {
  const db = {
    hope: ["hope1", "hope2", "hope3"]
  };
  getDB.mockResolvedValue(db)
  const result = await getAllHopes()
  expect(result).toEqual(db.hope)
})

test("removeHope should call saveDB with the correct arguments", async () => {
  const db = {
    hope: [{id: 1, content: "hope1", tags: ["happy", "sad"]}]
  }
  saveDB.mockResolvedValue(db)
  const result = await removeHope(1)
  expect(result).toBe("Invalid ID, try again")
})