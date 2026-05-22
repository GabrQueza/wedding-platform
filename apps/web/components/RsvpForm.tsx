"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";

export function RsvpForm() {
  const [fullName, setFullName] = useState("");
  const [isAttending, setIsAttending] = useState("true");
  const [companions, setCompanions] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fullName,
      isAttending: isAttending === "true",
      numberOfCompanions: Number(companions),
      message,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar RSVP");
      }

      toast({
        title: "Presença confirmada!",
        description: "Obrigado por nos avisar. Mal podemos esperar!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFullName("");
      setIsAttending("true");
      setCompanions(0);
      setMessage("");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível confirmar sua presença no momento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={6} bg="white" rounded="md" shadow="md" w="full" maxW="md" mx="auto">
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nome Completo</FormLabel>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="João Silva" />
        </FormControl>

        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Você irá comparecer?</FormLabel>
          <RadioGroup value={isAttending} onChange={setIsAttending}>
            <Stack direction="row" spacing={4}>
              <Radio value="true" colorScheme="yellow">Sim, estarei lá!</Radio>
              <Radio value="false" colorScheme="yellow">Não poderei ir</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {isAttending === "true" && (
          <FormControl>
            <FormLabel>Número de Acompanhantes</FormLabel>
            <NumberInput min={0} max={10} value={companions} onChange={(val) => setCompanions(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Mensagem aos Noivos (Opcional)</FormLabel>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Deixe uma mensagem..." />
        </FormControl>

        <Button type="submit" isLoading={loading} colorScheme="yellow" bg="brand.softGold" _hover={{ bg: "brand.roseGold" }} size="lg" w="full" mt={4}>
          Enviar Confirmação
        </Button>
      </Stack>
    </Box>
  );
}
