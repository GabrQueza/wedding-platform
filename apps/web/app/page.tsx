'use client';

import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  VStack,
  Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import { RsvpForm } from '../components/RsvpForm';

export default function Home() {
  return (
    <Box as="main">
      {/* Hero Section */}
      <Box
        position="relative"
        h="100vh"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box position="absolute" top={0} left={0} w="full" h="full" zIndex={-1}>
          <Image
            src="/xus.jpg"
            alt="Casal"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
            priority
          />
        </Box>
        <VStack spacing={6} color="white" textAlign="center" zIndex={1}>
          <Heading as="h1" size="4xl" letterSpacing="widest">
            Gabriel & Thaliny
          </Heading>
          <Text fontSize="2xl" fontWeight="light">
            20 de Dezembro de 2026
          </Text>
        </VStack>
      </Box>

      {/* Nossa História */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <Heading as="h2" size="2xl" color="brand.softGold">
            Nossa História
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            <Box bg="white" p={8} shadow="lg" rounded="xl" textAlign="center">
              <Heading size="md" mb={4} color="brand.darkText">
                Como nos conhecemos
              </Heading>
              <Text color="gray.600">
                Foi em uma festinha na 5a série. Tudo mudou após darmos as mãos.
                Ou talvez mesmo sob o céu estrelado da Pampula, o passeio mais
                importante foi na roda gigante do Guanabara.
              </Text>
            </Box>
            <Box bg="white" p={8} shadow="lg" rounded="xl" textAlign="center">
              <Heading size="md" mb={4} color="brand.darkText">
                O Pedido
              </Heading>
              <Text color="gray.600">
                No topo do Aconcagua, apesar do cansaço e do frio, o que
                importava era o sim mais importante da minha vida.
              </Text>
            </Box>
            <Box bg="white" p={8} shadow="lg" rounded="xl" textAlign="center">
              <Heading size="md" mb={4} color="brand.darkText">
                Hoje
              </Heading>
              <Text color="gray.600">
                Estamos construindo nossa vida juntos e ansiosos para celebrar
                nosso amor com vocês.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Local do Evento */}
      <Box bg="brand.beige" py={20}>
        <Container maxW="container.md" textAlign="center">
          <VStack spacing={6}>
            <Heading as="h2" size="2xl" color="brand.darkText">
              Local do Evento
            </Heading>
            <Text fontSize="lg" color="gray.700">
              Villa Pizzo
              <br />
              Via Regina, 48, 22012 Cernobbio CO, Italy
            </Text>
            <Button
              as="a"
              href="https://www.google.com/maps/place/Villa+Pizzo/@45.8460346,9.0861283,17z/data=!3m1!4b1!4m6!3m5!1s0x47869d8844658fe5:0xbbc9ceb9cb37ba9!8m2!3d45.8460346!4d9.0861283!16s%2Fg%2F11df0q4wt3?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              size="lg"
              colorScheme="yellow"
              bg="brand.softGold"
              _hover={{ bg: 'brand.roseGold' }}
            >
              Abrir no Google Maps
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* RSVP */}
      <Container maxW="container.md" py={20}>
        <VStack spacing={8}>
          <Heading as="h2" size="2xl" color="brand.softGold">
            Confirme sua Presença
          </Heading>
          <Text color="gray.600" textAlign="center">
            Por favor, confirme sua presença até o dia 1 de Dezembro.
          </Text>
          <RsvpForm />
        </VStack>
      </Container>
    </Box>
  );
}
