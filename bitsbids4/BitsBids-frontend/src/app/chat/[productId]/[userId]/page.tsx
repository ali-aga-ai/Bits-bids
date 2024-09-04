"use client";

import ProfileChat from "@/Types/ProfileChat";
import Message from "@/Types/message";
import User from "@/Types/user";
import IconEmojiHappy from "@/components/IconEmojiHappy";
import useLogin from "@/hooks/useLogin";
import { Button, Input } from "@mui/material";
import axios from "axios";
import * as React from "react";

// Define interface for component props
export interface IChatWithHigestBidderProps {
    params: { productId: string; userId: string };
}

// Helper function to fetch product data and messages
async function getProductDataAndMessages(productId: string) {
    const [productRes, messagesRes] = await Promise.all([
        fetch(`/api/products/${productId}`),
        fetch(`/api/chats/product/${productId}`)
    ]);
    return {
        product: await productRes.json(),
        messages: await messagesRes.json()
    };
}

// Main component
export default function ChatWithHigestBidder(props: IChatWithHigestBidderProps) {
    const { checkLogin } = useLogin();
    const [chatProfile, setChatProfile] = React.useState<{
        messages: Message[];
        product: ProfileChat["product"];
        bid: number;
    } | null>(null);
    const [frozenUser, setFrozenUser] = React.useState<User | null>(null);
    const [message, setMessage] = React.useState("");

    // Fetch messages and user's bid
    const fetchMessages = async () => {
        const [res, bidsRes] = await Promise.all([
            fetch(`/api/chats/seller/${props.params.productId}`, { cache: "no-cache" }),
            fetch(`/api/bids/${props.params.userId}`)
        ]);
        const { bids } = await bidsRes.json();
        const bid = bids.find((bid: any) => bid.product.productId === props.params.productId);
        const bidByUser = bid ? bid.bid : 0;

        const { userMessages }: { userMessages: ProfileChat["userMessages"] } = await res.json();
        const { product } = await fetch(`/api/products/${props.params.productId}`).then(res => res.json());

        setChatProfile({
            messages: userMessages[Number(props.params.userId)],
            product,
            bid: bidByUser
        });

        if (bid && bid.frozen) {
            setFrozenUser(bid.user);
        }
    };

    // Fetch user data
    const getUserData = async (userId: string) => {
        if (!userId) return;
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        setFrozenUser(data.user);
    };

    // Use effects
    React.useEffect(() => {
        checkLogin();
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        console.log(chatProfile);
    }, [chatProfile]);

    // Handle bid freezing
    const handleFreeze = async () => {
        try {
            const response = await axios.put(`/api/products/`, {
                userId: Number(props.params.userId),
                productId: props.params.productId
            });
            if (response.data.error) {
                alert(response.data.error);
                return;
            }
            fetchMessages();
            alert("Bid has been frozen");
        } catch (error) {
            console.error(error);
        }
    };

    // Handle message sending
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatProfile || !message) return;

        await fetch("/api/chats/user/" + localStorage.getItem("user"), {
            method: "POST",
            body: JSON.stringify({
                productId: chatProfile.product.productId,
                message,
                receiverId: props.params.userId
            }),
            cache: "no-cache"
        });

        setMessage("");
        await fetchMessages();
    };

    // Render component
    return (
        <main className="flex-1 overflow-auto p-4 pt-20 h-screen">
            <section className="flex flex-col w-full h-full">
                <header className="border-b dark:border-zinc-700 p-4 flex justify-between">
                    <h2 className="text-xl font-bold">
                        {chatProfile?.product.productName}
                        {chatProfile?.bid !== undefined && chatProfile?.bid !== 0 && ` - Rs. ${chatProfile?.bid}`}
                    </h2>
                    {chatProfile?.bid !== undefined && chatProfile?.bid !== 0 && (
                        <Button 
                            color="warning" 
                            disabled={chatProfile?.product.sold} 
                            onClick={handleFreeze}
                        >
                            {chatProfile?.product.sold ? "Frozen" : "Freeze"} Bid
                        </Button>
                    )}
                </header>
                <main className="flex-1 overflow-auto p-4 h-full">
                    <div className="space-y-4">
                        {chatProfile?.messages.map((message: Message) => (
                            <div 
                                key={message.messageId}
                                className={`flex items-end gap-2 ${message.sender.userId == Number(localStorage.getItem("user")) ? "justify-end" : ""}`}
                            >
                                <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
                                    <p className="text-sm">{message.message}</p>
                                </div>
                            </div>
                        ))}
                        {frozenUser && (
                            <div className="flex flex-col w-full justify-center items-center">
                                <span>Name: {frozenUser.name}</span>
                                <span>Email: {frozenUser.email}</span>
                                <span>Phone: {frozenUser.phone}</span>
                                <span>Hostel: {frozenUser.hostel}</span>
                            </div>
                        )}
                    </div>
                </main>
                <footer className="border-t dark:border-zinc-700 p-4">
                    <form className="flex items-center gap-2" onSubmit={handleSend}>
                        <Button>
                            <IconEmojiHappy className="w-6 h-6" />
                        </Button>
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1"
                            placeholder="Type a message..."
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </footer>
            </section>
        </main>
    );
}