import { eq, desc } from 'drizzle-orm';
import { getDb } from '../db/index.ts';
import { menuItems } from '../db/schema.ts';

export class MenuItemRepository {
  async findAll() {
    const db = await getDb();
    return db.select().from(menuItems);
  }

  async findById(id: number) {
    const db = await getDb();
    const result = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return result[0];
  }

  async findByStallId(stallId: number) {
    const db = await getDb();
    return db.select().from(menuItems).where(eq(menuItems.stallId, stallId));
  }

  async create(input: any) {
    const db = await getDb();
    await db.insert(menuItems).values(input);
    const allItems = await db.select().from(menuItems).orderBy(desc(menuItems.id));
    return allItems[0];
  }

  async update(id: number, input: any) {
    const db = await getDb();
    await db.update(menuItems).set(input).where(eq(menuItems.id, id));
    const result = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return result[0];
  }

  // TAMBAHKAN METHOD REMOVE INI
  async remove(id: number) {
    const db = await getDb();
    return db.delete(menuItems).where(eq(menuItems.id, id));
  }
}