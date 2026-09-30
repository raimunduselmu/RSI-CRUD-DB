import { eq } from 'drizzle-orm';
import { getDb } from '../db/index.ts';
import { reviews, users } from '../db/schema.ts';

export interface CreateReviewInput {
  stallId: number;
  userId: number;
  rating: number;
  comment?: string | null;
}

export class ReviewRepository {
  async findAll() {
    const db = await getDb();

    return db
      .select({
        id: reviews.id,
        stallId: reviews.stallId,
        userId: reviews.userId,
        rating: reviews.rating,
        comment: reviews.comment,
        likeCount: reviews.likeCount,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,

        // JOIN ke USERS
        userName: users.name,
        userEmail: users.email,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .orderBy(reviews.id);
  }

  async findById(id: number) {
    const db = await getDb();

    const rows = await db
      .select({
        id: reviews.id,
        stallId: reviews.stallId,
        userId: reviews.userId,
        rating: reviews.rating,
        comment: reviews.comment,
        likeCount: reviews.likeCount,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,

        // JOIN ke USERS
        userName: users.name,
        userEmail: users.email,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.id, id));

    return rows[0];
  }

  async create(input: CreateReviewInput) {
    const db = await getDb();

    await db
      .insert(reviews)
      .values({
        stallId: input.stallId,
        userId: input.userId,
        rating: input.rating,
        comment: input.comment ?? null,
        likeCount: 0,
      });

    const rows = await db
      .select({
        id: reviews.id,
        stallId: reviews.stallId,
        userId: reviews.userId,
        rating: reviews.rating,
        comment: reviews.comment,
        likeCount: reviews.likeCount,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,

        userName: users.name,
        userEmail: users.email,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.userId, input.userId))
      .orderBy(reviews.id);

    const created = rows
      .filter(
        (row) =>
          row.stallId === input.stallId &&
          row.rating === input.rating &&
          row.comment === (input.comment ?? null),
      )
      .at(-1);

    return created;
  }

  async remove(id: number) {
    const db = await getDb();

    const existing = await this.findById(id);

    if (!existing) {
      return undefined;
    }

    await db
      .delete(reviews)
      .where(eq(reviews.id, id));

    return existing;
  }
}