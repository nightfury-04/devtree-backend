import { Router } from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getUser, updateProfile, uploadImage, getUserByHandle } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router();

// Authentication and Registration
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El handle no puede ir vacío"),
  body("name").notEmpty().withMessage("El nombre no puede ir vacío"),
  body("email").isEmail().withMessage("E-mail no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrors,
  registerUser
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("E-mail no válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  loginUser
);

router.get('/user', authenticate, getUser);
router.patch("/user", authenticate, 
  body('handle')
  .notEmpty()
  .withMessage("El handle no puede ir vacío"),
  body("description")
  .notEmpty()
  .withMessage("La descripción no puede ir vacía"),
  handleInputErrors,
  authenticate,
  updateProfile

)

router.post("/user/image", authenticate, uploadImage);

router.get("/user/:handle", getUserByHandle);

export default router;