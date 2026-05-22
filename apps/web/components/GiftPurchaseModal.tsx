"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  useToast,
  Box,
  Code,
  Spinner,
} from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";

type Gift = {
  id: string;
  title: string;
  price: number;
  amazonLink?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  gift: Gift | null;
  onPurchaseSuccess: () => void;
};

export function GiftPurchaseModal({ isOpen, onClose, gift, onPurchaseSuccess }: Props) {
  const [step, setStep] = useState<"select" | "pix" | "amazon">("select");
  const [pixPayload, setPixPayload] = useState("");
  const [loadingPix, setLoadingPix] = useState(false);
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const toast = useToast();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    if (isOpen) {
      setStep("select");
      setPixPayload("");
    }
  }, [isOpen]);

  if (!gift) return null;

  const handleSelectPix = async () => {
    setStep("pix");
    setLoadingPix(true);
    try {
      const res = await fetch(`${apiUrl}/payments/pix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(gift.price), message: gift.title }),
      });
      if (!res.ok) throw new Error("Erro ao gerar PIX");
      const data = await res.json();
      setPixPayload(data.pixPayload);
    } catch (err) {
      toast({ title: "Erro ao gerar PIX", status: "error", duration: 3000 });
      setStep("select");
    } finally {
      setLoadingPix(false);
    }
  };

  const confirmPurchase = async () => {
    setLoadingPurchase(true);
    try {
      const res = await fetch(`${apiUrl}/gifts/${gift.id}/purchase`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Erro ao confirmar compra");
      
      toast({
        title: "Presente confirmado!",
        description: "Muito obrigado pelo seu carinho!",
        status: "success",
        duration: 5000,
      });
      onPurchaseSuccess();
      onClose();
    } catch (err) {
      toast({ title: "Erro ao confirmar", status: "error", duration: 3000 });
    } finally {
      setLoadingPurchase(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{gift.title}</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          {step === "select" && (
            <VStack spacing={4} w="full">
              <Text textAlign="center" mb={2}>Como deseja presentear?</Text>
              <Button w="full" colorScheme="yellow" bg="brand.softGold" _hover={{ bg: "brand.roseGold" }} onClick={handleSelectPix}>
                Pagar com PIX
              </Button>
              {gift.amazonLink && (
                <Button w="full" variant="outline" onClick={() => setStep("amazon")}>
                  Comprar na Loja (Amazon)
                </Button>
              )}
            </VStack>
          )}

          {step === "pix" && (
            <VStack spacing={4}>
              {loadingPix ? (
                <Spinner size="xl" color="brand.softGold" />
              ) : (
                <>
                  <Text textAlign="center">Escaneie o QRCode abaixo ou copie o código PIX.</Text>
                  <Box bg="white" p={4} rounded="md" shadow="sm">
                    {pixPayload && <QRCodeSVG value={pixPayload} size={200} />}
                  </Box>
                  <Code p={2} w="full" wordBreak="break-all" fontSize="xs">
                    {pixPayload}
                  </Code>
                </>
              )}
            </VStack>
          )}

          {step === "amazon" && (
            <VStack spacing={4}>
              <Text textAlign="center">
                Você será redirecionado para a loja. Volte aqui para confirmar que a compra foi concluída!
              </Text>
              <Button as="a" href={gift.amazonLink} target="_blank" rel="noopener noreferrer" w="full" colorScheme="blue">
                Abrir Loja
              </Button>
              <Text fontWeight="bold" mt={4}>Você já concluiu a compra?</Text>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          {step === "select" ? (
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          ) : (
            <VStack w="full" spacing={3}>
              <Button 
                w="full" 
                colorScheme="yellow" 
                bg="brand.softGold"
                isLoading={loadingPurchase}
                onClick={confirmPurchase}
              >
                {step === "amazon" ? "Sim, já comprei!" : "Já paguei"}
              </Button>
              <Button w="full" variant="ghost" onClick={() => setStep("select")} isDisabled={loadingPurchase}>
                Voltar
              </Button>
            </VStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
