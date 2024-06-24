const router = Express.Router();

router.post("/v1/auth/signup",validate(signUpValidate),signUp);
router.post("/v1/auth/signin",validate(signInValidate), signIn);

export default router;