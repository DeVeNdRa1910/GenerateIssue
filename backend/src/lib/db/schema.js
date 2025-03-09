import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const Employee = pgTable("Employee", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    image: text("image"),
    role: varchar("role", { length: 100 }).notNull().default("ASE"),
    adminId: integer("adminId").references(() => Admin.id, { onDelete: "set null" }), 
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const User = pgTable("User", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    password: varchar("password", { length: 100 }).notNull(),
})

export const Admin = pgTable("Admin", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    image: text("image"),
    employeeIds: integer("employeeIds").array().default(sql`ARRAY[]::integer[]`), 
    role: varchar("role", { length: 100 }).notNull().default("Software Developer"),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const issue = pgTable("issue", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description").notNull(),
    status: varchar("status", { length: 100 }).default("Pending"),
    image: text("image"),
    employeeId: integer("employeeId").notNull().references(() => Employee.id, {onDelete: "cascade"}),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
