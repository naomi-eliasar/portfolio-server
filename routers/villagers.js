const { Router } = require("express");
const router = new Router();
const auth = require("../auth/middleware");
const User = require("../models").user;
const Favs = require("../models").favorite;
const Island = require("../models").island;
const API_KEY = process.env.REACT_APP_NOOKIPEDIA_API_KEY;

//POST add new favorite
// router.post("/favs", auth, async (req, res) => {
//   try {
//     const { villagerId, dreamie, resident } = req.body;
//     const userId = req.user.id;

//     const oldFav = await Favs.findOne({
//       where: { userId: userId, villagerId: villagerId },
//     });
//     if (oldFav) {
//       res.status(400).send("Favorite already exist");
//       return;
//     }

//     const newFav = await Favs.create({
//       userId: userId,
//       villagerId,
//       dreamie,
//       resident,
//     });

//     res.send(newFav);
//   } catch (e) {
//     console.log(e.message);
//   }
// });

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
