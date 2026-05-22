"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Image,
  Skeleton,
  useToast,
  Badge,
} from "@chakra-ui/react";
import Link from 'next/link';
import { GiftPurchaseModal } from "../../components/GiftPurchaseModal";

type Gift = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  amazonLink?: string;
  isPurchased: boolean;
};

export default function PresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const toast = useToast();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const fetchGifts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/gifts`);
      if (!res.ok) throw new Error("Erro ao buscar presentes");
      const data = await res.json();
      setGifts(data);
    } catch (err) {
      console.error("Erro no fetchGifts:", err);
      toast({ title: "Erro ao carregar lista", status: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handlePurchaseSuccess = () => {
    fetchGifts();
  };

  return (
    <Box as="main" py={20} bg="brand.offWhite" minH="100vh">
      <Container maxW="container.xl">
        <VStack spacing={10}>
          <Box w="full">
            <Button as={Link} href="/" variant="ghost" colorScheme="yellow" mb={-6}>
              &larr; Voltar para o Início
            </Button>
          </Box>
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="2xl" color="brand.softGold">
              Lista de Presentes
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Nossa maior alegria é ter vocês conosco neste dia especial. 
              Mas se desejarem nos presentear, criamos esta lista para ajudar na nossa nova casa.
            </Text>
          </VStack>

          {loading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} h="400px" rounded="xl" />
              ))}
            </SimpleGrid>
          ) : gifts.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Text fontSize="xl" color="gray.500">Nenhum presente disponível no momento.</Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {gifts.map((gift) => (
                <Box key={gift.id} bg="white" shadow="md" rounded="xl" overflow="hidden" display="flex" flexDir="column">
                  <Box position="relative" h="250px" w="full" bg="gray.100">
                    <Image
                      src={gift.imageUrl || "https://via.placeholder.com/400x300?text=Presente"}
                      alt={gift.title}
                      objectFit="cover"
                      w="full"
                      h="full"
                      fallbackSrc="https://via.placeholder.com/400x300?text=Presente"
                    />
                    {gift.isPurchased && (
                      <Badge position="absolute" top={4} right={4} colorScheme="green" fontSize="md" p={2} rounded="md">
                        Vendido
                      </Badge>
                    )}
                  </Box>
                  <VStack p={6} align="start" spacing={4} flex={1}>
                    <Heading size="md" color="brand.darkText" noOfLines={2}>
                      {gift.title}
                    </Heading>
                    <Text color="gray.500" fontSize="sm" noOfLines={3} flex={1}>
                      {gift.description}
                    </Text>
                    <Text fontWeight="bold" fontSize="xl" color="brand.softGold">
                      R$ {Number(gift.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                    <Button 
                      w="full" 
                      colorScheme="yellow" 
                      bg="brand.softGold" 
                      _hover={{ bg: "brand.roseGold" }}
                      isDisabled={gift.isPurchased}
                      onClick={() => setSelectedGift(gift)}
                    >
                      {gift.isPurchased ? "Já Presenteado" : "Presentear"}
                    </Button>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      <GiftPurchaseModal
        isOpen={!!selectedGift}
        onClose={() => setSelectedGift(null)}
        gift={selectedGift}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </Box>
  );
}
