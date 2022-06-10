const { Router } = require("express");
const router = new Router();
const auth = require("../auth/middleware");
const User = require("../models").user;
const Favs = require("../models").favorite;
const Island = require("../models").island;
const API_KEY = process.env.REACT_APP_NOOKIPEDIA_API_KEY;

//DELETE dreamie
router.delete("/dreamies/:name", auth, async (req, res, next) => {
  try {
    const { name } = req.params;
    console.log("name?", req.params.name);

    const dreamieToDelete = await Favs.findOne({
      where: { villager: name },
    });
    if (!dreamieToDelete)
      return res.status(404).send(`no dreamie called ${name} found`);

    await dreamieToDelete.destroy();
    return res.status(200).send({ message: `dreamie ${name} deleted` });
  } catch (e) {
    console.log(e.message);
  }
});

// POST add new dreamie
router.post("/dreamies", auth, async (req, res) => {
  try {
    const { villager, userId, islandId, dreamie, resident } = req.body;
    const owner = await User.findByPk(userId);

    console.log("post", userId);

    if (!owner) {
      res.status(404).send(`No user with id ${userId} found`);
      return;
    } else {
      if (!villager || !userId) {
        res.status(400).send("Not enough information provided");
        return;
      }
    }

    const oldFav = await Favs.findOne({
      where: { userId: userId, villager: villager, dreamie: true },
    });
    if (oldFav) {
      res.status(400).send(`Favorite ${villager} already exist`);
      return;
    }

    const newFav = await Favs.create({
      userId,
      islandId,
      villager,
      dreamie,
      resident,
    });
    console.log(newFav);

    res.send(newFav);
  } catch (e) {
    console.log(e.message);
  }
});

//GET all residents from user
router.get("/residents", auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const residents = await Favs.findAll({
      include: [{ model: User }, { model: Island }],
      where: [{ resident: true }, { userId: userID }],
    });
    res.send(residents);
  } catch (e) {
    console.log(e.message);
  }
});

//GET specific dreamie
router.get("/dreamies/:id", async (req, res, next) => {
  try {
    const specificDreamie = await Favs.findByPk(req.params.id, {
      where: { dreamie: true },
    });
    if (!specificDreamie) {
      res.status(404).send(`Dreamie with id ${req.params.id} not found`);
    } else {
      res.send(specificDreamie);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//GET all dreamies from user
router.get("/dreamies", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const dreamies = await Favs.findAll({
      include: [{ model: User }, { model: Island }],
      where: { dreamie: true, userId: userId },
    });
    res.send(dreamies);
  } catch (e) {
    console.log(e.message);
  }
});

//GET all favorite villagers with user model
router.get("/favs", async (req, res) => {
  try {
    const allFavs = await Favs.findAll({
      include: [{ model: User }, { model: Island }],
    });
    res.send(allFavs);
  } catch (e) {
    console.log(e.message);
  }
});

//GET villagers from API
router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.nookipedia.com/villagers",
    headers: {
      "X-API-Host": "api.nookipedia.com",
      "X-API-Key": `${API_KEY}`,
      "Accept-Version": "1.0.0",
    },
  };
  try {
    const { data } = await axios.request(options);
    res.status(200).send(data);
  } catch (e) {
    console.log("error", e);
  }
});

module.exports = router;
