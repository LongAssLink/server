-- Add migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "public"."links" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "slug" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "dest" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT current_timestamp,
  "updated_at" timestamp(6) DEFAULT current_timestamp
)
;

CREATE UNIQUE INDEX "idx_slug" ON "public"."links" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

ALTER TABLE "public"."links" ADD CONSTRAINT "links_pkey" PRIMARY KEY ("id");