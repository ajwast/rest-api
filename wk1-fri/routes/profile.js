import { Router } from "express";
import validate from "../utils/validateToken.js";
const router = Router();

router.use(validate);

router.get("/", (req, res) => {
  res.json({ name: "Joe Bloggs", email: "jbloggs@email.com" });
});

export default router;
