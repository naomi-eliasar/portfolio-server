const { Router } = require("express");
const router = new Router();
const auth = require("../auth/middleware");
const Island = require("../models").island;
const User = require("../models").user;

//GET all islands with user
router.get("/", async (req, res, next) => {
  try {
    res.send(await Island.findAll({ include: { model: User } }));
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//GET specific island with user
router.get("/:id", async (req, res, next) => {
  try {
    const specificIsland = await Island.findByPk(req.params.id, {
      include: { model: User },
    });
    if (!specificIsland) {
      res.status(404).send(`Island with id ${req.params.id} not found`);
    } else {
      res.send(specificIsland);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//PATCH update my island page
router.patch("/:id", auth, async (req, res) => {
  try {
    const islands = await Island.findByPk(req.params.id);
    const {
      name,
      description,
      starterFruit,
      starterFlower,
      backgroundColor,
      textColor,
    } = req.body;

    const updated = await islands.update({
      name,
      description,
      starterFruit,
      starterFlower,
      backgroundColor,
      textColor,
    });

    return res.status(200).send(updated);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//POST new island
router.post("/", auth, async (req, res, next) => {
  try {
    const {
      name,
      description,
      starterFruit,
      starterFlower,
      backgroundColor,
      textColor,
      userId,
    } = req.body;
    const owner = await User.findByPk(userId);

    if (!owner) {
      res.status(404).send(`No user with id ${userId} found`);
      return;
    } else {
      if (
        !name ||
        !description ||
        !starterFruit ||
        !starterFlower ||
        !backgroundColor ||
        !textColor ||
        !userId
      ) {
        res.status(400).send("Not enough information provided");
        return;
      }
    }

    const newIsland = await Island.create({
      name,
      description,
      starterFruit,
      starterFlower,
      backgroundColor,
      textColor,
      userId,
    });

    return res.status(200).send(newIsland);
  } catch (e) {
    console.log(e.message);
  }
});

//DELETE island
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const islandToDelete = await Island.findByPk(id);
    if (!islandToDelete)
      return res.status(404).send(`no island with id ${id} found`);

    await islandToDelete.destroy();
    return res.status(200).send({ message: "island deleted" });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
