import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "../lib/validators/issueSchema";
import { createIssue } from "../http/api";
import { Textarea } from "./ui/textarea"
import { useAppSelector } from "../store/hooks";

function IssueComponent() {
  const form = useForm<z.infer<typeof issueSchema>>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      employeeId: "",
    },
  });

  const employee = useAppSelector(state => state.user)  

  const IssueImageRef = form.register("issueImage");

  const mutation = useMutation({
    mutationKey: ["creatAdmin"],
    mutationFn: (data: FormData) => createIssue(data),
    onSuccess: (resp) => {
      console.log(resp);
      toast("Signup", {
        description: "Admin signed up successfully",
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      });
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

  const handleSignupSubmit = async (data: z.infer<typeof issueSchema>) => {
    console.log("Form Data before submission:", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("employeeId", (data.employeeId).toString());
    formData.append("IssueImage", data.issueImage[0]);

    mutation.mutate(formData);
    console.log("Final FormData:", formData);
  };

  return (
    <div className="px-4">
      <Sheet key={"left"} >
        <SheetTrigger asChild>
          <Button
            className="fixed left-1/2 bottom-[4vh] bg-blue-500 text-2xl px-5 py-2 rounded-2xl"
            variant="outline"
          >
            New Issue
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Generate Issue</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignupSubmit)}
              className="space-y-6 mx-2"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        className="w-full"
                        placeholder="Title"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        className="w-full"
                        placeholder="Type your message here."
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormLabel className="w-2/5" htmlFor="employeeId">Employee ID</FormLabel>
                    <FormControl>
                      <Input
                        id="employeeId"
                        className="w-full"
                        required
                        defaultValue={employee.userId}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issueImage"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="issueImage">IssueImage</FormLabel>
                    <FormControl>
                      <Input
                        id="issueImage"
                        type="file"
                        className="w-full"
                        required
                        {...IssueImageRef}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.issueImage?.message}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default IssueComponent;
