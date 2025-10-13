import * as signIn from "./SignIn";
import * as signUp from "./SignUp"

export const userController = {
    ...signUp,
    ...signIn
}