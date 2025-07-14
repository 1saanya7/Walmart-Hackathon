import { pipeline as createPipeline } from '@xenova/transformers';
import { MongoClient } from 'mongodb';

let books = [];
let embeddings = [];
let model;

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}

// ✅ Normalize queries for better matching
function normalizeQuery(input) {
  return input
    .toLowerCase()
    .replace(/^suggest( me)?/, '')
    .replace(/^can you( please)?/, '')
    .replace(/^show( me)?/, '')
    .replace(/^i want/, '')
    .replace(/^find( me)?/, '')
    .replace(/^give( me)?/, '')
    .replace(/^\s+/, '')
    .trim();
}

export async function initialize(mongoUri, dbName = 'books', collection = 'books') {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);

  const collections = await db.listCollections().toArray();
  console.log('📂 Collections in DB:', dbName, '=>', collections.map(c => c.name));

  const testCount = await db.collection(collection).countDocuments();
  console.log(`📊 Document count in ${dbName}.${collection}: ${testCount}`);

  books = await db.collection(collection).find({}).toArray();

  console.log(`[HybridSearch] Found ${books.length} raw books`);

  model = await createPipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  for (const book of books) {
    const text = `${book.title ?? ''} ${book.description ?? ''}`;
    const output = await model(text, { pooling: 'mean', normalize: true });
    embeddings.push(output.data);
  }

  console.log(`[HybridSearch] Loaded ${books.length} books and built embeddings.`);
}

export async function hybridSearch(query, topK = 10, threshold = 0.15) {
  const cleanedQuery = normalizeQuery(query);
  const queryVec = (await model(cleanedQuery, { pooling: 'mean', normalize: true })).data;

  const results = embeddings.map((emb, i) => {
    const score = cosineSimilarity(queryVec, emb);
    return { index: i, score };
  });

  let filtered = results
    .filter(({ score }) => score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // 🧪 Debug log
  console.log('🔎 Semantic matches:', filtered.map(r => ({
    title: books[r.index]?.title,
    score: r.score.toFixed(3),
  })));

  // Fallback: keyword-based
  if (filtered.length < 3) {
    const q = cleanedQuery.toLowerCase();
    const keywordMatches = books
      .map((book, index) => ({
        index,
        score:
          (book.title?.toLowerCase().includes(q) ? 0.3 : 0) +
          (book.description?.toLowerCase().includes(q) ? 0.3 : 0),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    console.log('🔁 Using keyword fallback');
    filtered = [...filtered, ...keywordMatches].slice(0, topK);
  }

  return filtered.map(({ index, score }) => ({
    ...books[index],
    relevanceScore: Math.round(score * 100),
  }));
}
