import { MainApiError } from "../../utils/errors";
import login from "../../operations/login";
import { SignupHandlers } from "../signup";

const signup: SignupHandlers["signup"] = async ({
  res,
  body: { firstName, lastName, email, password },
  config,
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: "Invalid request" }],
    });
  }

  console.log("Succes signup", { firstName, lastName, email, password });
  // TODO: validate the password and email
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.

  try {
    // await config.storeApiFetch('/v3/users', {
    //   method: 'POST',
    //   body: JSON.stringify([
    //     {
    //       first_name: firstName,
    //       last_name: lastName,
    //       email,
    //       authentication: {
    //         new_password: password,
    //       },
    //     },
    //   ]),
    // })
  } catch (error) {
    if (error instanceof MainApiError && error.status === 422) {
      const hasEmailError = "0.email" in error.data?.errors;

      // If there's an error with the email, it most likely means it's duplicated
      if (hasEmailError) {
        return res.status(400).json({
          data: null,
          errors: [
            {
              message: "The email is already in use",
              code: "duplicated_email",
            },
          ],
        });
      }
    }

    throw error;
  }

  // Login the user right after creating it
  //  await login({ variables: { email, password }, res, config })

  res.status(200).json({ data: null });
};

export default signup;
