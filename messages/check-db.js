"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const messages = await prisma.message.findMany();
    console.log(JSON.stringify(messages, null, 2));
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=check-db.js.map