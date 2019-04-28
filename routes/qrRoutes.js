const randomstring = require("randomstring");

module.exports = (app, redis, socket) => {
  app.get("/api/qr", function(req, res) {
    const token = randomstring.generate();
    redis.set("token", token);

    res.json({ token });
  });

  app.post("/api/qr", function(req, res) {
    if (req.body && req.body.token) {
      redis.get("token", (err, val) => {
        if (req.body.token === val) {
            // call ody
            const token = randomstring.generate();
            redis.set("token", token);
            socket.emit("UPDATE_TOKEN");
            return res.status(200).json({ status: true });
        }
      })
    }
    return res.status(404);
  });
};
