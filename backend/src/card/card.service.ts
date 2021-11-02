import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Card, Prisma, User } from '@prisma/client';
import { CardDto, CreateCardDto } from 'src/constants/card';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  /** Find first card by id
   * @param  {number} cardId
   * @returns Promise
   */
  async find(cardId: number): Promise<CardDto> {
    const cardWhereUniqueInput: Prisma.CardWhereUniqueInput = {
      id: cardId,
    };
    return this.prisma.card.findUnique({
      where: cardWhereUniqueInput,
    });
  }

  /** Find all cards with prisma options
   * @param  {{skip?:number;take?:number;cursor?:Prisma.CardWhereUniqueInput;where?:Prisma.CardWhereInput;orderBy?:Prisma.CardOrderByWithRelationInput;}} params
   * @returns Promise
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CardWhereUniqueInput;
    where?: Prisma.CardWhereInput;
    orderBy?: Prisma.CardOrderByWithRelationInput;
  }): Promise<Card[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.card.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /** Creates Card
   * @param  {CreateCardDto} data
   * @returns Promise
   */
  async create(card: CreateCardDto, user: User): Promise<CardDto> {
    const cardOrder = await this.prisma.card.count({
      where: {
        state: {
          id: +card.state_id,
        },
      },
    });

    const { title, desc, due_date } = card;

    const cardCreateInput: Prisma.CardCreateInput = {
      title,
      desc,
      due_date,
      state: {
        connect: {
          id: +card.state_id,
        },
      },
      creator: {
        connect: {
          id: +user.id,
        },
      },
      order: cardOrder,
    };

    return this.prisma.card.create({
      data: cardCreateInput,
    });
  }

  /** Delete a card by id
   * @param  {number} cardId
   * @returns Promise
   */
  async delete(user: User, cardId: number): Promise<Card> {
    return this.prisma.card.delete({
      where: { id: cardId },
    });
  }
}
