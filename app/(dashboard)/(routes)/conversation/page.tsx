"use client";

import * as z from "zod";

import { Heading } from "@/components/Heading";

import { FormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { BsChatSquareDots } from "react-icons/bs";

const ConversationPage = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
        },
    });

    return (
        <div>
            <Heading
                title="Conversation"
                description="Generate a conversation between two people."
                icon={BsChatSquareDots}
                iconColor="text-gray-500"
                bgColor="bg-gray-50"
            />

            <div className="px-4 lg:px-8"></div>
        </div>
    );
};

export default ConversationPage;
