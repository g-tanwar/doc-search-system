import express from "express";
import {
  createFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faqController";

import {
  createLink,
  getAllLinks,
  updateLink,
  deleteLink,
} from "../controllers/linkController";

const router = express.Router();

// FAQ Routes
router.post("/faqs", createFAQ);
router.get("/faqs", getAllFAQs);
router.put("/faqs/:id", updateFAQ);
router.delete("/faqs/:id", deleteFAQ);

// Link Routes
router.post("/links", createLink);
router.get("/links", getAllLinks);
router.put("/links/:id", updateLink);
router.delete("/links/:id", deleteLink);

export default router;
