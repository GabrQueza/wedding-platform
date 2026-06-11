import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException(
        'GEMINI_API_KEY is not configured',
      );
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async chatWithGuest(message: string): Promise<string> {
    const availableGifts = await this.prisma.giftItem.findMany({
      where: { isPurchased: false },
      select: { title: true, price: true },
    });

    const giftsList = availableGifts
      .map((g) => `- ${g.title} (R$ ${g.price})`)
      .join('\n');

    const systemInstruction = `Você é a assistente virtual amigável do site de casamento do Gabriel e sua Thaliny. O casamento será uma celebração especial na Villa Pizzo (Itália). O endereço do mapa é: https://www.google.com/maps/place/Villa+Pizzo.
Responda dúvidas dos convidados de forma educada, curta e carinhosa. O traje é esporte fino e o local tem estacionamento próprio.

Abaixo está a lista atualizada de presentes disponíveis:
${giftsList}

Se o convidado pedir dicas de presentes, liste de forma natural 2 ou 3 opções dessa lista. Não sugira nada que não esteja nesta lista.
Se não souber a resposta para alguma outra dúvida, peça para o convidado entrar em contato direto com os noivos.`;

    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  }

  async generateThankYouNote(
    guestName: string,
    giftName: string,
  ): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const prompt = `Gere uma mensagem de agradecimento de WhatsApp, curta e emocionante, para ${guestName} pelo presente recebido: ${giftName}.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}
