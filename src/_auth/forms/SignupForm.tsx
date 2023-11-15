import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
// import { useToast } from "@/components/ui/use-toast";

// import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
// import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  // const { toast } = useToast();
  // const navigate = useNavigate();
  // const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const isUserLoading = false;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  // const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  // const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  // Handler
  // const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
  //   try {
  //     const newUser = await createUserAccount(user);

  //     if (!newUser) {
  //       toast({ title: "Sign up failed. Please try again.", });

  //       return;
  //     }

  //     const session = await signInAccount({
  //       email: user.email,
  //       password: user.password,
  //     });

  //     if (!session) {
  //       toast({ title: "Something went wrong. Please login your new account", });

  //       navigate("/sign-in");

  //       return;
  //     }

  //     const isLoggedIn = await checkAuthUser();

  //     if (isLoggedIn) {
  //       form.reset();

  //       navigate("/");
  //     } else {
  //       toast({ title: "Login failed. Please try again.", });

  //       return;
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newUser = await createUserAccount(values);

    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
