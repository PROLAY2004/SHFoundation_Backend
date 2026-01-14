export default class AuthController {
  signUp = async (req, res, next) => {
    try {
      console.log('Signup Section');
    } catch (err) {
      next(err);
    }
  };
}
