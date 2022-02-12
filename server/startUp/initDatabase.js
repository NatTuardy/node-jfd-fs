const professionMock = require("../mock/profession.json");
const qualitiesMock = require("../mock/qualities.json");
const Profession = require("../models/Profession");
const Quality = require("../models/Quality");

module.exports = async () => {
  const profession = await Profession.find();
  if (profession.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }

  const quality = await Quality.find();
  if (quality.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
