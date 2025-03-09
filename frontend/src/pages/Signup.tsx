import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "../lib/validators/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../http/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

function Signup() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      adminId: 2,
      password: "",
    },
  });

  const navigate = useNavigate();

  const EmployeeImageRef = form.register("profileImage");

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: FormData) => createUser(data),
    onSuccess: (resp) => {
      console.log(resp);
      toast("Signup", {
        description: "User signed up successfully",
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      });
      navigate("/home");
    },
    onError: (error) => {
      toast("Signup", {
        description: error.message,
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
      });
    },
  });

  const handleSignupSubmit = async (data: z.infer<typeof userSchema>) => {
    console.log("Form Data before submission:", data);
  
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("adminId", data.adminId.toString());
    formData.append("password", data.password);
    formData.append("EmployeeImage", data.profileImage[0]);

    mutation.mutate(formData);
    console.log("Final FormData:", formData);
    
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="max-w-lg w-[40vw]">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>Enter your persnal details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignupSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fname">First Name</FormLabel>
                    <FormControl>
                      <Input
                        id="fname"
                        className="w-full"
                        placeholder="First Name"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.fname?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lname">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        id="lname"
                        className="w-full"
                        placeholder="Last Name"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.lname?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        className="w-full"
                        placeholder="example@gmail.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="adminId">Admin ID</FormLabel>
                    <FormControl>
                      <Input
                        id="adminId"
                        className="w-full"
                        placeholder="4"
                        required
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.adminId?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        className="w-full"
                        placeholder="asjdh2326@##%"
                        required
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileImage"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="profileImage">Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        id="profileImage"
                        type="file"
                        className="w-full"
                        required
                        {...EmployeeImageRef}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.profileImage?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="my-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/signup"} className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
