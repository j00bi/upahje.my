-- Additive-only migration for the editorial content model.
-- Generated from the schema diff, then reduced to the new objects:
-- the repo's committed initial migration already drifts from schema.prisma
-- (marketplace columns/tables), and this migration must not repair that.

CREATE TYPE "ArticleType" AS ENUM ('explainer', 'guide', 'comparison', 'perspective');

CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameMs" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "descriptionMs" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "hidden" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleMs" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "descriptionMs" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "translationKey" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL,
    "primaryCategoryId" TEXT NOT NULL,
    "secondaryCategoryId" TEXT,
    "authorId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_translations" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bodyMarkdown" TEXT NOT NULL,
    "paragraphCount" INTEGER NOT NULL,
    "readingMinutes" INTEGER NOT NULL,
    "canonicalUrl" TEXT,

    CONSTRAINT "article_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_sources" (
    "id" TEXT NOT NULL,
    "translationId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3),

    CONSTRAINT "article_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_figures" (
    "id" TEXT NOT NULL,
    "translationId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT,
    "width" INTEGER,
    "height" INTEGER,

    CONSTRAINT "article_figures_pkey" PRIMARY KEY ("id")
);


CREATE UNIQUE INDEX "authors_slug_key" ON "authors"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "collections_slug_key" ON "collections"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_translationKey_key" ON "articles"("translationKey");

-- CreateIndex
CREATE UNIQUE INDEX "article_translations_articleId_lang_key" ON "article_translations"("articleId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "article_translations_lang_slug_key" ON "article_translations"("lang", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_sources_translationId_position_key" ON "article_sources"("translationId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "article_figures_translationId_position_key" ON "article_figures"("translationId", "position");


ALTER TABLE "articles" ADD CONSTRAINT "articles_primaryCategoryId_fkey" FOREIGN KEY ("primaryCategoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_secondaryCategoryId_fkey" FOREIGN KEY ("secondaryCategoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_translations" ADD CONSTRAINT "article_translations_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_sources" ADD CONSTRAINT "article_sources_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "article_translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_figures" ADD CONSTRAINT "article_figures_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "article_translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
