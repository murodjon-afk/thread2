Object.defineProperty(exports, "__esModule", { value: true });

import {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime
  // skip удалён, т.к. не используется
} from './runtime/index-browser.js';

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
};

function makeThrowingFunction(name) {
  return () => {
    const runtimeName = getRuntime().prettyName;
    throw new Error(`${name} is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
}

Prisma.PrismaClientKnownRequestError = makeThrowingFunction("PrismaClientKnownRequestError");
Prisma.PrismaClientUnknownRequestError = makeThrowingFunction("PrismaClientUnknownRequestError");
Prisma.PrismaClientRustPanicError = makeThrowingFunction("PrismaClientRustPanicError");
Prisma.PrismaClientInitializationError = makeThrowingFunction("PrismaClientInitializationError");
Prisma.PrismaClientValidationError = makeThrowingFunction("PrismaClientValidationError");

Prisma.Decimal = Decimal;

Prisma.sql = makeThrowingFunction("sqltag");
Prisma.empty = makeThrowingFunction("empty");
Prisma.join = makeThrowingFunction("join");
Prisma.raw = makeThrowingFunction("raw");

Prisma.validator = Public.validator;

Prisma.getExtensionContext = makeThrowingFunction("Extensions.getExtensionContext");
Prisma.defineExtension = makeThrowingFunction("Extensions.defineExtension");

Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  published: 'published',
  authorId: 'authorId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.ModelName = {
  User: 'User',
  Post: 'Post'
};

class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = getRuntime();
        const message = runtime.isEdge
          ? `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters`
          : `PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in '${runtime.prettyName}').`;

        throw new Error(message + `\nIf this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`);
      }
    });
  }
}

exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
