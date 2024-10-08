"use client";

import * as z from "zod";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/Heading";

import { FormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";


import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Music } from "lucide-react";

import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";

import { useProModal } from "@/hooks/use-pro-modal";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", data);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      //OPEN PRO MODEL
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generator"
        description="Generate a music track based on a text"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      {/* in development */}
      <div className="px-4 lg:px-8 text-center">
        <p className="text-muted-foreground mt-4">
          This feature is currently in development and will be released soon. Stay tuned for exciting music generation capabilities!
        </p>
      </div>


      {/* <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0 ">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
                        disabled={isLoading}
                        placeholder="Piano music with a happy vibe"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {!music && !isLoading && <Empty label="No Music generated yet" />}

          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default MusicPage;
