const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const keepPending = [
  'cmnqlfdnm004jjp04agn4nnoo','cmnqlg12y005vjp048wr4ds51','cmnqlf3er003ljp047loxerpd',
  'cmnqlex2q0032jp04jn1icj4m','cmnqlfdv3004ljp04agt04cvz','cmnqlh35y008bjp04gc3hurmt',
  'cmnr5w2d00005jo04iwzq2lha','cmnqlf0wt003hjp04i9araylc','cmnqlf3xo003qjp04q1bxsbi6',
  'cmnqlfjm8004sjp0455y5w2hx','cmnqleubo002zjp04jhjkaacs','cmnqle8eq0011jp04bj9ks5ax',
  'cmnqlexhw0036jp04392ht1ki','cmnqlel0l0027jp04h0jy08se','cmnqle7sg000vjp04qc62908a',
  'cmnqlf3ay003kjp04209dtyvh','cmnqldyjy0001jp0410xgtzg9','cmnqleqnw002kjp048p8nhvdh',
  'cmnqlfczl004djp04ycf4p03x','cmnqlgxra007ujp04j22gwess','cmnqlh2c60084jp04dgyl80ma',
  'cmnqlh7os008cjp04v4n2mqy5','cmnr5w2jk0007jo04pxqze212','cmnqlgt3u007sjp04asu3j453',
  'cmnr5w23e0002jo043jdbnudt','cmnqlg4nv006ajp048kmxbxrp','cmnqlekls0023jp04txrdnnrc',
  'cmnqlenn4002cjp04mh168ogc','cmnqlgyop0083jp042o19ywwb','cmnqlfj3a004ojp048ckqoubf',
  'kw30','cmnr5w29t0004jo04es2ymoco','cmnr4mdwe0004l804a3azl86e',
  'cmnr5w26l0003jo049ojb1xng','cmnr5eruu0006jy04qzej3xzm','cmnr5erd40001jy04o7bxs05z'
];

async function main() {
  const pending = await prisma.$queryRaw`SELECT id FROM "SeoKeyword" WHERE status='pending'`;
  let skipped = 0;
  for (const row of pending) {
    if (!keepPending.includes(row.id)) {
      await prisma.$executeRaw`UPDATE "SeoKeyword" SET status='generated' WHERE id=${row.id}`;
      skipped++;
    }
  }
  const r = await prisma.$queryRaw`SELECT COUNT(*)::int as c FROM "SeoKeyword" WHERE status='pending'`;
  console.log(`Skipped ${skipped} duplicates. Remaining pending: ${r[0].c}`);
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
