import Express from "express";

import validate from "../../middleware/validate.js";

import { signInValidate ,signInValidate2,signUpValidate} from "../../validations/userValidations.js";
import { signIn} from "../../controllers/signIn.js";
import { signUp } from "../../controllers/signUp.js";
import { insertDept } from "../../controllers/insertDept.js";
import { insertStudent } from "../../controllers/insertStudent.js";
import { getDept } from "../../controllers/getDept.js";
import { uploadToStorage} from "../../middleware/upload.js";
import { signInPhase2 } from "../../controllers/signInPhase2.js";
import { signInPhase1 } from "../../controllers/signinphase1.js";


const router = Express.Router();




router.post("/v1/auth/signup",validate(signUpValidate),signUp);
router.post("/v1/auth/signin",validate(signInValidate), signIn);
router.post("/v1/auth/signInPhase2",uploadToStorage,signInPhase2);
router.post("/v1/auth/signInPhase1", validate(signInValidate2), signInPhase1);
router.post("/department", insertDept)
router.post("/student", insertStudent)
router.get("/department", getDept)
export default router;