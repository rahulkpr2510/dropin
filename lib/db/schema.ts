import {pgTable, text, uuid, integer, boolean, timestamp} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files", {
    // Unique identifier for each file/folder
    id: uuid("id").defaultRandom().primaryKey(),

    // Basic file/folder information
    name: text("name").notNull(),
    path: text("path").notNull(), // Full path to the files/folder
    size: integer("size").notNull(), // Size in bytes (0 for folders)
    type: text("type").notNull(), // MIME type for files, "folder" for folders

    // Storage information
    fileUrl: text("file_url").notNull(), // URL to access the file
    thumbnailUrl: text("thumbnail_url"), // Optional thumbnail for images/documents

    // Ownership and Hierarchy
    userId: text("user_id").notNull(), // Owner of the file/folder
    parentId: uuid("parent_id"), // parent folder id (null for root item)

    // file/folder flages
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

/*
parent: Each file/folder can have one parent folder
children: Each folder can have many child files/folder 
*/

export const filesRelations = relations(files, ({one, many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    // relationship to child file/folder
    children: many(files)
}))

// Type Definations

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert
