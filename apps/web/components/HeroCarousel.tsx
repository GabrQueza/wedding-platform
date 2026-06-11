'use client';

import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

// Lista das suas fotos na pasta public.
// Você pode ajustar a propriedade 'position' para controlar o enquadramento:
// Valores comuns: 'center', 'top', 'bottom', 'left', 'right', ou '50% 20%'
const IMAGES = [
  { src: '/xus.jpg', position: 'center' },
  { src: '/xus2.jpg', position: 'top' }, // 'top' foca na parte superior (cabeça/rostos)
  { src: '/alt_cover.jpeg', position: 'center' }
];

export function HeroCarousel() {
  if (IMAGES.length === 0) return null;

  return (
    <Box position="absolute" top={0} left={0} w="full" h="full" zIndex={-1}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={2000} // Transição suave e lenta
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        allowTouchMove={false} // Evita que o usuário arraste o fundo com o dedo
        style={{ width: '100%', height: '100%' }}
      >
        {IMAGES.map((img, index) => (
          <SwiperSlide key={index}>
            <Box position="relative" w="full" h="full">
              <Image
                src={img.src}
                alt={`Casal foto ${index + 1}`}
                fill
                style={{ 
                  objectFit: 'cover', 
                  objectPosition: img.position,
                  filter: 'brightness(0.6)' 
                }}
                priority={index === 0} // Carrega a primeira imagem mais rápido
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
