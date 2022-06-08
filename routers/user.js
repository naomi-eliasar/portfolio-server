const { Router } = require("express");
const router = new Router();
const auth = require("../auth/middleware");
const Island = require("../models").island;
const User = require("../models").user;

//GET user with islands
router.get("/:id", async (req, res, next) => {
  try {
    const specificIsland = await User.findByPk(req.params.id, {
      include: { model: Island },
    });
    if (!specificIsland) {
      res.status(404).send(`User with id ${req.params.id} not found`);
    } else {
      res.send(specificIsland);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
