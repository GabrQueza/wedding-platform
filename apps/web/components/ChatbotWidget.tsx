"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Spinner,
  Heading,
} from "@chakra-ui/react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export function ChatbotWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Olá! Sou a assistente virtual do Gabriel e da Thaliny. Como posso ajudar com o casamento?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isMounted) {
    return null; // Evita erro de hydration garantindo que o botão só renderiza no client-side
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${apiUrl}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      if (!res.ok) throw new Error("Erro na API");
      
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Desculpe, estou com problemas técnicos agora. Tente mais tarde!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box position="fixed" bottom={6} right={6} zIndex={9999} display="flex" flexDir="column" alignItems="flex-end">
      {isOpen && (
        <Box 
          w={{ base: "300px", md: "350px" }}
          h="450px" 
          bg="white" 
          shadow="2xl" 
          rounded="xl" 
          mb={4}
          overflow="hidden"
          display="flex"
          flexDir="column"
          border="1px"
          borderColor="gray.200"
        >
          {/* Header */}
          <Box bg="brand.softGold" color="white" p={4} display="flex" justifyContent="space-between" alignItems="center">
            <Heading size="sm">Assistente do Casamento</Heading>
            <Button size="xs" variant="ghost" color="white" _hover={{ bg: "brand.roseGold" }} onClick={() => setIsOpen(false)}>
              ✕
            </Button>
          </Box>

          {/* Messages */}
          <VStack flex={1} overflowY="auto" p={4} spacing={4} align="stretch" bg="brand.offWhite">
            {messages.map((msg, i) => (
              <Box 
                key={i} 
                alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                bg={msg.sender === "user" ? "brand.roseGold" : "white"}
                color={msg.sender === "user" ? "white" : "gray.800"}
                px={4}
                py={2}
                rounded="lg"
                shadow="sm"
                maxW="80%"
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">{msg.text}</Text>
              </Box>
            ))}
            {isLoading && (
              <Box alignSelf="flex-start" bg="white" px={4} py={2} rounded="lg" shadow="sm">
                <Spinner size="sm" color="brand.softGold" />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input Area */}
          <HStack p={3} bg="white" borderTop="1px" borderColor="gray.100">
            <Input 
              placeholder="Digite sua dúvida..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              size="sm"
              focusBorderColor="brand.softGold"
            />
            <Button 
              colorScheme="yellow" 
              bg="brand.softGold" 
              _hover={{ bg: "brand.roseGold" }}
              size="sm"
              onClick={handleSend}
              isLoading={isLoading}
            >
              Enviar
            </Button>
          </HStack>
        </Box>
      )}

      {!isOpen && (
        <Button 
          colorScheme="yellow" 
          bg="brand.softGold"
          _hover={{ bg: "brand.roseGold", transform: "scale(1.05)" }}
          size="lg" 
          rounded="full" 
          w="60px" 
          h="60px"
          shadow="xl"
          onClick={() => setIsOpen(true)}
          transition="all 0.2s"
        >
          💬
        </Button>
      )}
    </Box>
  );
}
