import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.9.0
 * Query Engine version: 369b3694b7edb869fad14827a33ad3f3f49bbc20
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): SessionDelegate;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): CategoryDelegate;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): ProductDelegate;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): CartDelegate;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): OrderDelegate;

  /**
   * `prisma.orderDetail`: Exposes CRUD operations for the **OrderDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderDetails
    * const orderDetails = await prisma.orderDetail.findMany()
    * ```
    */
  get orderDetail(): OrderDetailDelegate;

  /**
   * `prisma.topSellingItem`: Exposes CRUD operations for the **TopSellingItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TopSellingItems
    * const topSellingItems = await prisma.topSellingItem.findMany()
    * ```
    */
  get topSellingItem(): TopSellingItemDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const UserDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name',
  email: 'email',
  hashedPassword: 'hashedPassword',
  role: 'role',
  contactNo: 'contactNo',
  whatsapp: 'whatsapp',
  address: 'address',
  shopName: 'shopName',
  openingHrs: 'openingHrs',
  closingHrs: 'closingHrs',
  orderAcceptTime: 'orderAcceptTime',
  verified: 'verified'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const SessionDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  expiresAt: 'expiresAt',
  handle: 'handle',
  userId: 'userId',
  hashedSessionToken: 'hashedSessionToken',
  antiCSRFToken: 'antiCSRFToken',
  publicData: 'publicData',
  privateData: 'privateData'
};

export declare type SessionDistinctFieldEnum = (typeof SessionDistinctFieldEnum)[keyof typeof SessionDistinctFieldEnum]


export declare const CategoryDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name'
};

export declare type CategoryDistinctFieldEnum = (typeof CategoryDistinctFieldEnum)[keyof typeof CategoryDistinctFieldEnum]


export declare const ProductDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name',
  imageUrl: 'imageUrl',
  description: 'description',
  price: 'price',
  stock: 'stock',
  minQuantity: 'minQuantity',
  measure: 'measure',
  catId: 'catId'
};

export declare type ProductDistinctFieldEnum = (typeof ProductDistinctFieldEnum)[keyof typeof ProductDistinctFieldEnum]


export declare const CartDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  quantity: 'quantity',
  productId: 'productId',
  productPrice: 'productPrice',
  userId: 'userId'
};

export declare type CartDistinctFieldEnum = (typeof CartDistinctFieldEnum)[keyof typeof CartDistinctFieldEnum]


export declare const OrderDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  phone: 'phone',
  address: 'address',
  pinCode: 'pinCode',
  userId: 'userId',
  totalPrice: 'totalPrice',
  payMode: 'payMode',
  payStatus: 'payStatus',
  orderStatus: 'orderStatus'
};

export declare type OrderDistinctFieldEnum = (typeof OrderDistinctFieldEnum)[keyof typeof OrderDistinctFieldEnum]


export declare const OrderDetailDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  quantity: 'quantity',
  orderId: 'orderId',
  goodsId: 'goodsId',
  productPrice: 'productPrice'
};

export declare type OrderDetailDistinctFieldEnum = (typeof OrderDetailDistinctFieldEnum)[keyof typeof OrderDetailDistinctFieldEnum]


export declare const TopSellingItemDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  itemName: 'itemName',
  minQty: 'minQty',
  userId: 'userId'
};

export declare type TopSellingItemDistinctFieldEnum = (typeof TopSellingItemDistinctFieldEnum)[keyof typeof TopSellingItemDistinctFieldEnum]


export declare const Role: {
  user: 'user',
  admin: 'admin'
};

export declare type Role = (typeof Role)[keyof typeof Role]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const Measure: {
  perKg: 'perKg',
  perItem: 'perItem'
};

export declare type Measure = (typeof Measure)[keyof typeof Measure]


export declare const PayStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID'
};

export declare type PayStatus = (typeof PayStatus)[keyof typeof PayStatus]


export declare const Status: {
  NULL: 'NULL',
  PENDING: 'PENDING',
  DELIVERED: 'DELIVERED'
};

export declare type Status = (typeof Status)[keyof typeof Status]



/**
 * Model User
 */

export type User = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string | null
  email: string
  hashedPassword: string | null
  role: Role
  contactNo: string | null
  whatsapp: string | null
  address: string | null
  shopName: string | null
  openingHrs: Date | null
  closingHrs: Date | null
  orderAcceptTime: Date | null
  verified: boolean
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  name?: boolean
  email?: boolean
  hashedPassword?: boolean
  role?: boolean
  contactNo?: boolean
  whatsapp?: boolean
  address?: boolean
  shopName?: boolean
  openingHrs?: boolean
  closingHrs?: boolean
  orderAcceptTime?: boolean
  sessions?: boolean | FindManySessionArgs
  cart?: boolean | FindManyCartArgs
  orders?: boolean | FindManyOrderArgs
  topItems?: boolean | FindManyTopSellingItemArgs
  verified?: boolean
}

export type UserInclude = {
  sessions?: boolean | FindManySessionArgs
  cart?: boolean | FindManyCartArgs
  orders?: boolean | FindManyOrderArgs
  topItems?: boolean | FindManyTopSellingItemArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'sessions'
      ? Array<SessionGetPayload<S['include'][P]>> :
      P extends 'cart'
      ? Array<CartGetPayload<S['include'][P]>> :
      P extends 'orders'
      ? Array<OrderGetPayload<S['include'][P]>> :
      P extends 'topItems'
      ? Array<TopSellingItemGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'sessions'
      ? Array<SessionGetPayload<S['select'][P]>> :
      P extends 'cart'
      ? Array<CartGetPayload<S['select'][P]>> :
      P extends 'orders'
      ? Array<OrderGetPayload<S['select'][P]>> :
      P extends 'topItems'
      ? Array<TopSellingItemGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  sessions<T extends FindManySessionArgs = {}>(args?: Subset<T, FindManySessionArgs>): CheckSelect<T, Promise<Array<Session>>, Promise<Array<SessionGetPayload<T>>>>;

  cart<T extends FindManyCartArgs = {}>(args?: Subset<T, FindManyCartArgs>): CheckSelect<T, Promise<Array<Cart>>, Promise<Array<CartGetPayload<T>>>>;

  orders<T extends FindManyOrderArgs = {}>(args?: Subset<T, FindManyOrderArgs>): CheckSelect<T, Promise<Array<Order>>, Promise<Array<OrderGetPayload<T>>>>;

  topItems<T extends FindManyTopSellingItemArgs = {}>(args?: Subset<T, FindManyTopSellingItemArgs>): CheckSelect<T, Promise<Array<TopSellingItem>>, Promise<Array<TopSellingItemGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Session
 */

export type Session = {
  id: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date | null
  handle: string
  userId: number | null
  hashedSessionToken: string | null
  antiCSRFToken: string | null
  publicData: string | null
  privateData: string | null
}


export type AggregateSession = {
  count: number
  avg: SessionAvgAggregateOutputType | null
  sum: SessionSumAggregateOutputType | null
  min: SessionMinAggregateOutputType | null
  max: SessionMaxAggregateOutputType | null
}

export type SessionAvgAggregateOutputType = {
  id: number
  userId: number | null
}

export type SessionSumAggregateOutputType = {
  id: number
  userId: number | null
}

export type SessionMinAggregateOutputType = {
  id: number
  userId: number | null
}

export type SessionMaxAggregateOutputType = {
  id: number
  userId: number | null
}


export type SessionAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionSumAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionMinAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateSessionArgs = {
  where?: SessionWhereInput
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  cursor?: SessionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
  count?: true
  avg?: SessionAvgAggregateInputType
  sum?: SessionSumAggregateInputType
  min?: SessionMinAggregateInputType
  max?: SessionMaxAggregateInputType
}

export type GetSessionAggregateType<T extends AggregateSessionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSessionAggregateScalarType<T[P]>
}

export type GetSessionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SessionAvgAggregateOutputType ? SessionAvgAggregateOutputType[P] : never
}
    
    

export type SessionSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  expiresAt?: boolean
  handle?: boolean
  user?: boolean | UserArgs
  userId?: boolean
  hashedSessionToken?: boolean
  antiCSRFToken?: boolean
  publicData?: boolean
  privateData?: boolean
}

export type SessionInclude = {
  user?: boolean | UserArgs
}

export type SessionGetPayload<
  S extends boolean | null | undefined | SessionArgs,
  U = keyof S
> = S extends true
  ? Session
  : S extends undefined
  ? never
  : S extends SessionArgs | FindManySessionArgs
  ? 'include' extends U
    ? Session  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Session ? Session[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> | null : never
    }
  : Session
: Session


export interface SessionDelegate {
  /**
   * Find zero or one Session that matches the filter.
   * @param {FindOneSessionArgs} args - Arguments to find a Session
   * @example
   * // Get one Session
   * const session = await prisma.session.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSessionArgs>(
    args: Subset<T, FindOneSessionArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session | null>, Prisma__SessionClient<SessionGetPayload<T> | null>>
  /**
   * Find the first Session that matches the filter.
   * @param {FindFirstSessionArgs} args - Arguments to find a Session
   * @example
   * // Get one Session
   * const session = await prisma.session.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSessionArgs>(
    args?: Subset<T, FindFirstSessionArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session | null>, Prisma__SessionClient<SessionGetPayload<T> | null>>
  /**
   * Find zero or more Sessions that matches the filter.
   * @param {FindManySessionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Sessions
   * const sessions = await prisma.session.findMany()
   * 
   * // Get first 10 Sessions
   * const sessions = await prisma.session.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySessionArgs>(
    args?: Subset<T, FindManySessionArgs>
  ): CheckSelect<T, Promise<Array<Session>>, Promise<Array<SessionGetPayload<T>>>>
  /**
   * Create a Session.
   * @param {SessionCreateArgs} args - Arguments to create a Session.
   * @example
   * // Create one Session
   * const Session = await prisma.session.create({
   *   data: {
   *     // ... data to create a Session
   *   }
   * })
   * 
  **/
  create<T extends SessionCreateArgs>(
    args: Subset<T, SessionCreateArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Delete a Session.
   * @param {SessionDeleteArgs} args - Arguments to delete one Session.
   * @example
   * // Delete one Session
   * const Session = await prisma.session.delete({
   *   where: {
   *     // ... filter to delete one Session
   *   }
   * })
   * 
  **/
  delete<T extends SessionDeleteArgs>(
    args: Subset<T, SessionDeleteArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Update one Session.
   * @param {SessionUpdateArgs} args - Arguments to update one Session.
   * @example
   * // Update one Session
   * const session = await prisma.session.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SessionUpdateArgs>(
    args: Subset<T, SessionUpdateArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Delete zero or more Sessions.
   * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
   * @example
   * // Delete a few Sessions
   * const { count } = await prisma.session.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SessionDeleteManyArgs>(
    args: Subset<T, SessionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Sessions.
   * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Sessions
   * const session = await prisma.session.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SessionUpdateManyArgs>(
    args: Subset<T, SessionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Session.
   * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
   * @example
   * // Update or create a Session
   * const session = await prisma.session.upsert({
   *   create: {
   *     // ... data to create a Session
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Session we want to update
   *   }
   * })
  **/
  upsert<T extends SessionUpsertArgs>(
    args: Subset<T, SessionUpsertArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySessionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSessionArgs>(args: Subset<T, AggregateSessionArgs>): Promise<GetSessionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Session.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SessionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Session findOne
 */
export type FindOneSessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Session to fetch.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session findFirst
 */
export type FindFirstSessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Session to fetch.
  **/
  where?: SessionWhereInput
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  cursor?: SessionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
}


/**
 * Session findMany
 */
export type FindManySessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Sessions to fetch.
  **/
  where?: SessionWhereInput
  /**
   * Determine the order of the Sessions to fetch.
  **/
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  /**
   * Sets the position for listing Sessions.
  **/
  cursor?: SessionWhereUniqueInput
  /**
   * The number of Sessions to fetch. If negative number, it will take Sessions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Sessions.
  **/
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
}


/**
 * Session create
 */
export type SessionCreateArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The data needed to create a Session.
  **/
  data: SessionCreateInput
}


/**
 * Session update
 */
export type SessionUpdateArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The data needed to update a Session.
  **/
  data: SessionUpdateInput
  /**
   * Choose, which Session to update.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session updateMany
 */
export type SessionUpdateManyArgs = {
  data: SessionUpdateManyMutationInput
  where?: SessionWhereInput
}


/**
 * Session upsert
 */
export type SessionUpsertArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The filter to search for the Session to update in case it exists.
  **/
  where: SessionWhereUniqueInput
  /**
   * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
  **/
  create: SessionCreateInput
  /**
   * In case the Session was found with the provided `where` argument, update it with this data.
  **/
  update: SessionUpdateInput
}


/**
 * Session delete
 */
export type SessionDeleteArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter which Session to delete.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session deleteMany
 */
export type SessionDeleteManyArgs = {
  where?: SessionWhereInput
}


/**
 * Session without action
 */
export type SessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
}



/**
 * Model Category
 */

export type Category = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
}


export type AggregateCategory = {
  count: number
  avg: CategoryAvgAggregateOutputType | null
  sum: CategorySumAggregateOutputType | null
  min: CategoryMinAggregateOutputType | null
  max: CategoryMaxAggregateOutputType | null
}

export type CategoryAvgAggregateOutputType = {
  id: number
}

export type CategorySumAggregateOutputType = {
  id: number
}

export type CategoryMinAggregateOutputType = {
  id: number
}

export type CategoryMaxAggregateOutputType = {
  id: number
}


export type CategoryAvgAggregateInputType = {
  id?: true
}

export type CategorySumAggregateInputType = {
  id?: true
}

export type CategoryMinAggregateInputType = {
  id?: true
}

export type CategoryMaxAggregateInputType = {
  id?: true
}

export type AggregateCategoryArgs = {
  where?: CategoryWhereInput
  orderBy?: Enumerable<CategoryOrderByInput> | CategoryOrderByInput
  cursor?: CategoryWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CategoryDistinctFieldEnum>
  count?: true
  avg?: CategoryAvgAggregateInputType
  sum?: CategorySumAggregateInputType
  min?: CategoryMinAggregateInputType
  max?: CategoryMaxAggregateInputType
}

export type GetCategoryAggregateType<T extends AggregateCategoryArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCategoryAggregateScalarType<T[P]>
}

export type GetCategoryAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CategoryAvgAggregateOutputType ? CategoryAvgAggregateOutputType[P] : never
}
    
    

export type CategorySelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  name?: boolean
  product?: boolean | FindManyProductArgs
}

export type CategoryInclude = {
  product?: boolean | FindManyProductArgs
}

export type CategoryGetPayload<
  S extends boolean | null | undefined | CategoryArgs,
  U = keyof S
> = S extends true
  ? Category
  : S extends undefined
  ? never
  : S extends CategoryArgs | FindManyCategoryArgs
  ? 'include' extends U
    ? Category  & {
      [P in TrueKeys<S['include']>]:
      P extends 'product'
      ? Array<ProductGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Category ? Category[P]
: 
      P extends 'product'
      ? Array<ProductGetPayload<S['select'][P]>> : never
    }
  : Category
: Category


export interface CategoryDelegate {
  /**
   * Find zero or one Category that matches the filter.
   * @param {FindOneCategoryArgs} args - Arguments to find a Category
   * @example
   * // Get one Category
   * const category = await prisma.category.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCategoryArgs>(
    args: Subset<T, FindOneCategoryArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>
  /**
   * Find the first Category that matches the filter.
   * @param {FindFirstCategoryArgs} args - Arguments to find a Category
   * @example
   * // Get one Category
   * const category = await prisma.category.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCategoryArgs>(
    args?: Subset<T, FindFirstCategoryArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>
  /**
   * Find zero or more Categories that matches the filter.
   * @param {FindManyCategoryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Categories
   * const categories = await prisma.category.findMany()
   * 
   * // Get first 10 Categories
   * const categories = await prisma.category.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCategoryArgs>(
    args?: Subset<T, FindManyCategoryArgs>
  ): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>
  /**
   * Create a Category.
   * @param {CategoryCreateArgs} args - Arguments to create a Category.
   * @example
   * // Create one Category
   * const Category = await prisma.category.create({
   *   data: {
   *     // ... data to create a Category
   *   }
   * })
   * 
  **/
  create<T extends CategoryCreateArgs>(
    args: Subset<T, CategoryCreateArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete a Category.
   * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
   * @example
   * // Delete one Category
   * const Category = await prisma.category.delete({
   *   where: {
   *     // ... filter to delete one Category
   *   }
   * })
   * 
  **/
  delete<T extends CategoryDeleteArgs>(
    args: Subset<T, CategoryDeleteArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Update one Category.
   * @param {CategoryUpdateArgs} args - Arguments to update one Category.
   * @example
   * // Update one Category
   * const category = await prisma.category.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CategoryUpdateArgs>(
    args: Subset<T, CategoryUpdateArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete zero or more Categories.
   * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
   * @example
   * // Delete a few Categories
   * const { count } = await prisma.category.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CategoryDeleteManyArgs>(
    args: Subset<T, CategoryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Categories.
   * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Categories
   * const category = await prisma.category.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CategoryUpdateManyArgs>(
    args: Subset<T, CategoryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Category.
   * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
   * @example
   * // Update or create a Category
   * const category = await prisma.category.upsert({
   *   create: {
   *     // ... data to create a Category
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Category we want to update
   *   }
   * })
  **/
  upsert<T extends CategoryUpsertArgs>(
    args: Subset<T, CategoryUpsertArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCategoryArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCategoryArgs>(args: Subset<T, AggregateCategoryArgs>): Promise<GetCategoryAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Category.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CategoryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  product<T extends FindManyProductArgs = {}>(args?: Subset<T, FindManyProductArgs>): CheckSelect<T, Promise<Array<Product>>, Promise<Array<ProductGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Category findOne
 */
export type FindOneCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter, which Category to fetch.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category findFirst
 */
export type FindFirstCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter, which Category to fetch.
  **/
  where?: CategoryWhereInput
  orderBy?: Enumerable<CategoryOrderByInput> | CategoryOrderByInput
  cursor?: CategoryWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CategoryDistinctFieldEnum>
}


/**
 * Category findMany
 */
export type FindManyCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter, which Categories to fetch.
  **/
  where?: CategoryWhereInput
  /**
   * Determine the order of the Categories to fetch.
  **/
  orderBy?: Enumerable<CategoryOrderByInput> | CategoryOrderByInput
  /**
   * Sets the position for listing Categories.
  **/
  cursor?: CategoryWhereUniqueInput
  /**
   * The number of Categories to fetch. If negative number, it will take Categories before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Categories.
  **/
  skip?: number
  distinct?: Enumerable<CategoryDistinctFieldEnum>
}


/**
 * Category create
 */
export type CategoryCreateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * The data needed to create a Category.
  **/
  data: CategoryCreateInput
}


/**
 * Category update
 */
export type CategoryUpdateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * The data needed to update a Category.
  **/
  data: CategoryUpdateInput
  /**
   * Choose, which Category to update.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category updateMany
 */
export type CategoryUpdateManyArgs = {
  data: CategoryUpdateManyMutationInput
  where?: CategoryWhereInput
}


/**
 * Category upsert
 */
export type CategoryUpsertArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * The filter to search for the Category to update in case it exists.
  **/
  where: CategoryWhereUniqueInput
  /**
   * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
  **/
  create: CategoryCreateInput
  /**
   * In case the Category was found with the provided `where` argument, update it with this data.
  **/
  update: CategoryUpdateInput
}


/**
 * Category delete
 */
export type CategoryDeleteArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter which Category to delete.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category deleteMany
 */
export type CategoryDeleteManyArgs = {
  where?: CategoryWhereInput
}


/**
 * Category without action
 */
export type CategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
}



/**
 * Model Product
 */

export type Product = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  imageUrl: string
  description: string | null
  price: number
  stock: boolean
  minQuantity: number | null
  measure: Measure | null
  catId: number | null
}


export type AggregateProduct = {
  count: number
  avg: ProductAvgAggregateOutputType | null
  sum: ProductSumAggregateOutputType | null
  min: ProductMinAggregateOutputType | null
  max: ProductMaxAggregateOutputType | null
}

export type ProductAvgAggregateOutputType = {
  id: number
  price: number
  minQuantity: number | null
  catId: number | null
}

export type ProductSumAggregateOutputType = {
  id: number
  price: number
  minQuantity: number | null
  catId: number | null
}

export type ProductMinAggregateOutputType = {
  id: number
  price: number
  minQuantity: number | null
  catId: number | null
}

export type ProductMaxAggregateOutputType = {
  id: number
  price: number
  minQuantity: number | null
  catId: number | null
}


export type ProductAvgAggregateInputType = {
  id?: true
  price?: true
  minQuantity?: true
  catId?: true
}

export type ProductSumAggregateInputType = {
  id?: true
  price?: true
  minQuantity?: true
  catId?: true
}

export type ProductMinAggregateInputType = {
  id?: true
  price?: true
  minQuantity?: true
  catId?: true
}

export type ProductMaxAggregateInputType = {
  id?: true
  price?: true
  minQuantity?: true
  catId?: true
}

export type AggregateProductArgs = {
  where?: ProductWhereInput
  orderBy?: Enumerable<ProductOrderByInput> | ProductOrderByInput
  cursor?: ProductWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProductDistinctFieldEnum>
  count?: true
  avg?: ProductAvgAggregateInputType
  sum?: ProductSumAggregateInputType
  min?: ProductMinAggregateInputType
  max?: ProductMaxAggregateInputType
}

export type GetProductAggregateType<T extends AggregateProductArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetProductAggregateScalarType<T[P]>
}

export type GetProductAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ProductAvgAggregateOutputType ? ProductAvgAggregateOutputType[P] : never
}
    
    

export type ProductSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  name?: boolean
  imageUrl?: boolean
  description?: boolean
  price?: boolean
  stock?: boolean
  minQuantity?: boolean
  measure?: boolean
  category?: boolean | CategoryArgs
  catId?: boolean
  cart?: boolean | CartArgs
}

export type ProductInclude = {
  category?: boolean | CategoryArgs
  cart?: boolean | CartArgs
}

export type ProductGetPayload<
  S extends boolean | null | undefined | ProductArgs,
  U = keyof S
> = S extends true
  ? Product
  : S extends undefined
  ? never
  : S extends ProductArgs | FindManyProductArgs
  ? 'include' extends U
    ? Product  & {
      [P in TrueKeys<S['include']>]:
      P extends 'category'
      ? CategoryGetPayload<S['include'][P]> | null :
      P extends 'cart'
      ? CartGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Product ? Product[P]
: 
      P extends 'category'
      ? CategoryGetPayload<S['select'][P]> | null :
      P extends 'cart'
      ? CartGetPayload<S['select'][P]> | null : never
    }
  : Product
: Product


export interface ProductDelegate {
  /**
   * Find zero or one Product that matches the filter.
   * @param {FindOneProductArgs} args - Arguments to find a Product
   * @example
   * // Get one Product
   * const product = await prisma.product.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProductArgs>(
    args: Subset<T, FindOneProductArgs>
  ): CheckSelect<T, Prisma__ProductClient<Product | null>, Prisma__ProductClient<ProductGetPayload<T> | null>>
  /**
   * Find the first Product that matches the filter.
   * @param {FindFirstProductArgs} args - Arguments to find a Product
   * @example
   * // Get one Product
   * const product = await prisma.product.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstProductArgs>(
    args?: Subset<T, FindFirstProductArgs>
  ): CheckSelect<T, Prisma__ProductClient<Product | null>, Prisma__ProductClient<ProductGetPayload<T> | null>>
  /**
   * Find zero or more Products that matches the filter.
   * @param {FindManyProductArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Products
   * const products = await prisma.product.findMany()
   * 
   * // Get first 10 Products
   * const products = await prisma.product.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyProductArgs>(
    args?: Subset<T, FindManyProductArgs>
  ): CheckSelect<T, Promise<Array<Product>>, Promise<Array<ProductGetPayload<T>>>>
  /**
   * Create a Product.
   * @param {ProductCreateArgs} args - Arguments to create a Product.
   * @example
   * // Create one Product
   * const Product = await prisma.product.create({
   *   data: {
   *     // ... data to create a Product
   *   }
   * })
   * 
  **/
  create<T extends ProductCreateArgs>(
    args: Subset<T, ProductCreateArgs>
  ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>
  /**
   * Delete a Product.
   * @param {ProductDeleteArgs} args - Arguments to delete one Product.
   * @example
   * // Delete one Product
   * const Product = await prisma.product.delete({
   *   where: {
   *     // ... filter to delete one Product
   *   }
   * })
   * 
  **/
  delete<T extends ProductDeleteArgs>(
    args: Subset<T, ProductDeleteArgs>
  ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>
  /**
   * Update one Product.
   * @param {ProductUpdateArgs} args - Arguments to update one Product.
   * @example
   * // Update one Product
   * const product = await prisma.product.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProductUpdateArgs>(
    args: Subset<T, ProductUpdateArgs>
  ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>
  /**
   * Delete zero or more Products.
   * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
   * @example
   * // Delete a few Products
   * const { count } = await prisma.product.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProductDeleteManyArgs>(
    args: Subset<T, ProductDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Products.
   * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Products
   * const product = await prisma.product.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProductUpdateManyArgs>(
    args: Subset<T, ProductUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Product.
   * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
   * @example
   * // Update or create a Product
   * const product = await prisma.product.upsert({
   *   create: {
   *     // ... data to create a Product
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Product we want to update
   *   }
   * })
  **/
  upsert<T extends ProductUpsertArgs>(
    args: Subset<T, ProductUpsertArgs>
  ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyProductArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateProductArgs>(args: Subset<T, AggregateProductArgs>): Promise<GetProductAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Product.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProductClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  category<T extends CategoryArgs = {}>(args?: Subset<T, CategoryArgs>): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>;

  cart<T extends CartArgs = {}>(args?: Subset<T, CartArgs>): CheckSelect<T, Prisma__CartClient<Cart | null>, Prisma__CartClient<CartGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Product findOne
 */
export type FindOneProductArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * Filter, which Product to fetch.
  **/
  where: ProductWhereUniqueInput
}


/**
 * Product findFirst
 */
export type FindFirstProductArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * Filter, which Product to fetch.
  **/
  where?: ProductWhereInput
  orderBy?: Enumerable<ProductOrderByInput> | ProductOrderByInput
  cursor?: ProductWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProductDistinctFieldEnum>
}


/**
 * Product findMany
 */
export type FindManyProductArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * Filter, which Products to fetch.
  **/
  where?: ProductWhereInput
  /**
   * Determine the order of the Products to fetch.
  **/
  orderBy?: Enumerable<ProductOrderByInput> | ProductOrderByInput
  /**
   * Sets the position for listing Products.
  **/
  cursor?: ProductWhereUniqueInput
  /**
   * The number of Products to fetch. If negative number, it will take Products before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Products.
  **/
  skip?: number
  distinct?: Enumerable<ProductDistinctFieldEnum>
}


/**
 * Product create
 */
export type ProductCreateArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * The data needed to create a Product.
  **/
  data: ProductCreateInput
}


/**
 * Product update
 */
export type ProductUpdateArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * The data needed to update a Product.
  **/
  data: ProductUpdateInput
  /**
   * Choose, which Product to update.
  **/
  where: ProductWhereUniqueInput
}


/**
 * Product updateMany
 */
export type ProductUpdateManyArgs = {
  data: ProductUpdateManyMutationInput
  where?: ProductWhereInput
}


/**
 * Product upsert
 */
export type ProductUpsertArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * The filter to search for the Product to update in case it exists.
  **/
  where: ProductWhereUniqueInput
  /**
   * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
  **/
  create: ProductCreateInput
  /**
   * In case the Product was found with the provided `where` argument, update it with this data.
  **/
  update: ProductUpdateInput
}


/**
 * Product delete
 */
export type ProductDeleteArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
  /**
   * Filter which Product to delete.
  **/
  where: ProductWhereUniqueInput
}


/**
 * Product deleteMany
 */
export type ProductDeleteManyArgs = {
  where?: ProductWhereInput
}


/**
 * Product without action
 */
export type ProductArgs = {
  /**
   * Select specific fields to fetch from the Product
  **/
  select?: ProductSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProductInclude | null
}



/**
 * Model Cart
 */

export type Cart = {
  id: number
  createdAt: Date
  updatedAt: Date
  quantity: number | null
  productId: number
  productPrice: number
  userId: number
}


export type AggregateCart = {
  count: number
  avg: CartAvgAggregateOutputType | null
  sum: CartSumAggregateOutputType | null
  min: CartMinAggregateOutputType | null
  max: CartMaxAggregateOutputType | null
}

export type CartAvgAggregateOutputType = {
  id: number
  quantity: number | null
  productId: number
  productPrice: number
  userId: number
}

export type CartSumAggregateOutputType = {
  id: number
  quantity: number | null
  productId: number
  productPrice: number
  userId: number
}

export type CartMinAggregateOutputType = {
  id: number
  quantity: number | null
  productId: number
  productPrice: number
  userId: number
}

export type CartMaxAggregateOutputType = {
  id: number
  quantity: number | null
  productId: number
  productPrice: number
  userId: number
}


export type CartAvgAggregateInputType = {
  id?: true
  quantity?: true
  productId?: true
  productPrice?: true
  userId?: true
}

export type CartSumAggregateInputType = {
  id?: true
  quantity?: true
  productId?: true
  productPrice?: true
  userId?: true
}

export type CartMinAggregateInputType = {
  id?: true
  quantity?: true
  productId?: true
  productPrice?: true
  userId?: true
}

export type CartMaxAggregateInputType = {
  id?: true
  quantity?: true
  productId?: true
  productPrice?: true
  userId?: true
}

export type AggregateCartArgs = {
  where?: CartWhereInput
  orderBy?: Enumerable<CartOrderByInput> | CartOrderByInput
  cursor?: CartWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CartDistinctFieldEnum>
  count?: true
  avg?: CartAvgAggregateInputType
  sum?: CartSumAggregateInputType
  min?: CartMinAggregateInputType
  max?: CartMaxAggregateInputType
}

export type GetCartAggregateType<T extends AggregateCartArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCartAggregateScalarType<T[P]>
}

export type GetCartAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CartAvgAggregateOutputType ? CartAvgAggregateOutputType[P] : never
}
    
    

export type CartSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  quantity?: boolean
  product?: boolean | ProductArgs
  productId?: boolean
  productPrice?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type CartInclude = {
  product?: boolean | ProductArgs
  user?: boolean | UserArgs
}

export type CartGetPayload<
  S extends boolean | null | undefined | CartArgs,
  U = keyof S
> = S extends true
  ? Cart
  : S extends undefined
  ? never
  : S extends CartArgs | FindManyCartArgs
  ? 'include' extends U
    ? Cart  & {
      [P in TrueKeys<S['include']>]:
      P extends 'product'
      ? ProductGetPayload<S['include'][P]> :
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Cart ? Cart[P]
: 
      P extends 'product'
      ? ProductGetPayload<S['select'][P]> :
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Cart
: Cart


export interface CartDelegate {
  /**
   * Find zero or one Cart that matches the filter.
   * @param {FindOneCartArgs} args - Arguments to find a Cart
   * @example
   * // Get one Cart
   * const cart = await prisma.cart.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCartArgs>(
    args: Subset<T, FindOneCartArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart | null>, Prisma__CartClient<CartGetPayload<T> | null>>
  /**
   * Find the first Cart that matches the filter.
   * @param {FindFirstCartArgs} args - Arguments to find a Cart
   * @example
   * // Get one Cart
   * const cart = await prisma.cart.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCartArgs>(
    args?: Subset<T, FindFirstCartArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart | null>, Prisma__CartClient<CartGetPayload<T> | null>>
  /**
   * Find zero or more Carts that matches the filter.
   * @param {FindManyCartArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Carts
   * const carts = await prisma.cart.findMany()
   * 
   * // Get first 10 Carts
   * const carts = await prisma.cart.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCartArgs>(
    args?: Subset<T, FindManyCartArgs>
  ): CheckSelect<T, Promise<Array<Cart>>, Promise<Array<CartGetPayload<T>>>>
  /**
   * Create a Cart.
   * @param {CartCreateArgs} args - Arguments to create a Cart.
   * @example
   * // Create one Cart
   * const Cart = await prisma.cart.create({
   *   data: {
   *     // ... data to create a Cart
   *   }
   * })
   * 
  **/
  create<T extends CartCreateArgs>(
    args: Subset<T, CartCreateArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Delete a Cart.
   * @param {CartDeleteArgs} args - Arguments to delete one Cart.
   * @example
   * // Delete one Cart
   * const Cart = await prisma.cart.delete({
   *   where: {
   *     // ... filter to delete one Cart
   *   }
   * })
   * 
  **/
  delete<T extends CartDeleteArgs>(
    args: Subset<T, CartDeleteArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Update one Cart.
   * @param {CartUpdateArgs} args - Arguments to update one Cart.
   * @example
   * // Update one Cart
   * const cart = await prisma.cart.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CartUpdateArgs>(
    args: Subset<T, CartUpdateArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Delete zero or more Carts.
   * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
   * @example
   * // Delete a few Carts
   * const { count } = await prisma.cart.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CartDeleteManyArgs>(
    args: Subset<T, CartDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Carts.
   * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Carts
   * const cart = await prisma.cart.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CartUpdateManyArgs>(
    args: Subset<T, CartUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Cart.
   * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
   * @example
   * // Update or create a Cart
   * const cart = await prisma.cart.upsert({
   *   create: {
   *     // ... data to create a Cart
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Cart we want to update
   *   }
   * })
  **/
  upsert<T extends CartUpsertArgs>(
    args: Subset<T, CartUpsertArgs>
  ): CheckSelect<T, Prisma__CartClient<Cart>, Prisma__CartClient<CartGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCartArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCartArgs>(args: Subset<T, AggregateCartArgs>): Promise<GetCartAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Cart.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CartClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  product<T extends ProductArgs = {}>(args?: Subset<T, ProductArgs>): CheckSelect<T, Prisma__ProductClient<Product | null>, Prisma__ProductClient<ProductGetPayload<T> | null>>;

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Cart findOne
 */
export type FindOneCartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * Filter, which Cart to fetch.
  **/
  where: CartWhereUniqueInput
}


/**
 * Cart findFirst
 */
export type FindFirstCartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * Filter, which Cart to fetch.
  **/
  where?: CartWhereInput
  orderBy?: Enumerable<CartOrderByInput> | CartOrderByInput
  cursor?: CartWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CartDistinctFieldEnum>
}


/**
 * Cart findMany
 */
export type FindManyCartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * Filter, which Carts to fetch.
  **/
  where?: CartWhereInput
  /**
   * Determine the order of the Carts to fetch.
  **/
  orderBy?: Enumerable<CartOrderByInput> | CartOrderByInput
  /**
   * Sets the position for listing Carts.
  **/
  cursor?: CartWhereUniqueInput
  /**
   * The number of Carts to fetch. If negative number, it will take Carts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Carts.
  **/
  skip?: number
  distinct?: Enumerable<CartDistinctFieldEnum>
}


/**
 * Cart create
 */
export type CartCreateArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * The data needed to create a Cart.
  **/
  data: CartCreateInput
}


/**
 * Cart update
 */
export type CartUpdateArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * The data needed to update a Cart.
  **/
  data: CartUpdateInput
  /**
   * Choose, which Cart to update.
  **/
  where: CartWhereUniqueInput
}


/**
 * Cart updateMany
 */
export type CartUpdateManyArgs = {
  data: CartUpdateManyMutationInput
  where?: CartWhereInput
}


/**
 * Cart upsert
 */
export type CartUpsertArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * The filter to search for the Cart to update in case it exists.
  **/
  where: CartWhereUniqueInput
  /**
   * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
  **/
  create: CartCreateInput
  /**
   * In case the Cart was found with the provided `where` argument, update it with this data.
  **/
  update: CartUpdateInput
}


/**
 * Cart delete
 */
export type CartDeleteArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
  /**
   * Filter which Cart to delete.
  **/
  where: CartWhereUniqueInput
}


/**
 * Cart deleteMany
 */
export type CartDeleteManyArgs = {
  where?: CartWhereInput
}


/**
 * Cart without action
 */
export type CartArgs = {
  /**
   * Select specific fields to fetch from the Cart
  **/
  select?: CartSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CartInclude | null
}



/**
 * Model Order
 */

export type Order = {
  id: number
  createdAt: Date
  updatedAt: Date
  phone: string | null
  address: string | null
  pinCode: string | null
  userId: number
  totalPrice: number | null
  payMode: string | null
  payStatus: PayStatus
  orderStatus: Status
}


export type AggregateOrder = {
  count: number
  avg: OrderAvgAggregateOutputType | null
  sum: OrderSumAggregateOutputType | null
  min: OrderMinAggregateOutputType | null
  max: OrderMaxAggregateOutputType | null
}

export type OrderAvgAggregateOutputType = {
  id: number
  userId: number
  totalPrice: number | null
}

export type OrderSumAggregateOutputType = {
  id: number
  userId: number
  totalPrice: number | null
}

export type OrderMinAggregateOutputType = {
  id: number
  userId: number
  totalPrice: number | null
}

export type OrderMaxAggregateOutputType = {
  id: number
  userId: number
  totalPrice: number | null
}


export type OrderAvgAggregateInputType = {
  id?: true
  userId?: true
  totalPrice?: true
}

export type OrderSumAggregateInputType = {
  id?: true
  userId?: true
  totalPrice?: true
}

export type OrderMinAggregateInputType = {
  id?: true
  userId?: true
  totalPrice?: true
}

export type OrderMaxAggregateInputType = {
  id?: true
  userId?: true
  totalPrice?: true
}

export type AggregateOrderArgs = {
  where?: OrderWhereInput
  orderBy?: Enumerable<OrderOrderByInput> | OrderOrderByInput
  cursor?: OrderWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OrderDistinctFieldEnum>
  count?: true
  avg?: OrderAvgAggregateInputType
  sum?: OrderSumAggregateInputType
  min?: OrderMinAggregateInputType
  max?: OrderMaxAggregateInputType
}

export type GetOrderAggregateType<T extends AggregateOrderArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOrderAggregateScalarType<T[P]>
}

export type GetOrderAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OrderAvgAggregateOutputType ? OrderAvgAggregateOutputType[P] : never
}
    
    

export type OrderSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  phone?: boolean
  address?: boolean
  pinCode?: boolean
  user?: boolean | UserArgs
  userId?: boolean
  orderDetails?: boolean | FindManyOrderDetailArgs
  totalPrice?: boolean
  payMode?: boolean
  payStatus?: boolean
  orderStatus?: boolean
}

export type OrderInclude = {
  user?: boolean | UserArgs
  orderDetails?: boolean | FindManyOrderDetailArgs
}

export type OrderGetPayload<
  S extends boolean | null | undefined | OrderArgs,
  U = keyof S
> = S extends true
  ? Order
  : S extends undefined
  ? never
  : S extends OrderArgs | FindManyOrderArgs
  ? 'include' extends U
    ? Order  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'orderDetails'
      ? Array<OrderDetailGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Order ? Order[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'orderDetails'
      ? Array<OrderDetailGetPayload<S['select'][P]>> : never
    }
  : Order
: Order


export interface OrderDelegate {
  /**
   * Find zero or one Order that matches the filter.
   * @param {FindOneOrderArgs} args - Arguments to find a Order
   * @example
   * // Get one Order
   * const order = await prisma.order.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOrderArgs>(
    args: Subset<T, FindOneOrderArgs>
  ): CheckSelect<T, Prisma__OrderClient<Order | null>, Prisma__OrderClient<OrderGetPayload<T> | null>>
  /**
   * Find the first Order that matches the filter.
   * @param {FindFirstOrderArgs} args - Arguments to find a Order
   * @example
   * // Get one Order
   * const order = await prisma.order.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstOrderArgs>(
    args?: Subset<T, FindFirstOrderArgs>
  ): CheckSelect<T, Prisma__OrderClient<Order | null>, Prisma__OrderClient<OrderGetPayload<T> | null>>
  /**
   * Find zero or more Orders that matches the filter.
   * @param {FindManyOrderArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Orders
   * const orders = await prisma.order.findMany()
   * 
   * // Get first 10 Orders
   * const orders = await prisma.order.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOrderArgs>(
    args?: Subset<T, FindManyOrderArgs>
  ): CheckSelect<T, Promise<Array<Order>>, Promise<Array<OrderGetPayload<T>>>>
  /**
   * Create a Order.
   * @param {OrderCreateArgs} args - Arguments to create a Order.
   * @example
   * // Create one Order
   * const Order = await prisma.order.create({
   *   data: {
   *     // ... data to create a Order
   *   }
   * })
   * 
  **/
  create<T extends OrderCreateArgs>(
    args: Subset<T, OrderCreateArgs>
  ): CheckSelect<T, Prisma__OrderClient<Order>, Prisma__OrderClient<OrderGetPayload<T>>>
  /**
   * Delete a Order.
   * @param {OrderDeleteArgs} args - Arguments to delete one Order.
   * @example
   * // Delete one Order
   * const Order = await prisma.order.delete({
   *   where: {
   *     // ... filter to delete one Order
   *   }
   * })
   * 
  **/
  delete<T extends OrderDeleteArgs>(
    args: Subset<T, OrderDeleteArgs>
  ): CheckSelect<T, Prisma__OrderClient<Order>, Prisma__OrderClient<OrderGetPayload<T>>>
  /**
   * Update one Order.
   * @param {OrderUpdateArgs} args - Arguments to update one Order.
   * @example
   * // Update one Order
   * const order = await prisma.order.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OrderUpdateArgs>(
    args: Subset<T, OrderUpdateArgs>
  ): CheckSelect<T, Prisma__OrderClient<Order>, Prisma__OrderClient<OrderGetPayload<T>>>
  /**
   * Delete zero or more Orders.
   * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
   * @example
   * // Delete a few Orders
   * const { count } = await prisma.order.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OrderDeleteManyArgs>(
    args: Subset<T, OrderDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Orders.
   * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Orders
   * const order = await prisma.order.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OrderUpdateManyArgs>(
    args: Subset<T, OrderUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Order.
   * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
   * @example
   * // Update or create a Order
   * const order = await prisma.order.upsert({
   *   create: {
   *     // ... data to create a Order
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Order we want to update
   *   }
   * })
  **/
  upsert<T extends OrderUpsertArgs>(
    args: Subset<T, OrderUpsertArgs>
  ): CheckSelect<T, Prisma__OrderClient<Order>, Prisma__OrderClient<OrderGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOrderArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOrderArgs>(args: Subset<T, AggregateOrderArgs>): Promise<GetOrderAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Order.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OrderClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  orderDetails<T extends FindManyOrderDetailArgs = {}>(args?: Subset<T, FindManyOrderDetailArgs>): CheckSelect<T, Promise<Array<OrderDetail>>, Promise<Array<OrderDetailGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Order findOne
 */
export type FindOneOrderArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * Filter, which Order to fetch.
  **/
  where: OrderWhereUniqueInput
}


/**
 * Order findFirst
 */
export type FindFirstOrderArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * Filter, which Order to fetch.
  **/
  where?: OrderWhereInput
  orderBy?: Enumerable<OrderOrderByInput> | OrderOrderByInput
  cursor?: OrderWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OrderDistinctFieldEnum>
}


/**
 * Order findMany
 */
export type FindManyOrderArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * Filter, which Orders to fetch.
  **/
  where?: OrderWhereInput
  /**
   * Determine the order of the Orders to fetch.
  **/
  orderBy?: Enumerable<OrderOrderByInput> | OrderOrderByInput
  /**
   * Sets the position for listing Orders.
  **/
  cursor?: OrderWhereUniqueInput
  /**
   * The number of Orders to fetch. If negative number, it will take Orders before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Orders.
  **/
  skip?: number
  distinct?: Enumerable<OrderDistinctFieldEnum>
}


/**
 * Order create
 */
export type OrderCreateArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * The data needed to create a Order.
  **/
  data: OrderCreateInput
}


/**
 * Order update
 */
export type OrderUpdateArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * The data needed to update a Order.
  **/
  data: OrderUpdateInput
  /**
   * Choose, which Order to update.
  **/
  where: OrderWhereUniqueInput
}


/**
 * Order updateMany
 */
export type OrderUpdateManyArgs = {
  data: OrderUpdateManyMutationInput
  where?: OrderWhereInput
}


/**
 * Order upsert
 */
export type OrderUpsertArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * The filter to search for the Order to update in case it exists.
  **/
  where: OrderWhereUniqueInput
  /**
   * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
  **/
  create: OrderCreateInput
  /**
   * In case the Order was found with the provided `where` argument, update it with this data.
  **/
  update: OrderUpdateInput
}


/**
 * Order delete
 */
export type OrderDeleteArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
  /**
   * Filter which Order to delete.
  **/
  where: OrderWhereUniqueInput
}


/**
 * Order deleteMany
 */
export type OrderDeleteManyArgs = {
  where?: OrderWhereInput
}


/**
 * Order without action
 */
export type OrderArgs = {
  /**
   * Select specific fields to fetch from the Order
  **/
  select?: OrderSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderInclude | null
}



/**
 * Model OrderDetail
 */

export type OrderDetail = {
  id: number
  createdAt: Date
  updatedAt: Date
  quantity: number
  orderId: number
  goodsId: number | null
  productPrice: number
}


export type AggregateOrderDetail = {
  count: number
  avg: OrderDetailAvgAggregateOutputType | null
  sum: OrderDetailSumAggregateOutputType | null
  min: OrderDetailMinAggregateOutputType | null
  max: OrderDetailMaxAggregateOutputType | null
}

export type OrderDetailAvgAggregateOutputType = {
  id: number
  quantity: number
  orderId: number
  goodsId: number | null
  productPrice: number
}

export type OrderDetailSumAggregateOutputType = {
  id: number
  quantity: number
  orderId: number
  goodsId: number | null
  productPrice: number
}

export type OrderDetailMinAggregateOutputType = {
  id: number
  quantity: number
  orderId: number
  goodsId: number | null
  productPrice: number
}

export type OrderDetailMaxAggregateOutputType = {
  id: number
  quantity: number
  orderId: number
  goodsId: number | null
  productPrice: number
}


export type OrderDetailAvgAggregateInputType = {
  id?: true
  quantity?: true
  orderId?: true
  goodsId?: true
  productPrice?: true
}

export type OrderDetailSumAggregateInputType = {
  id?: true
  quantity?: true
  orderId?: true
  goodsId?: true
  productPrice?: true
}

export type OrderDetailMinAggregateInputType = {
  id?: true
  quantity?: true
  orderId?: true
  goodsId?: true
  productPrice?: true
}

export type OrderDetailMaxAggregateInputType = {
  id?: true
  quantity?: true
  orderId?: true
  goodsId?: true
  productPrice?: true
}

export type AggregateOrderDetailArgs = {
  where?: OrderDetailWhereInput
  orderBy?: Enumerable<OrderDetailOrderByInput> | OrderDetailOrderByInput
  cursor?: OrderDetailWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OrderDetailDistinctFieldEnum>
  count?: true
  avg?: OrderDetailAvgAggregateInputType
  sum?: OrderDetailSumAggregateInputType
  min?: OrderDetailMinAggregateInputType
  max?: OrderDetailMaxAggregateInputType
}

export type GetOrderDetailAggregateType<T extends AggregateOrderDetailArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOrderDetailAggregateScalarType<T[P]>
}

export type GetOrderDetailAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OrderDetailAvgAggregateOutputType ? OrderDetailAvgAggregateOutputType[P] : never
}
    
    

export type OrderDetailSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  quantity?: boolean
  order?: boolean | OrderArgs
  orderId?: boolean
  goodsId?: boolean
  productPrice?: boolean
}

export type OrderDetailInclude = {
  order?: boolean | OrderArgs
}

export type OrderDetailGetPayload<
  S extends boolean | null | undefined | OrderDetailArgs,
  U = keyof S
> = S extends true
  ? OrderDetail
  : S extends undefined
  ? never
  : S extends OrderDetailArgs | FindManyOrderDetailArgs
  ? 'include' extends U
    ? OrderDetail  & {
      [P in TrueKeys<S['include']>]:
      P extends 'order'
      ? OrderGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof OrderDetail ? OrderDetail[P]
: 
      P extends 'order'
      ? OrderGetPayload<S['select'][P]> : never
    }
  : OrderDetail
: OrderDetail


export interface OrderDetailDelegate {
  /**
   * Find zero or one OrderDetail that matches the filter.
   * @param {FindOneOrderDetailArgs} args - Arguments to find a OrderDetail
   * @example
   * // Get one OrderDetail
   * const orderDetail = await prisma.orderDetail.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOrderDetailArgs>(
    args: Subset<T, FindOneOrderDetailArgs>
  ): CheckSelect<T, Prisma__OrderDetailClient<OrderDetail | null>, Prisma__OrderDetailClient<OrderDetailGetPayload<T> | null>>
  /**
   * Find the first OrderDetail that matches the filter.
   * @param {FindFirstOrderDetailArgs} args - Arguments to find a OrderDetail
   * @example
   * // Get one OrderDetail
   * const orderDetail = await prisma.orderDetail.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstOrderDetailArgs>(
    args?: Subset<T, FindFirstOrderDetailArgs>
  ): CheckSelect<T, Prisma__OrderDetailClient<OrderDetail | null>, Prisma__OrderDetailClient<OrderDetailGetPayload<T> | null>>
  /**
   * Find zero or more OrderDetails that matches the filter.
   * @param {FindManyOrderDetailArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all OrderDetails
   * const orderDetails = await prisma.orderDetail.findMany()
   * 
   * // Get first 10 OrderDetails
   * const orderDetails = await prisma.orderDetail.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const orderDetailWithIdOnly = await prisma.orderDetail.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOrderDetailArgs>(
    args?: Subset<T, FindManyOrderDetailArgs>
  ): CheckSelect<T, Promise<Array<OrderDetail>>, Promise<Array<OrderDetailGetPayload<T>>>>
  /**
   * Create a OrderDetail.
   * @param {OrderDetailCreateArgs} args - Arguments to create a OrderDetail.
   * @example
   * // Create one OrderDetail
   * const OrderDetail = await prisma.orderDetail.create({
   *   data: {
   *     // ... data to create a OrderDetail
   *   }
   * })
   * 
  **/
  create<T extends OrderDetailCreateArgs>(
    args: Subset<T, OrderDetailCreateArgs>
  ): CheckSelect<T, Prisma__OrderDetailClient<OrderDetail>, Prisma__OrderDetailClient<OrderDetailGetPayload<T>>>
  /**
   * Delete a OrderDetail.
   * @param {OrderDetailDeleteArgs} args - Arguments to delete one OrderDetail.
   * @example
   * // Delete one OrderDetail
   * const OrderDetail = await prisma.orderDetail.delete({
   *   where: {
   *     // ... filter to delete one OrderDetail
   *   }
   * })
   * 
  **/
  delete<T extends OrderDetailDeleteArgs>(
    args: Subset<T, OrderDetailDeleteArgs>
  ): CheckSelect<T, Prisma__OrderDetailClient<OrderDetail>, Prisma__OrderDetailClient<OrderDetailGetPayload<T>>>
  /**
   * Update one OrderDetail.
   * @param {OrderDetailUpdateArgs} args - Arguments to update one OrderDetail.
   * @example
   * // Update one OrderDetail
   * const orderDetail = await prisma.orderDetail.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OrderDetailUpdateArgs>(
    args: Subset<T, OrderDetailUpdateArgs>
  ): CheckSelect<T, Prisma__OrderDetailClient<OrderDetail>, Prisma__OrderDetailClient<OrderDetailGetPayload<T>>>
  /**
   * Delete zero or more OrderDetails.
   * @param {OrderDetailDeleteManyArgs} args - Arguments to filter OrderDetails to delete.
   * @example
   * // Delete a few OrderDetails
   * const { count } = await prisma.orderDetail.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OrderDetailDeleteManyArgs>(
    args: Subset<T, OrderDetailDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more OrderDetails.
   * @param {OrderDetailUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many OrderDetails
   * const orderDetail = await prisma.orderDetail.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OrderDetailUpdateManyArgs>(
    args: Subset<T, OrderDetailUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one OrderDetail.
   * @param {OrderDetailUpsertArgs} args - Arguments to update or create a OrderDetail.
   * @example
   * // Update or create a OrderDetail
   * const orderDetail = await prisma.orderDetail.upsert({
   *   create: {
   *     // ... data to create a OrderDetail
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the OrderDetail we want to update
   *   }
   * })
  **/
  upsert<T extends OrderDetailUpsertArgs>(
    args: Subset<T, OrderDetailUpsertArgs>
  ): CheckSelect<T, Prisma__OrderDetailClient<OrderDetail>, Prisma__OrderDetailClient<OrderDetailGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOrderDetailArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOrderDetailArgs>(args: Subset<T, AggregateOrderDetailArgs>): Promise<GetOrderDetailAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for OrderDetail.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OrderDetailClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  order<T extends OrderArgs = {}>(args?: Subset<T, OrderArgs>): CheckSelect<T, Prisma__OrderClient<Order | null>, Prisma__OrderClient<OrderGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * OrderDetail findOne
 */
export type FindOneOrderDetailArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * Filter, which OrderDetail to fetch.
  **/
  where: OrderDetailWhereUniqueInput
}


/**
 * OrderDetail findFirst
 */
export type FindFirstOrderDetailArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * Filter, which OrderDetail to fetch.
  **/
  where?: OrderDetailWhereInput
  orderBy?: Enumerable<OrderDetailOrderByInput> | OrderDetailOrderByInput
  cursor?: OrderDetailWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OrderDetailDistinctFieldEnum>
}


/**
 * OrderDetail findMany
 */
export type FindManyOrderDetailArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * Filter, which OrderDetails to fetch.
  **/
  where?: OrderDetailWhereInput
  /**
   * Determine the order of the OrderDetails to fetch.
  **/
  orderBy?: Enumerable<OrderDetailOrderByInput> | OrderDetailOrderByInput
  /**
   * Sets the position for listing OrderDetails.
  **/
  cursor?: OrderDetailWhereUniqueInput
  /**
   * The number of OrderDetails to fetch. If negative number, it will take OrderDetails before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` OrderDetails.
  **/
  skip?: number
  distinct?: Enumerable<OrderDetailDistinctFieldEnum>
}


/**
 * OrderDetail create
 */
export type OrderDetailCreateArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * The data needed to create a OrderDetail.
  **/
  data: OrderDetailCreateInput
}


/**
 * OrderDetail update
 */
export type OrderDetailUpdateArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * The data needed to update a OrderDetail.
  **/
  data: OrderDetailUpdateInput
  /**
   * Choose, which OrderDetail to update.
  **/
  where: OrderDetailWhereUniqueInput
}


/**
 * OrderDetail updateMany
 */
export type OrderDetailUpdateManyArgs = {
  data: OrderDetailUpdateManyMutationInput
  where?: OrderDetailWhereInput
}


/**
 * OrderDetail upsert
 */
export type OrderDetailUpsertArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * The filter to search for the OrderDetail to update in case it exists.
  **/
  where: OrderDetailWhereUniqueInput
  /**
   * In case the OrderDetail found by the `where` argument doesn't exist, create a new OrderDetail with this data.
  **/
  create: OrderDetailCreateInput
  /**
   * In case the OrderDetail was found with the provided `where` argument, update it with this data.
  **/
  update: OrderDetailUpdateInput
}


/**
 * OrderDetail delete
 */
export type OrderDetailDeleteArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
  /**
   * Filter which OrderDetail to delete.
  **/
  where: OrderDetailWhereUniqueInput
}


/**
 * OrderDetail deleteMany
 */
export type OrderDetailDeleteManyArgs = {
  where?: OrderDetailWhereInput
}


/**
 * OrderDetail without action
 */
export type OrderDetailArgs = {
  /**
   * Select specific fields to fetch from the OrderDetail
  **/
  select?: OrderDetailSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OrderDetailInclude | null
}



/**
 * Model TopSellingItem
 */

export type TopSellingItem = {
  id: number
  createdAt: Date
  updatedAt: Date
  itemName: string
  minQty: number
  userId: number
}


export type AggregateTopSellingItem = {
  count: number
  avg: TopSellingItemAvgAggregateOutputType | null
  sum: TopSellingItemSumAggregateOutputType | null
  min: TopSellingItemMinAggregateOutputType | null
  max: TopSellingItemMaxAggregateOutputType | null
}

export type TopSellingItemAvgAggregateOutputType = {
  id: number
  minQty: number
  userId: number
}

export type TopSellingItemSumAggregateOutputType = {
  id: number
  minQty: number
  userId: number
}

export type TopSellingItemMinAggregateOutputType = {
  id: number
  minQty: number
  userId: number
}

export type TopSellingItemMaxAggregateOutputType = {
  id: number
  minQty: number
  userId: number
}


export type TopSellingItemAvgAggregateInputType = {
  id?: true
  minQty?: true
  userId?: true
}

export type TopSellingItemSumAggregateInputType = {
  id?: true
  minQty?: true
  userId?: true
}

export type TopSellingItemMinAggregateInputType = {
  id?: true
  minQty?: true
  userId?: true
}

export type TopSellingItemMaxAggregateInputType = {
  id?: true
  minQty?: true
  userId?: true
}

export type AggregateTopSellingItemArgs = {
  where?: TopSellingItemWhereInput
  orderBy?: Enumerable<TopSellingItemOrderByInput> | TopSellingItemOrderByInput
  cursor?: TopSellingItemWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TopSellingItemDistinctFieldEnum>
  count?: true
  avg?: TopSellingItemAvgAggregateInputType
  sum?: TopSellingItemSumAggregateInputType
  min?: TopSellingItemMinAggregateInputType
  max?: TopSellingItemMaxAggregateInputType
}

export type GetTopSellingItemAggregateType<T extends AggregateTopSellingItemArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetTopSellingItemAggregateScalarType<T[P]>
}

export type GetTopSellingItemAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TopSellingItemAvgAggregateOutputType ? TopSellingItemAvgAggregateOutputType[P] : never
}
    
    

export type TopSellingItemSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  itemName?: boolean
  minQty?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type TopSellingItemInclude = {
  user?: boolean | UserArgs
}

export type TopSellingItemGetPayload<
  S extends boolean | null | undefined | TopSellingItemArgs,
  U = keyof S
> = S extends true
  ? TopSellingItem
  : S extends undefined
  ? never
  : S extends TopSellingItemArgs | FindManyTopSellingItemArgs
  ? 'include' extends U
    ? TopSellingItem  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof TopSellingItem ? TopSellingItem[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : TopSellingItem
: TopSellingItem


export interface TopSellingItemDelegate {
  /**
   * Find zero or one TopSellingItem that matches the filter.
   * @param {FindOneTopSellingItemArgs} args - Arguments to find a TopSellingItem
   * @example
   * // Get one TopSellingItem
   * const topSellingItem = await prisma.topSellingItem.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTopSellingItemArgs>(
    args: Subset<T, FindOneTopSellingItemArgs>
  ): CheckSelect<T, Prisma__TopSellingItemClient<TopSellingItem | null>, Prisma__TopSellingItemClient<TopSellingItemGetPayload<T> | null>>
  /**
   * Find the first TopSellingItem that matches the filter.
   * @param {FindFirstTopSellingItemArgs} args - Arguments to find a TopSellingItem
   * @example
   * // Get one TopSellingItem
   * const topSellingItem = await prisma.topSellingItem.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstTopSellingItemArgs>(
    args?: Subset<T, FindFirstTopSellingItemArgs>
  ): CheckSelect<T, Prisma__TopSellingItemClient<TopSellingItem | null>, Prisma__TopSellingItemClient<TopSellingItemGetPayload<T> | null>>
  /**
   * Find zero or more TopSellingItems that matches the filter.
   * @param {FindManyTopSellingItemArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all TopSellingItems
   * const topSellingItems = await prisma.topSellingItem.findMany()
   * 
   * // Get first 10 TopSellingItems
   * const topSellingItems = await prisma.topSellingItem.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const topSellingItemWithIdOnly = await prisma.topSellingItem.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTopSellingItemArgs>(
    args?: Subset<T, FindManyTopSellingItemArgs>
  ): CheckSelect<T, Promise<Array<TopSellingItem>>, Promise<Array<TopSellingItemGetPayload<T>>>>
  /**
   * Create a TopSellingItem.
   * @param {TopSellingItemCreateArgs} args - Arguments to create a TopSellingItem.
   * @example
   * // Create one TopSellingItem
   * const TopSellingItem = await prisma.topSellingItem.create({
   *   data: {
   *     // ... data to create a TopSellingItem
   *   }
   * })
   * 
  **/
  create<T extends TopSellingItemCreateArgs>(
    args: Subset<T, TopSellingItemCreateArgs>
  ): CheckSelect<T, Prisma__TopSellingItemClient<TopSellingItem>, Prisma__TopSellingItemClient<TopSellingItemGetPayload<T>>>
  /**
   * Delete a TopSellingItem.
   * @param {TopSellingItemDeleteArgs} args - Arguments to delete one TopSellingItem.
   * @example
   * // Delete one TopSellingItem
   * const TopSellingItem = await prisma.topSellingItem.delete({
   *   where: {
   *     // ... filter to delete one TopSellingItem
   *   }
   * })
   * 
  **/
  delete<T extends TopSellingItemDeleteArgs>(
    args: Subset<T, TopSellingItemDeleteArgs>
  ): CheckSelect<T, Prisma__TopSellingItemClient<TopSellingItem>, Prisma__TopSellingItemClient<TopSellingItemGetPayload<T>>>
  /**
   * Update one TopSellingItem.
   * @param {TopSellingItemUpdateArgs} args - Arguments to update one TopSellingItem.
   * @example
   * // Update one TopSellingItem
   * const topSellingItem = await prisma.topSellingItem.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TopSellingItemUpdateArgs>(
    args: Subset<T, TopSellingItemUpdateArgs>
  ): CheckSelect<T, Prisma__TopSellingItemClient<TopSellingItem>, Prisma__TopSellingItemClient<TopSellingItemGetPayload<T>>>
  /**
   * Delete zero or more TopSellingItems.
   * @param {TopSellingItemDeleteManyArgs} args - Arguments to filter TopSellingItems to delete.
   * @example
   * // Delete a few TopSellingItems
   * const { count } = await prisma.topSellingItem.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TopSellingItemDeleteManyArgs>(
    args: Subset<T, TopSellingItemDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more TopSellingItems.
   * @param {TopSellingItemUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many TopSellingItems
   * const topSellingItem = await prisma.topSellingItem.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TopSellingItemUpdateManyArgs>(
    args: Subset<T, TopSellingItemUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one TopSellingItem.
   * @param {TopSellingItemUpsertArgs} args - Arguments to update or create a TopSellingItem.
   * @example
   * // Update or create a TopSellingItem
   * const topSellingItem = await prisma.topSellingItem.upsert({
   *   create: {
   *     // ... data to create a TopSellingItem
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the TopSellingItem we want to update
   *   }
   * })
  **/
  upsert<T extends TopSellingItemUpsertArgs>(
    args: Subset<T, TopSellingItemUpsertArgs>
  ): CheckSelect<T, Prisma__TopSellingItemClient<TopSellingItem>, Prisma__TopSellingItemClient<TopSellingItemGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTopSellingItemArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTopSellingItemArgs>(args: Subset<T, AggregateTopSellingItemArgs>): Promise<GetTopSellingItemAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for TopSellingItem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TopSellingItemClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * TopSellingItem findOne
 */
export type FindOneTopSellingItemArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * Filter, which TopSellingItem to fetch.
  **/
  where: TopSellingItemWhereUniqueInput
}


/**
 * TopSellingItem findFirst
 */
export type FindFirstTopSellingItemArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * Filter, which TopSellingItem to fetch.
  **/
  where?: TopSellingItemWhereInput
  orderBy?: Enumerable<TopSellingItemOrderByInput> | TopSellingItemOrderByInput
  cursor?: TopSellingItemWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TopSellingItemDistinctFieldEnum>
}


/**
 * TopSellingItem findMany
 */
export type FindManyTopSellingItemArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * Filter, which TopSellingItems to fetch.
  **/
  where?: TopSellingItemWhereInput
  /**
   * Determine the order of the TopSellingItems to fetch.
  **/
  orderBy?: Enumerable<TopSellingItemOrderByInput> | TopSellingItemOrderByInput
  /**
   * Sets the position for listing TopSellingItems.
  **/
  cursor?: TopSellingItemWhereUniqueInput
  /**
   * The number of TopSellingItems to fetch. If negative number, it will take TopSellingItems before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` TopSellingItems.
  **/
  skip?: number
  distinct?: Enumerable<TopSellingItemDistinctFieldEnum>
}


/**
 * TopSellingItem create
 */
export type TopSellingItemCreateArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * The data needed to create a TopSellingItem.
  **/
  data: TopSellingItemCreateInput
}


/**
 * TopSellingItem update
 */
export type TopSellingItemUpdateArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * The data needed to update a TopSellingItem.
  **/
  data: TopSellingItemUpdateInput
  /**
   * Choose, which TopSellingItem to update.
  **/
  where: TopSellingItemWhereUniqueInput
}


/**
 * TopSellingItem updateMany
 */
export type TopSellingItemUpdateManyArgs = {
  data: TopSellingItemUpdateManyMutationInput
  where?: TopSellingItemWhereInput
}


/**
 * TopSellingItem upsert
 */
export type TopSellingItemUpsertArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * The filter to search for the TopSellingItem to update in case it exists.
  **/
  where: TopSellingItemWhereUniqueInput
  /**
   * In case the TopSellingItem found by the `where` argument doesn't exist, create a new TopSellingItem with this data.
  **/
  create: TopSellingItemCreateInput
  /**
   * In case the TopSellingItem was found with the provided `where` argument, update it with this data.
  **/
  update: TopSellingItemUpdateInput
}


/**
 * TopSellingItem delete
 */
export type TopSellingItemDeleteArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
  /**
   * Filter which TopSellingItem to delete.
  **/
  where: TopSellingItemWhereUniqueInput
}


/**
 * TopSellingItem deleteMany
 */
export type TopSellingItemDeleteManyArgs = {
  where?: TopSellingItemWhereInput
}


/**
 * TopSellingItem without action
 */
export type TopSellingItemArgs = {
  /**
   * Select specific fields to fetch from the TopSellingItem
  **/
  select?: TopSellingItemSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TopSellingItemInclude | null
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  name?: StringNullableFilter | string | null
  email?: StringFilter | string
  hashedPassword?: StringNullableFilter | string | null
  role?: EnumRoleFilter | Role
  contactNo?: StringNullableFilter | string | null
  whatsapp?: StringNullableFilter | string | null
  address?: StringNullableFilter | string | null
  shopName?: StringNullableFilter | string | null
  openingHrs?: DateTimeNullableFilter | Date | string | null
  closingHrs?: DateTimeNullableFilter | Date | string | null
  orderAcceptTime?: DateTimeNullableFilter | Date | string | null
  sessions?: SessionListRelationFilter
  cart?: CartListRelationFilter
  orders?: OrderListRelationFilter
  topItems?: TopSellingItemListRelationFilter
  verified?: BoolFilter | boolean
}

export type UserOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  name?: SortOrder
  email?: SortOrder
  hashedPassword?: SortOrder
  role?: SortOrder
  contactNo?: SortOrder
  whatsapp?: SortOrder
  address?: SortOrder
  shopName?: SortOrder
  openingHrs?: SortOrder
  closingHrs?: SortOrder
  orderAcceptTime?: SortOrder
  verified?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type SessionWhereInput = {
  AND?: SessionWhereInput | Enumerable<SessionWhereInput>
  OR?: SessionWhereInput | Enumerable<SessionWhereInput>
  NOT?: SessionWhereInput | Enumerable<SessionWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  expiresAt?: DateTimeNullableFilter | Date | string | null
  handle?: StringFilter | string
  user?: UserRelationFilter | UserWhereInput | null
  userId?: IntNullableFilter | number | null
  hashedSessionToken?: StringNullableFilter | string | null
  antiCSRFToken?: StringNullableFilter | string | null
  publicData?: StringNullableFilter | string | null
  privateData?: StringNullableFilter | string | null
}

export type SessionOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  expiresAt?: SortOrder
  handle?: SortOrder
  userId?: SortOrder
  hashedSessionToken?: SortOrder
  antiCSRFToken?: SortOrder
  publicData?: SortOrder
  privateData?: SortOrder
}

export type SessionWhereUniqueInput = {
  id?: number
  handle?: string
}

export type CategoryWhereInput = {
  AND?: CategoryWhereInput | Enumerable<CategoryWhereInput>
  OR?: CategoryWhereInput | Enumerable<CategoryWhereInput>
  NOT?: CategoryWhereInput | Enumerable<CategoryWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  name?: StringFilter | string
  product?: ProductListRelationFilter
}

export type CategoryOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  name?: SortOrder
}

export type CategoryWhereUniqueInput = {
  id?: number
}

export type ProductWhereInput = {
  AND?: ProductWhereInput | Enumerable<ProductWhereInput>
  OR?: ProductWhereInput | Enumerable<ProductWhereInput>
  NOT?: ProductWhereInput | Enumerable<ProductWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  name?: StringFilter | string
  imageUrl?: StringFilter | string
  description?: StringNullableFilter | string | null
  price?: FloatFilter | number
  stock?: BoolFilter | boolean
  minQuantity?: FloatNullableFilter | number | null
  measure?: EnumMeasureNullableFilter | Measure | null
  category?: CategoryRelationFilter | CategoryWhereInput | null
  catId?: IntNullableFilter | number | null
  cart?: CartRelationFilter | CartWhereInput | null
}

export type ProductOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  name?: SortOrder
  imageUrl?: SortOrder
  description?: SortOrder
  price?: SortOrder
  stock?: SortOrder
  minQuantity?: SortOrder
  measure?: SortOrder
  catId?: SortOrder
}

export type ProductWhereUniqueInput = {
  id?: number
}

export type CartWhereInput = {
  AND?: CartWhereInput | Enumerable<CartWhereInput>
  OR?: CartWhereInput | Enumerable<CartWhereInput>
  NOT?: CartWhereInput | Enumerable<CartWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  quantity?: FloatNullableFilter | number | null
  product?: ProductRelationFilter | ProductWhereInput
  productId?: IntFilter | number
  productPrice?: FloatFilter | number
  user?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
}

export type CartOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  quantity?: SortOrder
  productId?: SortOrder
  productPrice?: SortOrder
  userId?: SortOrder
}

export type CartWhereUniqueInput = {
  id?: number
}

export type OrderWhereInput = {
  AND?: OrderWhereInput | Enumerable<OrderWhereInput>
  OR?: OrderWhereInput | Enumerable<OrderWhereInput>
  NOT?: OrderWhereInput | Enumerable<OrderWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  phone?: StringNullableFilter | string | null
  address?: StringNullableFilter | string | null
  pinCode?: StringNullableFilter | string | null
  user?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
  orderDetails?: OrderDetailListRelationFilter
  totalPrice?: FloatNullableFilter | number | null
  payMode?: StringNullableFilter | string | null
  payStatus?: EnumPayStatusFilter | PayStatus
  orderStatus?: EnumStatusFilter | Status
}

export type OrderOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  phone?: SortOrder
  address?: SortOrder
  pinCode?: SortOrder
  userId?: SortOrder
  totalPrice?: SortOrder
  payMode?: SortOrder
  payStatus?: SortOrder
  orderStatus?: SortOrder
}

export type OrderWhereUniqueInput = {
  id?: number
}

export type OrderDetailWhereInput = {
  AND?: OrderDetailWhereInput | Enumerable<OrderDetailWhereInput>
  OR?: OrderDetailWhereInput | Enumerable<OrderDetailWhereInput>
  NOT?: OrderDetailWhereInput | Enumerable<OrderDetailWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  quantity?: FloatFilter | number
  order?: OrderRelationFilter | OrderWhereInput
  orderId?: IntFilter | number
  goodsId?: IntNullableFilter | number | null
  productPrice?: FloatFilter | number
}

export type OrderDetailOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  quantity?: SortOrder
  orderId?: SortOrder
  goodsId?: SortOrder
  productPrice?: SortOrder
}

export type OrderDetailWhereUniqueInput = {
  id?: number
}

export type TopSellingItemWhereInput = {
  AND?: TopSellingItemWhereInput | Enumerable<TopSellingItemWhereInput>
  OR?: TopSellingItemWhereInput | Enumerable<TopSellingItemWhereInput>
  NOT?: TopSellingItemWhereInput | Enumerable<TopSellingItemWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  itemName?: StringFilter | string
  minQty?: FloatFilter | number
  user?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
}

export type TopSellingItemOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  itemName?: SortOrder
  minQty?: SortOrder
  userId?: SortOrder
}

export type TopSellingItemWhereUniqueInput = {
  id?: number
}

export type UserCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: Role
  contactNo?: string | null
  whatsapp?: string | null
  address?: string | null
  shopName?: string | null
  openingHrs?: Date | string | null
  closingHrs?: Date | string | null
  orderAcceptTime?: Date | string | null
  verified?: boolean
  sessions?: SessionCreateManyWithoutUserInput
  cart?: CartCreateManyWithoutUserInput
  orders?: OrderCreateManyWithoutUserInput
  topItems?: TopSellingItemCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  contactNo?: string | NullableStringFieldUpdateOperationsInput | null
  whatsapp?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  shopName?: string | NullableStringFieldUpdateOperationsInput | null
  openingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  closingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  orderAcceptTime?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  verified?: boolean | BoolFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
  cart?: CartUpdateManyWithoutUserInput
  orders?: OrderUpdateManyWithoutUserInput
  topItems?: TopSellingItemUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  contactNo?: string | NullableStringFieldUpdateOperationsInput | null
  whatsapp?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  shopName?: string | NullableStringFieldUpdateOperationsInput | null
  openingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  closingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  orderAcceptTime?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  verified?: boolean | BoolFieldUpdateOperationsInput
}

export type SessionCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  expiresAt?: Date | string | null
  handle: string
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
  user?: UserCreateOneWithoutSessionsInput
}

export type SessionUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
  user?: UserUpdateOneWithoutSessionsInput
}

export type SessionUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
}

export type CategoryCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
  product?: ProductCreateManyWithoutCategoryInput
}

export type CategoryUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  product?: ProductUpdateManyWithoutCategoryInput
}

export type CategoryUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
}

export type ProductCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
  imageUrl: string
  description?: string | null
  price: number
  stock: boolean
  minQuantity?: number | null
  measure?: Measure | null
  category?: CategoryCreateOneWithoutProductInput
  cart?: CartCreateOneWithoutProductInput
}

export type ProductUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  price?: number | FloatFieldUpdateOperationsInput
  stock?: boolean | BoolFieldUpdateOperationsInput
  minQuantity?: number | NullableFloatFieldUpdateOperationsInput | null
  measure?: Measure | NullableEnumMeasureFieldUpdateOperationsInput | null
  category?: CategoryUpdateOneWithoutProductInput
  cart?: CartUpdateOneWithoutProductInput
}

export type ProductUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  price?: number | FloatFieldUpdateOperationsInput
  stock?: boolean | BoolFieldUpdateOperationsInput
  minQuantity?: number | NullableFloatFieldUpdateOperationsInput | null
  measure?: Measure | NullableEnumMeasureFieldUpdateOperationsInput | null
}

export type CartCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  quantity?: number | null
  productPrice: number
  product: ProductCreateOneWithoutCartInput
  user: UserCreateOneWithoutCartInput
}

export type CartUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | NullableFloatFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
  product?: ProductUpdateOneRequiredWithoutCartInput
  user?: UserUpdateOneRequiredWithoutCartInput
}

export type CartUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | NullableFloatFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
}

export type OrderCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  phone?: string | null
  address?: string | null
  pinCode?: string | null
  totalPrice?: number | null
  payMode?: string | null
  payStatus?: PayStatus
  orderStatus?: Status
  user: UserCreateOneWithoutOrdersInput
  orderDetails?: OrderDetailCreateManyWithoutOrderInput
}

export type OrderUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  pinCode?: string | NullableStringFieldUpdateOperationsInput | null
  totalPrice?: number | NullableFloatFieldUpdateOperationsInput | null
  payMode?: string | NullableStringFieldUpdateOperationsInput | null
  payStatus?: PayStatus | EnumPayStatusFieldUpdateOperationsInput
  orderStatus?: Status | EnumStatusFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutOrdersInput
  orderDetails?: OrderDetailUpdateManyWithoutOrderInput
}

export type OrderUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  pinCode?: string | NullableStringFieldUpdateOperationsInput | null
  totalPrice?: number | NullableFloatFieldUpdateOperationsInput | null
  payMode?: string | NullableStringFieldUpdateOperationsInput | null
  payStatus?: PayStatus | EnumPayStatusFieldUpdateOperationsInput
  orderStatus?: Status | EnumStatusFieldUpdateOperationsInput
}

export type OrderDetailCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  quantity: number
  goodsId?: number | null
  productPrice: number
  order: OrderCreateOneWithoutOrderDetailsInput
}

export type OrderDetailUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | FloatFieldUpdateOperationsInput
  goodsId?: number | NullableIntFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
  order?: OrderUpdateOneRequiredWithoutOrderDetailsInput
}

export type OrderDetailUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | FloatFieldUpdateOperationsInput
  goodsId?: number | NullableIntFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
}

export type TopSellingItemCreateInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  itemName: string
  minQty: number
  user: UserCreateOneWithoutTopItemsInput
}

export type TopSellingItemUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  itemName?: string | StringFieldUpdateOperationsInput
  minQty?: number | FloatFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutTopItemsInput
}

export type TopSellingItemUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  itemName?: string | StringFieldUpdateOperationsInput
  minQty?: number | FloatFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type EnumRoleFilter = {
  equals?: Role
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
  not?: Role | NestedEnumRoleFilter
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type SessionListRelationFilter = {
  every?: SessionWhereInput
  some?: SessionWhereInput
  none?: SessionWhereInput
}

export type CartListRelationFilter = {
  every?: CartWhereInput
  some?: CartWhereInput
  none?: CartWhereInput
}

export type OrderListRelationFilter = {
  every?: OrderWhereInput
  some?: OrderWhereInput
  none?: OrderWhereInput
}

export type TopSellingItemListRelationFilter = {
  every?: TopSellingItemWhereInput
  some?: TopSellingItemWhereInput
  none?: TopSellingItemWhereInput
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type ProductListRelationFilter = {
  every?: ProductWhereInput
  some?: ProductWhereInput
  none?: ProductWhereInput
}

export type FloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatFilter
}

export type FloatNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatNullableFilter | null
}

export type EnumMeasureNullableFilter = {
  equals?: Measure | null
  in?: Enumerable<Measure> | null
  notIn?: Enumerable<Measure> | null
  not?: Measure | NestedEnumMeasureNullableFilter | null
}

export type CategoryRelationFilter = {
  is?: CategoryWhereInput | null
  isNot?: CategoryWhereInput | null
}

export type CartRelationFilter = {
  is?: CartWhereInput | null
  isNot?: CartWhereInput | null
}

export type ProductRelationFilter = {
  is?: ProductWhereInput
  isNot?: ProductWhereInput
}

export type OrderDetailListRelationFilter = {
  every?: OrderDetailWhereInput
  some?: OrderDetailWhereInput
  none?: OrderDetailWhereInput
}

export type EnumPayStatusFilter = {
  equals?: PayStatus
  in?: Enumerable<PayStatus>
  notIn?: Enumerable<PayStatus>
  not?: PayStatus | NestedEnumPayStatusFilter
}

export type EnumStatusFilter = {
  equals?: Status
  in?: Enumerable<Status>
  notIn?: Enumerable<Status>
  not?: Status | NestedEnumStatusFilter
}

export type OrderRelationFilter = {
  is?: OrderWhereInput
  isNot?: OrderWhereInput
}

export type SessionCreateManyWithoutUserInput = {
  create?: SessionCreateWithoutUserInput | Enumerable<SessionCreateWithoutUserInput>
  connect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
}

export type CartCreateManyWithoutUserInput = {
  create?: CartCreateWithoutUserInput | Enumerable<CartCreateWithoutUserInput>
  connect?: CartWhereUniqueInput | Enumerable<CartWhereUniqueInput>
}

export type OrderCreateManyWithoutUserInput = {
  create?: OrderCreateWithoutUserInput | Enumerable<OrderCreateWithoutUserInput>
  connect?: OrderWhereUniqueInput | Enumerable<OrderWhereUniqueInput>
}

export type TopSellingItemCreateManyWithoutUserInput = {
  create?: TopSellingItemCreateWithoutUserInput | Enumerable<TopSellingItemCreateWithoutUserInput>
  connect?: TopSellingItemWhereUniqueInput | Enumerable<TopSellingItemWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Role
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type SessionUpdateManyWithoutUserInput = {
  create?: SessionCreateWithoutUserInput | Enumerable<SessionCreateWithoutUserInput>
  connect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  set?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  disconnect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  delete?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  update?: SessionUpdateWithWhereUniqueWithoutUserInput | Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: SessionUpdateManyWithWhereNestedInput | Enumerable<SessionUpdateManyWithWhereNestedInput>
  deleteMany?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
}

export type CartUpdateManyWithoutUserInput = {
  create?: CartCreateWithoutUserInput | Enumerable<CartCreateWithoutUserInput>
  connect?: CartWhereUniqueInput | Enumerable<CartWhereUniqueInput>
  set?: CartWhereUniqueInput | Enumerable<CartWhereUniqueInput>
  disconnect?: CartWhereUniqueInput | Enumerable<CartWhereUniqueInput>
  delete?: CartWhereUniqueInput | Enumerable<CartWhereUniqueInput>
  update?: CartUpdateWithWhereUniqueWithoutUserInput | Enumerable<CartUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: CartUpdateManyWithWhereNestedInput | Enumerable<CartUpdateManyWithWhereNestedInput>
  deleteMany?: CartScalarWhereInput | Enumerable<CartScalarWhereInput>
  upsert?: CartUpsertWithWhereUniqueWithoutUserInput | Enumerable<CartUpsertWithWhereUniqueWithoutUserInput>
}

export type OrderUpdateManyWithoutUserInput = {
  create?: OrderCreateWithoutUserInput | Enumerable<OrderCreateWithoutUserInput>
  connect?: OrderWhereUniqueInput | Enumerable<OrderWhereUniqueInput>
  set?: OrderWhereUniqueInput | Enumerable<OrderWhereUniqueInput>
  disconnect?: OrderWhereUniqueInput | Enumerable<OrderWhereUniqueInput>
  delete?: OrderWhereUniqueInput | Enumerable<OrderWhereUniqueInput>
  update?: OrderUpdateWithWhereUniqueWithoutUserInput | Enumerable<OrderUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: OrderUpdateManyWithWhereNestedInput | Enumerable<OrderUpdateManyWithWhereNestedInput>
  deleteMany?: OrderScalarWhereInput | Enumerable<OrderScalarWhereInput>
  upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | Enumerable<OrderUpsertWithWhereUniqueWithoutUserInput>
}

export type TopSellingItemUpdateManyWithoutUserInput = {
  create?: TopSellingItemCreateWithoutUserInput | Enumerable<TopSellingItemCreateWithoutUserInput>
  connect?: TopSellingItemWhereUniqueInput | Enumerable<TopSellingItemWhereUniqueInput>
  set?: TopSellingItemWhereUniqueInput | Enumerable<TopSellingItemWhereUniqueInput>
  disconnect?: TopSellingItemWhereUniqueInput | Enumerable<TopSellingItemWhereUniqueInput>
  delete?: TopSellingItemWhereUniqueInput | Enumerable<TopSellingItemWhereUniqueInput>
  update?: TopSellingItemUpdateWithWhereUniqueWithoutUserInput | Enumerable<TopSellingItemUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: TopSellingItemUpdateManyWithWhereNestedInput | Enumerable<TopSellingItemUpdateManyWithWhereNestedInput>
  deleteMany?: TopSellingItemScalarWhereInput | Enumerable<TopSellingItemScalarWhereInput>
  upsert?: TopSellingItemUpsertWithWhereUniqueWithoutUserInput | Enumerable<TopSellingItemUpsertWithWhereUniqueWithoutUserInput>
}

export type UserCreateOneWithoutSessionsInput = {
  create?: UserCreateWithoutSessionsInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneWithoutSessionsInput = {
  create?: UserCreateWithoutSessionsInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutSessionsDataInput
  upsert?: UserUpsertWithoutSessionsInput
}

export type ProductCreateManyWithoutCategoryInput = {
  create?: ProductCreateWithoutCategoryInput | Enumerable<ProductCreateWithoutCategoryInput>
  connect?: ProductWhereUniqueInput | Enumerable<ProductWhereUniqueInput>
}

export type ProductUpdateManyWithoutCategoryInput = {
  create?: ProductCreateWithoutCategoryInput | Enumerable<ProductCreateWithoutCategoryInput>
  connect?: ProductWhereUniqueInput | Enumerable<ProductWhereUniqueInput>
  set?: ProductWhereUniqueInput | Enumerable<ProductWhereUniqueInput>
  disconnect?: ProductWhereUniqueInput | Enumerable<ProductWhereUniqueInput>
  delete?: ProductWhereUniqueInput | Enumerable<ProductWhereUniqueInput>
  update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | Enumerable<ProductUpdateWithWhereUniqueWithoutCategoryInput>
  updateMany?: ProductUpdateManyWithWhereNestedInput | Enumerable<ProductUpdateManyWithWhereNestedInput>
  deleteMany?: ProductScalarWhereInput | Enumerable<ProductScalarWhereInput>
  upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | Enumerable<ProductUpsertWithWhereUniqueWithoutCategoryInput>
}

export type CategoryCreateOneWithoutProductInput = {
  create?: CategoryCreateWithoutProductInput
  connect?: CategoryWhereUniqueInput
}

export type CartCreateOneWithoutProductInput = {
  create?: CartCreateWithoutProductInput
  connect?: CartWhereUniqueInput
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
}

export type NullableFloatFieldUpdateOperationsInput = {
  set?: number | null
}

export type NullableEnumMeasureFieldUpdateOperationsInput = {
  set?: Measure | null
}

export type CategoryUpdateOneWithoutProductInput = {
  create?: CategoryCreateWithoutProductInput
  connect?: CategoryWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: CategoryUpdateWithoutProductDataInput
  upsert?: CategoryUpsertWithoutProductInput
}

export type CartUpdateOneWithoutProductInput = {
  create?: CartCreateWithoutProductInput
  connect?: CartWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: CartUpdateWithoutProductDataInput
  upsert?: CartUpsertWithoutProductInput
}

export type ProductCreateOneWithoutCartInput = {
  create?: ProductCreateWithoutCartInput
  connect?: ProductWhereUniqueInput
}

export type UserCreateOneWithoutCartInput = {
  create?: UserCreateWithoutCartInput
  connect?: UserWhereUniqueInput
}

export type ProductUpdateOneRequiredWithoutCartInput = {
  create?: ProductCreateWithoutCartInput
  connect?: ProductWhereUniqueInput
  update?: ProductUpdateWithoutCartDataInput
  upsert?: ProductUpsertWithoutCartInput
}

export type UserUpdateOneRequiredWithoutCartInput = {
  create?: UserCreateWithoutCartInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutCartDataInput
  upsert?: UserUpsertWithoutCartInput
}

export type UserCreateOneWithoutOrdersInput = {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
}

export type OrderDetailCreateManyWithoutOrderInput = {
  create?: OrderDetailCreateWithoutOrderInput | Enumerable<OrderDetailCreateWithoutOrderInput>
  connect?: OrderDetailWhereUniqueInput | Enumerable<OrderDetailWhereUniqueInput>
}

export type EnumPayStatusFieldUpdateOperationsInput = {
  set?: PayStatus
}

export type EnumStatusFieldUpdateOperationsInput = {
  set?: Status
}

export type UserUpdateOneRequiredWithoutOrdersInput = {
  create?: UserCreateWithoutOrdersInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutOrdersDataInput
  upsert?: UserUpsertWithoutOrdersInput
}

export type OrderDetailUpdateManyWithoutOrderInput = {
  create?: OrderDetailCreateWithoutOrderInput | Enumerable<OrderDetailCreateWithoutOrderInput>
  connect?: OrderDetailWhereUniqueInput | Enumerable<OrderDetailWhereUniqueInput>
  set?: OrderDetailWhereUniqueInput | Enumerable<OrderDetailWhereUniqueInput>
  disconnect?: OrderDetailWhereUniqueInput | Enumerable<OrderDetailWhereUniqueInput>
  delete?: OrderDetailWhereUniqueInput | Enumerable<OrderDetailWhereUniqueInput>
  update?: OrderDetailUpdateWithWhereUniqueWithoutOrderInput | Enumerable<OrderDetailUpdateWithWhereUniqueWithoutOrderInput>
  updateMany?: OrderDetailUpdateManyWithWhereNestedInput | Enumerable<OrderDetailUpdateManyWithWhereNestedInput>
  deleteMany?: OrderDetailScalarWhereInput | Enumerable<OrderDetailScalarWhereInput>
  upsert?: OrderDetailUpsertWithWhereUniqueWithoutOrderInput | Enumerable<OrderDetailUpsertWithWhereUniqueWithoutOrderInput>
}

export type OrderCreateOneWithoutOrderDetailsInput = {
  create?: OrderCreateWithoutOrderDetailsInput
  connect?: OrderWhereUniqueInput
}

export type NullableIntFieldUpdateOperationsInput = {
  set?: number | null
}

export type OrderUpdateOneRequiredWithoutOrderDetailsInput = {
  create?: OrderCreateWithoutOrderDetailsInput
  connect?: OrderWhereUniqueInput
  update?: OrderUpdateWithoutOrderDetailsDataInput
  upsert?: OrderUpsertWithoutOrderDetailsInput
}

export type UserCreateOneWithoutTopItemsInput = {
  create?: UserCreateWithoutTopItemsInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutTopItemsInput = {
  create?: UserCreateWithoutTopItemsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTopItemsDataInput
  upsert?: UserUpsertWithoutTopItemsInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedEnumRoleFilter = {
  equals?: Role
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
  not?: Role | NestedEnumRoleFilter
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type NestedFloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatFilter
}

export type NestedFloatNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatNullableFilter | null
}

export type NestedEnumMeasureNullableFilter = {
  equals?: Measure | null
  in?: Enumerable<Measure> | null
  notIn?: Enumerable<Measure> | null
  not?: Measure | NestedEnumMeasureNullableFilter | null
}

export type NestedEnumPayStatusFilter = {
  equals?: PayStatus
  in?: Enumerable<PayStatus>
  notIn?: Enumerable<PayStatus>
  not?: PayStatus | NestedEnumPayStatusFilter
}

export type NestedEnumStatusFilter = {
  equals?: Status
  in?: Enumerable<Status>
  notIn?: Enumerable<Status>
  not?: Status | NestedEnumStatusFilter
}

export type SessionCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  expiresAt?: Date | string | null
  handle: string
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
}

export type CartCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  quantity?: number | null
  productPrice: number
  product: ProductCreateOneWithoutCartInput
}

export type OrderCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  phone?: string | null
  address?: string | null
  pinCode?: string | null
  totalPrice?: number | null
  payMode?: string | null
  payStatus?: PayStatus
  orderStatus?: Status
  orderDetails?: OrderDetailCreateManyWithoutOrderInput
}

export type TopSellingItemCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  itemName: string
  minQty: number
}

export type SessionUpdateWithWhereUniqueWithoutUserInput = {
  where: SessionWhereUniqueInput
  data: SessionUpdateWithoutUserDataInput
}

export type SessionUpdateManyWithWhereNestedInput = {
  where: SessionScalarWhereInput
  data: SessionUpdateManyDataInput
}

export type SessionScalarWhereInput = {
  AND?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  OR?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  NOT?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  expiresAt?: DateTimeNullableFilter | Date | string | null
  handle?: StringFilter | string
  userId?: IntNullableFilter | number | null
  hashedSessionToken?: StringNullableFilter | string | null
  antiCSRFToken?: StringNullableFilter | string | null
  publicData?: StringNullableFilter | string | null
  privateData?: StringNullableFilter | string | null
}

export type SessionUpsertWithWhereUniqueWithoutUserInput = {
  where: SessionWhereUniqueInput
  update: SessionUpdateWithoutUserDataInput
  create: SessionCreateWithoutUserInput
}

export type CartUpdateWithWhereUniqueWithoutUserInput = {
  where: CartWhereUniqueInput
  data: CartUpdateWithoutUserDataInput
}

export type CartUpdateManyWithWhereNestedInput = {
  where: CartScalarWhereInput
  data: CartUpdateManyDataInput
}

export type CartScalarWhereInput = {
  AND?: CartScalarWhereInput | Enumerable<CartScalarWhereInput>
  OR?: CartScalarWhereInput | Enumerable<CartScalarWhereInput>
  NOT?: CartScalarWhereInput | Enumerable<CartScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  quantity?: FloatNullableFilter | number | null
  productId?: IntFilter | number
  productPrice?: FloatFilter | number
  userId?: IntFilter | number
}

export type CartUpsertWithWhereUniqueWithoutUserInput = {
  where: CartWhereUniqueInput
  update: CartUpdateWithoutUserDataInput
  create: CartCreateWithoutUserInput
}

export type OrderUpdateWithWhereUniqueWithoutUserInput = {
  where: OrderWhereUniqueInput
  data: OrderUpdateWithoutUserDataInput
}

export type OrderUpdateManyWithWhereNestedInput = {
  where: OrderScalarWhereInput
  data: OrderUpdateManyDataInput
}

export type OrderScalarWhereInput = {
  AND?: OrderScalarWhereInput | Enumerable<OrderScalarWhereInput>
  OR?: OrderScalarWhereInput | Enumerable<OrderScalarWhereInput>
  NOT?: OrderScalarWhereInput | Enumerable<OrderScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  phone?: StringNullableFilter | string | null
  address?: StringNullableFilter | string | null
  pinCode?: StringNullableFilter | string | null
  userId?: IntFilter | number
  totalPrice?: FloatNullableFilter | number | null
  payMode?: StringNullableFilter | string | null
  payStatus?: EnumPayStatusFilter | PayStatus
  orderStatus?: EnumStatusFilter | Status
}

export type OrderUpsertWithWhereUniqueWithoutUserInput = {
  where: OrderWhereUniqueInput
  update: OrderUpdateWithoutUserDataInput
  create: OrderCreateWithoutUserInput
}

export type TopSellingItemUpdateWithWhereUniqueWithoutUserInput = {
  where: TopSellingItemWhereUniqueInput
  data: TopSellingItemUpdateWithoutUserDataInput
}

export type TopSellingItemUpdateManyWithWhereNestedInput = {
  where: TopSellingItemScalarWhereInput
  data: TopSellingItemUpdateManyDataInput
}

export type TopSellingItemScalarWhereInput = {
  AND?: TopSellingItemScalarWhereInput | Enumerable<TopSellingItemScalarWhereInput>
  OR?: TopSellingItemScalarWhereInput | Enumerable<TopSellingItemScalarWhereInput>
  NOT?: TopSellingItemScalarWhereInput | Enumerable<TopSellingItemScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  itemName?: StringFilter | string
  minQty?: FloatFilter | number
  userId?: IntFilter | number
}

export type TopSellingItemUpsertWithWhereUniqueWithoutUserInput = {
  where: TopSellingItemWhereUniqueInput
  update: TopSellingItemUpdateWithoutUserDataInput
  create: TopSellingItemCreateWithoutUserInput
}

export type UserCreateWithoutSessionsInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: Role
  contactNo?: string | null
  whatsapp?: string | null
  address?: string | null
  shopName?: string | null
  openingHrs?: Date | string | null
  closingHrs?: Date | string | null
  orderAcceptTime?: Date | string | null
  verified?: boolean
  cart?: CartCreateManyWithoutUserInput
  orders?: OrderCreateManyWithoutUserInput
  topItems?: TopSellingItemCreateManyWithoutUserInput
}

export type UserUpdateWithoutSessionsDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  contactNo?: string | NullableStringFieldUpdateOperationsInput | null
  whatsapp?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  shopName?: string | NullableStringFieldUpdateOperationsInput | null
  openingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  closingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  orderAcceptTime?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  verified?: boolean | BoolFieldUpdateOperationsInput
  cart?: CartUpdateManyWithoutUserInput
  orders?: OrderUpdateManyWithoutUserInput
  topItems?: TopSellingItemUpdateManyWithoutUserInput
}

export type UserUpsertWithoutSessionsInput = {
  update: UserUpdateWithoutSessionsDataInput
  create: UserCreateWithoutSessionsInput
}

export type ProductCreateWithoutCategoryInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
  imageUrl: string
  description?: string | null
  price: number
  stock: boolean
  minQuantity?: number | null
  measure?: Measure | null
  cart?: CartCreateOneWithoutProductInput
}

export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutCategoryDataInput
}

export type ProductUpdateManyWithWhereNestedInput = {
  where: ProductScalarWhereInput
  data: ProductUpdateManyDataInput
}

export type ProductScalarWhereInput = {
  AND?: ProductScalarWhereInput | Enumerable<ProductScalarWhereInput>
  OR?: ProductScalarWhereInput | Enumerable<ProductScalarWhereInput>
  NOT?: ProductScalarWhereInput | Enumerable<ProductScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  name?: StringFilter | string
  imageUrl?: StringFilter | string
  description?: StringNullableFilter | string | null
  price?: FloatFilter | number
  stock?: BoolFilter | boolean
  minQuantity?: FloatNullableFilter | number | null
  measure?: EnumMeasureNullableFilter | Measure | null
  catId?: IntNullableFilter | number | null
}

export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutCategoryDataInput
  create: ProductCreateWithoutCategoryInput
}

export type CategoryCreateWithoutProductInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
}

export type CartCreateWithoutProductInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  quantity?: number | null
  productPrice: number
  user: UserCreateOneWithoutCartInput
}

export type CategoryUpdateWithoutProductDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
}

export type CategoryUpsertWithoutProductInput = {
  update: CategoryUpdateWithoutProductDataInput
  create: CategoryCreateWithoutProductInput
}

export type CartUpdateWithoutProductDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | NullableFloatFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutCartInput
}

export type CartUpsertWithoutProductInput = {
  update: CartUpdateWithoutProductDataInput
  create: CartCreateWithoutProductInput
}

export type ProductCreateWithoutCartInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
  imageUrl: string
  description?: string | null
  price: number
  stock: boolean
  minQuantity?: number | null
  measure?: Measure | null
  category?: CategoryCreateOneWithoutProductInput
}

export type UserCreateWithoutCartInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: Role
  contactNo?: string | null
  whatsapp?: string | null
  address?: string | null
  shopName?: string | null
  openingHrs?: Date | string | null
  closingHrs?: Date | string | null
  orderAcceptTime?: Date | string | null
  verified?: boolean
  sessions?: SessionCreateManyWithoutUserInput
  orders?: OrderCreateManyWithoutUserInput
  topItems?: TopSellingItemCreateManyWithoutUserInput
}

export type ProductUpdateWithoutCartDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  price?: number | FloatFieldUpdateOperationsInput
  stock?: boolean | BoolFieldUpdateOperationsInput
  minQuantity?: number | NullableFloatFieldUpdateOperationsInput | null
  measure?: Measure | NullableEnumMeasureFieldUpdateOperationsInput | null
  category?: CategoryUpdateOneWithoutProductInput
}

export type ProductUpsertWithoutCartInput = {
  update: ProductUpdateWithoutCartDataInput
  create: ProductCreateWithoutCartInput
}

export type UserUpdateWithoutCartDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  contactNo?: string | NullableStringFieldUpdateOperationsInput | null
  whatsapp?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  shopName?: string | NullableStringFieldUpdateOperationsInput | null
  openingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  closingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  orderAcceptTime?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  verified?: boolean | BoolFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
  orders?: OrderUpdateManyWithoutUserInput
  topItems?: TopSellingItemUpdateManyWithoutUserInput
}

export type UserUpsertWithoutCartInput = {
  update: UserUpdateWithoutCartDataInput
  create: UserCreateWithoutCartInput
}

export type UserCreateWithoutOrdersInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: Role
  contactNo?: string | null
  whatsapp?: string | null
  address?: string | null
  shopName?: string | null
  openingHrs?: Date | string | null
  closingHrs?: Date | string | null
  orderAcceptTime?: Date | string | null
  verified?: boolean
  sessions?: SessionCreateManyWithoutUserInput
  cart?: CartCreateManyWithoutUserInput
  topItems?: TopSellingItemCreateManyWithoutUserInput
}

export type OrderDetailCreateWithoutOrderInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  quantity: number
  goodsId?: number | null
  productPrice: number
}

export type UserUpdateWithoutOrdersDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  contactNo?: string | NullableStringFieldUpdateOperationsInput | null
  whatsapp?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  shopName?: string | NullableStringFieldUpdateOperationsInput | null
  openingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  closingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  orderAcceptTime?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  verified?: boolean | BoolFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
  cart?: CartUpdateManyWithoutUserInput
  topItems?: TopSellingItemUpdateManyWithoutUserInput
}

export type UserUpsertWithoutOrdersInput = {
  update: UserUpdateWithoutOrdersDataInput
  create: UserCreateWithoutOrdersInput
}

export type OrderDetailUpdateWithWhereUniqueWithoutOrderInput = {
  where: OrderDetailWhereUniqueInput
  data: OrderDetailUpdateWithoutOrderDataInput
}

export type OrderDetailUpdateManyWithWhereNestedInput = {
  where: OrderDetailScalarWhereInput
  data: OrderDetailUpdateManyDataInput
}

export type OrderDetailScalarWhereInput = {
  AND?: OrderDetailScalarWhereInput | Enumerable<OrderDetailScalarWhereInput>
  OR?: OrderDetailScalarWhereInput | Enumerable<OrderDetailScalarWhereInput>
  NOT?: OrderDetailScalarWhereInput | Enumerable<OrderDetailScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
  quantity?: FloatFilter | number
  orderId?: IntFilter | number
  goodsId?: IntNullableFilter | number | null
  productPrice?: FloatFilter | number
}

export type OrderDetailUpsertWithWhereUniqueWithoutOrderInput = {
  where: OrderDetailWhereUniqueInput
  update: OrderDetailUpdateWithoutOrderDataInput
  create: OrderDetailCreateWithoutOrderInput
}

export type OrderCreateWithoutOrderDetailsInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  phone?: string | null
  address?: string | null
  pinCode?: string | null
  totalPrice?: number | null
  payMode?: string | null
  payStatus?: PayStatus
  orderStatus?: Status
  user: UserCreateOneWithoutOrdersInput
}

export type OrderUpdateWithoutOrderDetailsDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  pinCode?: string | NullableStringFieldUpdateOperationsInput | null
  totalPrice?: number | NullableFloatFieldUpdateOperationsInput | null
  payMode?: string | NullableStringFieldUpdateOperationsInput | null
  payStatus?: PayStatus | EnumPayStatusFieldUpdateOperationsInput
  orderStatus?: Status | EnumStatusFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutOrdersInput
}

export type OrderUpsertWithoutOrderDetailsInput = {
  update: OrderUpdateWithoutOrderDetailsDataInput
  create: OrderCreateWithoutOrderDetailsInput
}

export type UserCreateWithoutTopItemsInput = {
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string | null
  email: string
  hashedPassword?: string | null
  role?: Role
  contactNo?: string | null
  whatsapp?: string | null
  address?: string | null
  shopName?: string | null
  openingHrs?: Date | string | null
  closingHrs?: Date | string | null
  orderAcceptTime?: Date | string | null
  verified?: boolean
  sessions?: SessionCreateManyWithoutUserInput
  cart?: CartCreateManyWithoutUserInput
  orders?: OrderCreateManyWithoutUserInput
}

export type UserUpdateWithoutTopItemsDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | StringFieldUpdateOperationsInput
  hashedPassword?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  contactNo?: string | NullableStringFieldUpdateOperationsInput | null
  whatsapp?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  shopName?: string | NullableStringFieldUpdateOperationsInput | null
  openingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  closingHrs?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  orderAcceptTime?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  verified?: boolean | BoolFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
  cart?: CartUpdateManyWithoutUserInput
  orders?: OrderUpdateManyWithoutUserInput
}

export type UserUpsertWithoutTopItemsInput = {
  update: UserUpdateWithoutTopItemsDataInput
  create: UserCreateWithoutTopItemsInput
}

export type SessionUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SessionUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  expiresAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  handle?: string | StringFieldUpdateOperationsInput
  hashedSessionToken?: string | NullableStringFieldUpdateOperationsInput | null
  antiCSRFToken?: string | NullableStringFieldUpdateOperationsInput | null
  publicData?: string | NullableStringFieldUpdateOperationsInput | null
  privateData?: string | NullableStringFieldUpdateOperationsInput | null
}

export type CartUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | NullableFloatFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
  product?: ProductUpdateOneRequiredWithoutCartInput
}

export type CartUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | NullableFloatFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
}

export type OrderUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  pinCode?: string | NullableStringFieldUpdateOperationsInput | null
  totalPrice?: number | NullableFloatFieldUpdateOperationsInput | null
  payMode?: string | NullableStringFieldUpdateOperationsInput | null
  payStatus?: PayStatus | EnumPayStatusFieldUpdateOperationsInput
  orderStatus?: Status | EnumStatusFieldUpdateOperationsInput
  orderDetails?: OrderDetailUpdateManyWithoutOrderInput
}

export type OrderUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  phone?: string | NullableStringFieldUpdateOperationsInput | null
  address?: string | NullableStringFieldUpdateOperationsInput | null
  pinCode?: string | NullableStringFieldUpdateOperationsInput | null
  totalPrice?: number | NullableFloatFieldUpdateOperationsInput | null
  payMode?: string | NullableStringFieldUpdateOperationsInput | null
  payStatus?: PayStatus | EnumPayStatusFieldUpdateOperationsInput
  orderStatus?: Status | EnumStatusFieldUpdateOperationsInput
}

export type TopSellingItemUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  itemName?: string | StringFieldUpdateOperationsInput
  minQty?: number | FloatFieldUpdateOperationsInput
}

export type TopSellingItemUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  itemName?: string | StringFieldUpdateOperationsInput
  minQty?: number | FloatFieldUpdateOperationsInput
}

export type ProductUpdateWithoutCategoryDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  price?: number | FloatFieldUpdateOperationsInput
  stock?: boolean | BoolFieldUpdateOperationsInput
  minQuantity?: number | NullableFloatFieldUpdateOperationsInput | null
  measure?: Measure | NullableEnumMeasureFieldUpdateOperationsInput | null
  cart?: CartUpdateOneWithoutProductInput
}

export type ProductUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  imageUrl?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  price?: number | FloatFieldUpdateOperationsInput
  stock?: boolean | BoolFieldUpdateOperationsInput
  minQuantity?: number | NullableFloatFieldUpdateOperationsInput | null
  measure?: Measure | NullableEnumMeasureFieldUpdateOperationsInput | null
}

export type OrderDetailUpdateWithoutOrderDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | FloatFieldUpdateOperationsInput
  goodsId?: number | NullableIntFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
}

export type OrderDetailUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  quantity?: number | FloatFieldUpdateOperationsInput
  goodsId?: number | NullableIntFieldUpdateOperationsInput | null
  productPrice?: number | FloatFieldUpdateOperationsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
