import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Você pode colar os dados dos presentes em formato JSON aqui dentro do array.
  const giftsData = [
  {
    "title": "Ensaio sobre a cegueira (Nova edição)",
    "amazonLink": "https://www.amazon.com.br/dp/8535930310/?coliid=I3T3ESU6VRZ6NF&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41iQySvQq0L._SS135_.jpg",
    "price": 47.57,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Carta ao pai",
    "amazonLink": "https://www.amazon.com.br/dp/8525413569/?coliid=I1ENXNEUSW7VU1&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41O3dhoHA4L._SS135_.jpg",
    "price": 19.4,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "10 Dias que Abalaram o Mundo",
    "amazonLink": "https://www.amazon.com.br/dp/8525411949/?coliid=I2BWZX6KAUCVVB&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/515S1AcA6FL._SS135_.jpg",
    "price": 46.43,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Noturno do Chile",
    "amazonLink": "https://www.amazon.com.br/dp/8535905502/?coliid=I1XG50MU719UL2&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41TsNm3KRRS._SS135_.jpg",
    "price": 53,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Flores partidas | nova edição do best-seller de Karin Slaughter",
    "amazonLink": "https://www.amazon.com.br/dp/6560051439/?coliid=I2OCC4JE6AOFF7&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51+Ojdz-0DL._SS135_.jpg",
    "price": 50.3,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Afternoon Tea 500 Piece Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/0735369925/?coliid=I1CPJZXNX6YR9D&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51+Mkp6HNxL._SS135_.jpg",
    "price": 153.96,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Purrfect Nook 1000 Piece Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/0735382727/?coliid=I35Q3NLNI3Z9GP&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51sUmaDVKBL._SS135_.jpg",
    "price": 182.19,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Cat Zodiac 500 Piece Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/0735357064/?coliid=IWR2K977C3F85&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51rO+goAkRL._SS135_.jpg",
    "price": 133.08,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Confissões de santo Agostinho",
    "amazonLink": "https://www.amazon.com.br/dp/8582850476/?coliid=I2G8KDG6XYP198&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/5195QcbAl4L._SS135_.jpg",
    "price": 47.41,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Jogo de amor para dois",
    "amazonLink": "https://www.amazon.com.br/dp/6555659521/?coliid=I28ODF1QFF0L3A&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51pcx-1VrLL._SS135_.jpg",
    "price": 35.53,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Card Captor Sakura Especial - Vol. 5",
    "amazonLink": "https://www.amazon.com.br/dp/8577875865/?coliid=IPKXN415SFXNX&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51Gx0sGEr-L._SS135_.jpg",
    "price": 33.15,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Card Captor Sakura Especial - Vol. 4",
    "amazonLink": "https://www.amazon.com.br/dp/8577875733/?coliid=I1ZEL36GZVR4E5&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51pRlWWCpDL._SS135_.jpg",
    "price": 31.19,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Card Captor Sakura Especial - Vol. 3",
    "amazonLink": "https://www.amazon.com.br/dp/8577874826/?coliid=I1VD5EIHU7OYZU&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/511DHH239dL._SS135_.jpg",
    "price": 29.93,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Card Captor Sakura Especial - Vol. 2",
    "amazonLink": "https://www.amazon.com.br/dp/8577874567/?coliid=I2UFKCZ9MWENQJ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51b3aalE48L._SS135_.jpg",
    "price": 34.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Card Captor Sakura Especial - Vol. 1",
    "amazonLink": "https://www.amazon.com.br/dp/8577874400/?coliid=I2ZSUWE5VPT4VV&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51QOjxef0gL._SS135_.jpg",
    "price": 33.15,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Um Teto Todo Seu",
    "amazonLink": "https://www.amazon.com.br/dp/6558700336/?coliid=IKCX0PNMYXREX&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51rzEAEeXeL._SS135_.jpg",
    "price": 24.71,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "As ondas (Capa Dura)",
    "amazonLink": "https://www.amazon.com.br/dp/6559280047/?coliid=I23APMFYC9BM33&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51u9mgfZroL._SS135_.jpg",
    "price": 57.59,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Mônica - Biblioteca Mauricio de Sousa 1971 Vol. 2",
    "amazonLink": "https://www.amazon.com.br/dp/6525903297/?coliid=IS99U69JTRU8A&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/519hwSBGmUL._SS135_.jpg",
    "price": 199.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Cebolinha Vol. 1: 1973",
    "amazonLink": "https://www.amazon.com.br/dp/652591065X/?coliid=I18T1TM4D9ZE64&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41L6SAdOObL._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Biblioteca Mauricio de Sousa - Cascão Vol. 1: 1982",
    "amazonLink": "https://www.amazon.com.br/dp/652593656X/?coliid=I7ORUCBVC3A9V&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51p9MYUbaFL._SS135_.jpg",
    "price": 149.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Cebolinha Vol. 2: 1974",
    "amazonLink": "https://www.amazon.com.br/dp/6525916348/?coliid=I197DG9YBJR02K&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51H01P5aq7L._SS135_.jpg",
    "price": 175,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Mônica Vol. 3: 1972 (biblioteca Maurício de Sousa)",
    "amazonLink": "https://www.amazon.com.br/dp/655982540X/?coliid=I3BNBBDL1YSAAJ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51rBps1dyJL._SS135_.jpg",
    "price": 137.4,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Mônica Vol. 1: 1970 (biblioteca Maurício de Sousa): Biblioteca Mauricio de Sousa",
    "amazonLink": "https://www.amazon.com.br/dp/6559820882/?coliid=I2AQTOBBX7B2LM&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/5107ObO151L._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Mônica Vol. 4: 1973",
    "amazonLink": "https://www.amazon.com.br/dp/6525912601/?coliid=I2Z716FWQCRNT3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51Sh2Qg9YAL._SS135_.jpg",
    "price": 112.5,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O peso do pássaro morto (Nova edição)",
    "amazonLink": "https://www.amazon.com.br/dp/8535941304/?coliid=I1F4GEQNW9I2BG&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41Hfcgdw5mL._SS135_.jpg",
    "price": 44.49,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Profissões Para Mulheres e Outros Artigos Feministas",
    "amazonLink": "https://www.amazon.com.br/dp/8525426210/?coliid=I11B7E8HRIJ3B5&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41lHVOe0qtL._SS135_.jpg",
    "price": 23.55,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A Prateleira do Amor: Sobre Mulheres, Homens e Relações",
    "amazonLink": "https://www.amazon.com.br/dp/6525033721/?coliid=I195N3AVVFC1H6&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/519l-8wBVBL._SS135_.jpg",
    "price": 32.5,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Yumi e o pintor de pesadelos: Uma história Cosmere: 3",
    "amazonLink": "https://www.amazon.com.br/dp/6581339121/?coliid=I3K2VUJRF9UACT&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51mBbPmEIuL._SS135_.jpg",
    "price": 140.43,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Enterrem nossos ossos à meia-noite",
    "amazonLink": "https://www.amazon.com.br/dp/6559816532/?coliid=I3FGKVE83IT7UT&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51s0XF-KMAL._SS135_.jpg",
    "price": 39.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Tuareg",
    "amazonLink": "https://www.amazon.com.br/dp/8525408832/?coliid=I2AM4U91TN555D&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41GAwl4AdfL._SS135_.jpg",
    "price": 30.47,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Dicionário das palavras perdidas",
    "amazonLink": "https://www.amazon.com.br/dp/6586553962/?coliid=II3VOU3XWLZT2&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51yQdOvTWuL._SS135_.jpg",
    "price": 51.53,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "For Colored Girls Who Have Considered Suicide When the Rainbow Is Enuf: A Choreopoem",
    "amazonLink": "https://www.amazon.com.br/dp/0684843269/?coliid=I3XFGWXZ52U81&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51ByPB+wfxL._SS135_.jpg",
    "price": 69.48,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra Cabeça 1000 peças Vila Encantanda - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0F71QDPV8/?coliid=I2J8X51QU0R5UA&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51F1uBZP27L._SS135_.jpg",
    "price": 66.15,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O círculo das sete pedras: Uma coletânea de histórias de Outlander",
    "amazonLink": "https://www.amazon.com.br/dp/853060119X/?coliid=I3K91RM2HCI087&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41I-TS36+nL._SS135_.jpg",
    "price": 74.93,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Sidarta",
    "amazonLink": "https://www.amazon.com.br/dp/8501113867/?coliid=I2WIT3IOKYVZJV&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51zuBzLB1DL._SS135_.jpg",
    "price": 39.77,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A amiga genial (Eleito o melhor livro do século XXI pelo NYT): Infância, adolescência",
    "amazonLink": "https://www.amazon.com.br/dp/8525060607/?coliid=I1OF36U77GMT4O&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41w4EIwudaL._SS135_.jpg",
    "price": 42.89,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A vida é muito curta",
    "amazonLink": "https://www.amazon.com.br/dp/6555658851/?coliid=I1QHIXUY38QBWI&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41PRXJyExaL._SS135_.jpg",
    "price": 40.97,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Playlist para um final feliz",
    "amazonLink": "https://www.amazon.com.br/dp/6555657073/?coliid=IGDJYWVLYOR5G&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41vKf+xPjxL._SS135_.jpg",
    "price": 40.36,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Até o fim do verão",
    "amazonLink": "https://www.amazon.com.br/dp/6555657898/?coliid=IV13DZ4X1U7UD&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51PssSTsDCL._SS135_.jpg",
    "price": 46.26,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Rua do medo",
    "amazonLink": "https://www.amazon.com.br/dp/6555321717/?coliid=I2K4LMYY9GRB1F&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51xEKhjs01L._SS135_.jpg",
    "price": 57.95,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "P500 Panorama Harry Potter - Brilha No Escuro, GROW",
    "amazonLink": "https://www.amazon.com.br/dp/B07PKNXLJG/?coliid=I1UH9DT0NV2HQD&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51+qUW2mzPL._SS135_.jpg",
    "price": 119.99,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O tempo e o vento - parte 1",
    "amazonLink": "https://www.amazon.com.br/dp/8535923578/?coliid=ITAGX9K9J8P7W&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51lV89906rL._SS135_.jpg",
    "price": 72.65,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Grok Games Nem a Pato!",
    "amazonLink": "https://www.amazon.com.br/dp/B0D63M76SN/?coliid=I28J7T9G4XF69C&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/31xs+WXFb7L._SS135_.jpg",
    "price": 64.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Tress, a garota do Mar Esmeralda: Projeto Secreto #1",
    "amazonLink": "https://www.amazon.com.br/dp/6589132941/?coliid=I14H73BBFUK2M1&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51JTGxuMUkL._SS135_.jpg",
    "price": 107.57,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Assassinato na casa do pastor",
    "amazonLink": "https://www.amazon.com.br/dp/6555117982/?coliid=IXDAH8ONCKYZT&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41ghsxLizlL._SS135_.jpg",
    "price": 39.93,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Baralho 1546 Neoteric Rosa - Copag, Cor: Estampado - Copag",
    "amazonLink": "https://www.amazon.com.br/dp/B0BHCLCTWH/?coliid=I2RQB1M24C3ETT&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/517qpKsAS0L._SS135_.jpg",
    "price": 96.97,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Boneco Funko Pop! Disney O Ursinho Pooh - Leitão",
    "amazonLink": "https://www.amazon.com.br/dp/B0DHY97DSK/?coliid=I10J8C4HSW1U7K&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/411Vp-tyvxL._SS135_.jpg",
    "price": 119.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Kit Câmera Instax Mini 12 com pack 10 fotos Mermaid Tail e Bolsa Azul",
    "amazonLink": "https://www.amazon.com.br/dp/B0FTZNF17S/?coliid=I13M2WJJ71LB6E&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/315LrVZ4mbL._SS135_.jpg",
    "price": 749,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Kit Câmera Instax Mini 12 com pack 10 fotos Mermaid Tail e Bolsa Rosa",
    "amazonLink": "https://www.amazon.com.br/dp/B0FSGSQPTC/?coliid=I3AEAZY6O7PNVF&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/31BZFrGPx8L._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A vida mentirosa dos adultos",
    "amazonLink": "https://www.amazon.com.br/dp/8551006371/?coliid=I9FVO4EUVLS8X&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41xG-2i-UiL._SS135_.jpg",
    "price": 52.4,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A paixão segundo G. H.: Edição comemorativa",
    "amazonLink": "https://www.amazon.com.br/dp/6555320060/?coliid=IMP4VPQ6B4ML3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51r2Y0dfwoL._SS135_.jpg",
    "price": 47.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra Cabeça 2000 Peças Ateliê -Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0F723NGK5/?coliid=I1EAZDF887IDU2&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51OzDtB0RAL._SS135_.jpg",
    "price": 108.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Diários de Sylvia Plath: 1950-1962",
    "amazonLink": "https://www.amazon.com.br/dp/8525058785/?coliid=I3B5J8RBO6I0AM&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41cewGJV1jL._SS135_.jpg",
    "price": 99.5,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Wonder Forge Quebra-cabeça adulto de 1000 peças Cats in The Blue Room | Peças exclusivas e perfeitamente ajustadas | Imagens divertidas e vibrantes | Exclusivo da Amazon",
    "amazonLink": "https://www.amazon.com.br/dp/B0DB5N4LGP/?coliid=I8OIQE1KHTFQ3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61Kk4GpXgML._SS135_.jpg",
    "price": 138.35,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Ceaco - David Maclean - Cities - Bonjour Paris - 1000 Piece Jigsaw Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/B0BGJHS5WF/?coliid=I1MIYWKX2EMWMP&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51a5fvoVMGL._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Wonder Forge Quebra-cabeça adulto 1000 peças Piano Cat | Peças únicas e perfeitamente ajustadas | Imagens vívidas engraçadas | Exclusivo da Amazon",
    "amazonLink": "https://www.amazon.com.br/dp/B0DB5NNJHZ/?coliid=IM4LHNGNNOB6J&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/511Skjf9gdL._SS135_.jpg",
    "price": 140.81,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Ceaco Disney - Thomas Kinkade - Alice no país das maravilhas - puzzle de 1000 peças",
    "amazonLink": "https://www.amazon.com.br/dp/B0CLQFDPWK/?coliid=I23TKJFESL7LQG&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51ddAiY2I3L._SS135_.jpg",
    "price": 202.6,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Mrs Dalloway - Edição comemorativa dos 100 anos - Capa Dura: Edição revisada",
    "amazonLink": "https://www.amazon.com.br/dp/6559285200/?coliid=IYL1QJZA5JDS3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51e5nfnEzeL._SS135_.jpg",
    "price": 64.41,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Ao Farol (Capa Dura)",
    "amazonLink": "https://www.amazon.com.br/dp/8582171986/?coliid=IWPL93XZCJFZ3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41xp0VcvXSL._SS135_.jpg",
    "price": 63.64,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "The Complete Peanuts: 1991-1992: Vol. 21 Hardcover Edition: 0",
    "amazonLink": "https://www.amazon.com.br/dp/1606997262/?coliid=I1MXB41QVZ82FE&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41SEjuH23EL._SS135_.jpg",
    "price": 153.27,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "The Complete Peanuts 1997-1998: Vol. 24 Hardcover Edition: 0",
    "amazonLink": "https://www.amazon.com.br/dp/1606998609/?coliid=I18LFD8UYBVLW2&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41koYwo7KZL._SS135_.jpg",
    "price": 150.58,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "The Complete Peanuts 1999-2000: Vol. 25 Hardcover Edition: 0",
    "amazonLink": "https://www.amazon.com.br/dp/1606999133/?coliid=I8692NFUO1P4S&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41T1Vx2Y8DL._SS135_.jpg",
    "price": 204.67,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Nós",
    "amazonLink": "https://www.amazon.com.br/dp/6560990648/?coliid=I35MQP3UZ4E856&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51zj6cfL+RL._SS135_.jpg",
    "price": 44.86,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Asmodee, Exploding Kittens, Jogo de Cartas para Amigos, 2 a 5 jogadores, Idade 8+ anos, Partidas de até 15 minutos",
    "amazonLink": "https://www.amazon.com.br/dp/B0CYHHSVKN/?coliid=I1B43N8S3GH3KQ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41Od4p7TFbL._SS135_.jpg",
    "price": 85.99,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Memórias do subsolo (tradução direta do original russo)",
    "amazonLink": "https://www.amazon.com.br/dp/8573261854/?coliid=I6OOERRZDX5OF&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51q5HvjLe7L._SS135_.jpg",
    "price": 46.42,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A extravagância do morto",
    "amazonLink": "https://www.amazon.com.br/dp/6555116706/?coliid=I5C4LNH0HUFS4&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41uJDMJLsbL._SS135_.jpg",
    "price": 40.94,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Os Treze Problemas",
    "amazonLink": "https://www.amazon.com.br/dp/6555112859/?coliid=IHSB4Y2XGB480&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41cSrdlM+hL._SS135_.jpg",
    "price": 43.27,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O continente - vol. 2",
    "amazonLink": "https://www.amazon.com.br/dp/8535905626/?coliid=I1UT61K1VMWQI7&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41FKAeozTTS._SS135_.jpg",
    "price": 76.29,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O continente - vol. 1",
    "amazonLink": "https://www.amazon.com.br/dp/8535905596/?coliid=I2NGZWBG4861XA&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/514pQxbSywS._SS135_.jpg",
    "price": 55,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Uma vida e tanto",
    "amazonLink": "https://www.amazon.com.br/dp/6559243702/?coliid=IRA8U8N2QLIAQ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41XSoZBlGxL._SS135_.jpg",
    "price": 39.96,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O Coliseu 4000 Pecas",
    "amazonLink": "https://www.amazon.com.br/dp/B0DKK5YR69/?coliid=I2E04LV79CVBMC&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51TKemMt6nL._SS135_.jpg",
    "price": 169,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "GROW P. 5000 PÇS MAPA MUNDI TURÍSTICO, Modelo: 4353",
    "amazonLink": "https://www.amazon.com.br/dp/B0BMCQ8H59/?coliid=I1OJ501UGOLKHQ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51Ps4fqxjWL._SS135_.jpg",
    "price": 189,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "QUEBRA CABEÇA P2000 VILAREJO DAS FADAS",
    "amazonLink": "https://www.amazon.com.br/dp/B0D3FLJXN1/?coliid=I3HKLE2LXMI0V3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51j+4tSVEJL._SS135_.jpg",
    "price": 90.99,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 2000 peças Pantanal - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0DKKHM1VL/?coliid=IL7E6MEK1XQUE&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51Dzu8z3mUL._SS135_.jpg",
    "price": 76.01,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 1000 peças Filhotes Brincando - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0C6YGKTJ4/?coliid=I2ZHHGORS4YJ88&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61T05UIb-jL._SS135_.jpg",
    "price": 51.07,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-Cabeças Casa no Lago 1000 Peças Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B07BFH2YJ5/?coliid=I3BZJ5GLVZ2Q42&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61gvnqOfkrL._SS135_.jpg",
    "price": 47,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 1000 peças Luar em Monte Saint-Michel - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0D15NWHTK/?coliid=I2T8W05HOENIUP&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51ymyth7azL._SS135_.jpg",
    "price": 45.64,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 1000 peças Recanto dos Cisnes - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B07D64P6RM/?coliid=I1OLJIVJNN72OR&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51VMETA23KL._SS135_.jpg",
    "price": 47.61,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 1000 peças Era uma vez - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0DKK49C27/?coliid=I10EM7SU7GU8UN&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51fxyLLjbEL._SS135_.jpg",
    "price": 62.96,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Misery: Louca obsessão",
    "amazonLink": "https://www.amazon.com.br/dp/8581052142/?coliid=I3V5R9W8QTK16E&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51U2I+1cVTL._SS135_.jpg",
    "price": 64.47,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O ano da graça",
    "amazonLink": "https://www.amazon.com.br/dp/6580775041/?coliid=I37U9PKTV67L92&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41-HWAU6GKL._SS135_.jpg",
    "price": 29.44,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Kindle 16 GB (Geração mais recente) - Leve e compacto, com tela antirreflexo, trocas de página mais rápidas, luz frontal ajustável e bateria de longa duração - Cor Verde",
    "amazonLink": "https://www.amazon.com.br/dp/B0CP31QS6R/?coliid=I17KZDNDH4N7OL&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/411NmQuM6GL._SS135_.jpg",
    "price": 649,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Fúria Vermelha",
    "amazonLink": "https://www.amazon.com.br/dp/852505822X/?coliid=I8TA1G4VQBAPZ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51rNAuKbXJL._SS135_.jpg",
    "price": 47.53,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Laurence King Publishing The World of Jane Austen 1000 Piece Jigsaw Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/1786279118/?coliid=I1VMWLH93OSCOJ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61Wl9PXWHhL._SS135_.jpg",
    "price": 239.65,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "The World of Sherlock Holmes: A Jigsaw Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/1786277492/?coliid=IXYTE5G6GXS2Y&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61wz1ACRg-L._SS135_.jpg",
    "price": 210.88,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A Book Lover's Christmas 1000 Piece Puzzle: A 1000-Piece Jigsaw Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/1399625500/?coliid=I15Z8CF0I5FPLO&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61GoGmToeIL._SS135_.jpg",
    "price": 168.79,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "299 Cats (and a dog): A Feline Cluster Puzzle",
    "amazonLink": "https://www.amazon.com.br/dp/1786276585/?coliid=I34BZRO4XBEY2C&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/5150swugj9L._SS135_.jpg",
    "price": 207.12,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Cem anos de solidão",
    "amazonLink": "https://www.amazon.com.br/dp/8501012076/?coliid=I228T44OP4HKJG&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/515cVYLIP9L._SS135_.jpg",
    "price": 41.83,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O Aleph",
    "amazonLink": "https://www.amazon.com.br/dp/8535912029/?coliid=I1NT8QMMGRP3AT&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41gdMx94bPL._SS135_.jpg",
    "price": 61.5,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Ficções (1944)",
    "amazonLink": "https://www.amazon.com.br/dp/8535911235/?coliid=I37ZHKB9ROBSO&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41Gzkl2ZTDL._SS135_.jpg",
    "price": 58.42,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Um defeito de cor",
    "amazonLink": "https://www.amazon.com.br/dp/8501071757/?coliid=I2SKBYM8SG1JAM&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/31S3NMQ1pcL._SS135_.jpg",
    "price": 72.64,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Nick e Charlie: Uma novela de Heartstopper",
    "amazonLink": "https://www.amazon.com.br/dp/8555342376/?coliid=ID8GL8NTMMN0R&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51s8OTl3LeL._SS135_.jpg",
    "price": 34.46,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Este inverno: Uma novela de Heartstopper",
    "amazonLink": "https://www.amazon.com.br/dp/8555342392/?coliid=IQ1QFAIFHSNLR&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51ROTa5MUPL._SS135_.jpg",
    "price": 36.46,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Heartstopper: Mais fortes juntos (vol. 5): Inspiração para a série da Netflix",
    "amazonLink": "https://www.amazon.com.br/dp/8555342945/?coliid=I28NZDQEXT2DRR&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51MuG5ZAFPL._SS135_.jpg",
    "price": 52.75,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Apenas amigos?",
    "amazonLink": "https://www.amazon.com.br/dp/6555656255/?coliid=IOZOTJHQQKPL2&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41vsxS5Q8xL._SS135_.jpg",
    "price": 43.14,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Asmodee, Azul Mini, Jogo de Tabuleiro para Amigos, 2 a 4 jogadores, Idade 8+, Partidas de até 40 minutos",
    "amazonLink": "https://www.amazon.com.br/dp/B0C83L9VP3/?coliid=I298091316QZGE&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/511jlMsCqPL._SS135_.jpg",
    "price": 173.61,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Para sempre seu",
    "amazonLink": "https://www.amazon.com.br/dp/6555655569/?coliid=I393DOO3KNJGS3&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41HJrWdDjML._SS135_.jpg",
    "price": 46.26,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Parte do seu mundo",
    "amazonLink": "https://www.amazon.com.br/dp/6555654880/?coliid=I14PP73M4A5V4G&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41XAnMR3rgL._SS135_.jpg",
    "price": 44.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Bíblia de Jerusalém - Média/Cristo",
    "amazonLink": "https://www.amazon.com.br/dp/8534953694/?coliid=I1Z6PMIH1TM7TS&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/416izc9zTZL._SS135_.jpg",
    "price": 99.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Álbum Viagem para 200 fotos 10x15-561",
    "amazonLink": "https://www.amazon.com.br/dp/B09NRQWCS5/?coliid=IYWVMXXCMBR7Z&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/61OgBnliqUL._SS135_.jpg",
    "price": 49,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "No fundo é amor",
    "amazonLink": "https://www.amazon.com.br/dp/6555657596/?coliid=I31JIXYSUAG9UX&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/410q7jdLHjL._SS135_.jpg",
    "price": 49.78,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O resgate no mar (Outlander - Livro 3)",
    "amazonLink": "https://www.amazon.com.br/dp/8580418224/?coliid=I32JVCCNA7GHL8&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51ungyd6MXL._SS135_.jpg",
    "price": 89.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A libélula no âmbar (Outlander - Livro 2)",
    "amazonLink": "https://www.amazon.com.br/dp/8580417899/?coliid=I362878JLXUGOI&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51ewoBBR53L._SS135_.jpg",
    "price": 73.34,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-Cabeça Panorama Horizonte Grego 750 Peças",
    "amazonLink": "https://www.amazon.com.br/dp/B096GXS82D/?coliid=I17MX09V5B9YRL&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51eCOSjZxMS._SS135_.jpg",
    "price": 81.21,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O café da praia: Uma receita para o desastre ou uma receita para o amor?",
    "amazonLink": "https://www.amazon.com.br/dp/8530600371/?coliid=I3B1VWRNXF1IOU&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51HlfjTePbL._SS135_.jpg",
    "price": 48.7,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Chuvas esparsas: Contos",
    "amazonLink": "https://www.amazon.com.br/dp/8555343143/?coliid=I3OEUI4WO00PF5&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41liJBfERzL._SS135_.jpg",
    "price": 48.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A árvore mais sozinha do mundo - Vencedor do Prêmio São Paulo de Literatura: Melhor romance do ano 2024",
    "amazonLink": "https://www.amazon.com.br/dp/6556926124/?coliid=I2TRIFSMT2SQRF&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/513W2OQlthL._SS135_.jpg",
    "price": 58.04,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Jogo Perfil Express Filmes e Séries - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0BV7KHL8J/?coliid=I34V1IE0AK6IY4&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51juESPTYYL._SS135_.jpg",
    "price": 35.3,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Clube de leitura dos corações solitários",
    "amazonLink": "https://www.amazon.com.br/dp/6553933189/?coliid=ITF3WDYJ0QQRN&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51brF4yAooL._SS135_.jpg",
    "price": 42.06,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A probabilidade estatística do amor à primeira vista",
    "amazonLink": "https://www.amazon.com.br/dp/8501095443/?coliid=ICTU58A2Q3DJ8&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/512CfGr6s7L._SS135_.jpg",
    "price": 49.92,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O Feitiço dos Espinhos",
    "amazonLink": "https://www.amazon.com.br/dp/6599166105/?coliid=I2YSHV9A70XAKL&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51tvq8XiaBL._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Te vejo ontem",
    "amazonLink": "https://www.amazon.com.br/dp/6559812448/?coliid=I2ZTUZJV55KK8M&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51LQPbO4w4L._SS135_.jpg",
    "price": 29.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Não é como nos filmes: (Melhor do que nos filmes – vol. 2)",
    "amazonLink": "https://www.amazon.com.br/dp/8551014153/?coliid=I4228OIY9NYH0&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41HkMO3-RkL._SS135_.jpg",
    "price": 47.02,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Não é amor",
    "amazonLink": "https://www.amazon.com.br/dp/6555656484/?coliid=IHOHVCD5EO4MK&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51DvsGt-r5L._SS135_.jpg",
    "price": 46.26,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 500 peças Aurora Boreal - Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B0D15RSVM2/?coliid=I5U1FGQXWH5LP&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51+uk1dbaaL._SS135_.jpg",
    "price": 49.12,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Headset Gamer Sem Fio Logitech G435 LIGHTSPEED, Conexão USB e Bluetooth, Design Leve e Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile – Branco",
    "amazonLink": "https://www.amazon.com.br/dp/B08R8DQDRK/?coliid=I3Q8B32FFZD252&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41uZfN8QBvL._SS135_.jpg",
    "price": 420,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Um crime adormecido",
    "amazonLink": "https://www.amazon.com.br/dp/6560051501/?coliid=I1ZGTCIAPBHEB4&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41ioGslf0jL._SS135_.jpg",
    "price": 46.7,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Convite para um homicídio",
    "amazonLink": "https://www.amazon.com.br/dp/6555111755/?coliid=I3M5GHLKC8VYJD&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41404VGBzZS._SS135_.jpg",
    "price": 35.34,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Pais & Filhos | Quebra‑Cabeça Fontana di Trevi 1000 Peças | Desafio Mental, Relaxamento & Lazer para Adultos e Famílias | Alto Encaixe & Impressão Nítida",
    "amazonLink": "https://www.amazon.com.br/dp/B0CXY6DQSY/?coliid=I2PKIKTY1DPMDG&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/519e28135ZL._SS135_.jpg",
    "price": 41.36,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "P500 CAFÉ EM PARIS, Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B07PLGC39R/?coliid=I563XEYIN5YIA&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51X6Qd5Q25L._SS135_.jpg",
    "price": 33.79,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O misterioso Mr. Quin",
    "amazonLink": "https://www.amazon.com.br/dp/6555113901/?coliid=I12MTG4L352273&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41M1fJOcdIL._SS135_.jpg",
    "price": 43.27,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Amor(es) verdadeiro(s)",
    "amazonLink": "https://www.amazon.com.br/dp/8584391673/?coliid=I3TTELFP59V8N&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51dwuBhSxpL._SS135_.jpg",
    "price": 53.33,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Para sempre interrompido",
    "amazonLink": "https://www.amazon.com.br/dp/8584392319/?coliid=I320M2MWS0BNJ&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41VwnuGL3HL._SS135_.jpg",
    "price": 49.4,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Evidências de uma traição",
    "amazonLink": "https://www.amazon.com.br/dp/8584393587/?coliid=I1N5TP12NX0ZL6&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41iLudwICfL._SS135_.jpg",
    "price": 41.58,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-cabeça 4000 peças Ruas de Paris, Grow",
    "amazonLink": "https://www.amazon.com.br/dp/B09KHM1D71/?coliid=I29N8BXOWSTN9V&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51QHtltHCPL._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Quebra-Cabeça Montmartre 3000 Peças, Grow, Multicor",
    "amazonLink": "https://www.amazon.com.br/dp/B09BBPVKB4/?coliid=IO4PY03KQMI2A&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51V-twT96QL._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Os delírios de Natal de Becky Bloom",
    "amazonLink": "https://www.amazon.com.br/dp/8501118249/?coliid=I2PN69GYHR2DAY&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41UGfRaKZ9L._SS135_.jpg",
    "price": 58.25,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Uma questão de química",
    "amazonLink": "https://www.amazon.com.br/dp/6555652888/?coliid=I1T4ZGAHJJSJT&colid=37PZDZHGJOOF&psc=0&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41y7-T3DFRL._SS135_.jpg",
    "price": 0,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Cai o pano",
    "amazonLink": "https://www.amazon.com.br/dp/6555114444/?coliid=I3C6Z2XVV3O24Y&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41+xQQMqfuL._SS135_.jpg",
    "price": 35.04,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Um gato entre os pombos",
    "amazonLink": "https://www.amazon.com.br/dp/6555111348/?coliid=I2F6VSAERF12IN&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41PQ1S4UEhL._SS135_.jpg",
    "price": 43.25,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Depois do funeral",
    "amazonLink": "https://www.amazon.com.br/dp/6555115130/?coliid=I1AK1OS27DOYRG&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41p8s7a7YNL._SS135_.jpg",
    "price": 43.43,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A revolta do corpo",
    "amazonLink": "https://www.amazon.com.br/dp/8578273958/?coliid=I2MGB7F9E4ZITA&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/31xdV-OnBgL._SS135_.jpg",
    "price": 50.48,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Álbum de Fotos 200 Fotos 10x15 R Viagem 559",
    "amazonLink": "https://www.amazon.com.br/dp/B07W4X4TJY/?coliid=I4TG5EYQMXMRO&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41kWXDnJw8L._SS135_.jpg",
    "price": 50.4,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Mesa para um",
    "amazonLink": "https://www.amazon.com.br/dp/6555607408/?coliid=I70WFD7W0358O&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41ctay2rTML._SS135_.jpg",
    "price": 46.45,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Tweet Cute: O @mor é uma receita secreta",
    "amazonLink": "https://www.amazon.com.br/dp/6588343396/?coliid=I1JCSUZK1CH3DD&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41puH9AmIQL._SS135_.jpg",
    "price": 58.05,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A cidade do sol",
    "amazonLink": "https://www.amazon.com.br/dp/8525060305/?coliid=I1OOWH7P2XG4IL&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/418zJwU9ljS._SS135_.jpg",
    "price": 49.37,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Os miseráveis",
    "amazonLink": "https://www.amazon.com.br/dp/8544000002/?coliid=I357H1FP4YXJW7&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51UvQ7XBImL._SS135_.jpg",
    "price": 156.95,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O caminho dos reis: 1",
    "amazonLink": "https://www.amazon.com.br/dp/6589132682/?coliid=I5WJPZG2HGZ0E&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41N6gelEroL._SS135_.jpg",
    "price": 109.61,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O cavalo amarelo",
    "amazonLink": "https://www.amazon.com.br/dp/8595086818/?coliid=I3R18UY6H6B2RX&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41YUXrfuDHL._SS135_.jpg",
    "price": 43.85,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O que o vento sussurra",
    "amazonLink": "https://www.amazon.com.br/dp/6559240924/?coliid=I1CHTT2P3D4NMY&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41qldnbAoeL._SS135_.jpg",
    "price": 47.06,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Jane Eyre: edição comentada e ilustrada: Uma autobiografia",
    "amazonLink": "https://www.amazon.com.br/dp/8537817619/?coliid=I18GFUMR1J67PO&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41pOBnQuXFS._SS135_.jpg",
    "price": 75.35,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Os Quatro Grandes",
    "amazonLink": "https://www.amazon.com.br/dp/8595085919/?coliid=I32X0SPKWDZILM&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/418wH2P72rL._SS135_.jpg",
    "price": 45.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O Natal de Hercule Poirot",
    "amazonLink": "https://www.amazon.com.br/dp/6555112247/?coliid=I2Z6MVPMN6KNOR&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/413bpZ4gJDL._SS135_.jpg",
    "price": 34.29,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Queda de gigantes (Trilogia O Século – Livro 1)",
    "amazonLink": "https://www.amazon.com.br/dp/859929685X/?coliid=I3603TB388HDM4&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51tFWX8AFtL._SS135_.jpg",
    "price": 79.7,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O labirinto dos espíritos",
    "amazonLink": "https://www.amazon.com.br/dp/8556510434/?coliid=I3EYUP8JDJ5X3A&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/51FHngsHywL._SS135_.jpg",
    "price": 116.94,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A Revolução dos bichos",
    "amazonLink": "https://www.amazon.com.br/dp/6586490189/?coliid=I2XMPD6VQDGN8K&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/5150Bdg-EML._SS135_.jpg",
    "price": 49.26,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Noite sem fim",
    "amazonLink": "https://www.amazon.com.br/dp/859508548X/?coliid=I2Z25BPK6892DG&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41uXii8hH7L._SS135_.jpg",
    "price": 34.9,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "O Meu Pé de Laranja Lima",
    "amazonLink": "https://www.amazon.com.br/dp/8506086892/?coliid=I1IV4MVPGKMZ5G&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/41sN8Z91GIL._SS135_.jpg",
    "price": 25.06,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "A princesinha",
    "amazonLink": "https://www.amazon.com.br/dp/8544002323/?coliid=I34WGP4QQRCQ0E&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/515vvxqSxxL._SS135_.jpg",
    "price": 55.64,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  },
  {
    "title": "Falando o mais rápido que posso: De Gilmore Girls a Gilmore Girls e tudo no meio do caminho: De Gilmore Girls a Gilmore Girls e tudo no meio do caminho",
    "amazonLink": "https://www.amazon.com.br/dp/850110874X/?coliid=IC5E2452MCU8P&colid=37PZDZHGJOOF&psc=1&ref_=list_c_wl_lv_vv_lig_dp_it",
    "imageUrl": "https://m.media-amazon.com/images/I/514RU1Iyx9L._SS135_.jpg",
    "price": 58.25,
    "isPurchased": false,
    "description": "Um item muito especial para o nosso casamento!"
  }
];

  console.log(`Iniciando o seeding de ${giftsData.length} presentes...`);

  // O createMany vai inserir todos de uma vez
  const result = await prisma.giftItem.createMany({
    data: giftsData,
    skipDuplicates: true, // Ignora caso o presente já exista (baseado em campos unique, se houver)
  });

  console.log(`Seeding concluído: ${result.count} presentes inseridos no banco com sucesso.`);
}

main()
  .catch((e) => {
    console.error('Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
