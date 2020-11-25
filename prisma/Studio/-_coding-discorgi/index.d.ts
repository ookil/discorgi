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
 * // Fetch zero or more Channels
 * const channels = await prisma.channel.findMany()
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
   * // Fetch zero or more Channels
   * const channels = await prisma.channel.findMany()
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
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): ChannelDelegate;

  /**
   * `prisma.server`: Exposes CRUD operations for the **Server** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servers
    * const servers = await prisma.server.findMany()
    * ```
    */
  get server(): ServerDelegate;

  /**
   * `prisma.usersOnServer`: Exposes CRUD operations for the **UsersOnServer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsersOnServers
    * const usersOnServers = await prisma.usersOnServer.findMany()
    * ```
    */
  get usersOnServer(): UsersOnServerDelegate;

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
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): MessageDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ChannelDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  serverId: 'serverId'
};

export declare type ChannelDistinctFieldEnum = (typeof ChannelDistinctFieldEnum)[keyof typeof ChannelDistinctFieldEnum]


export declare const ServerDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  adminId: 'adminId',
  position: 'position',
  icon: 'icon'
};

export declare type ServerDistinctFieldEnum = (typeof ServerDistinctFieldEnum)[keyof typeof ServerDistinctFieldEnum]


export declare const UsersOnServerDistinctFieldEnum: {
  serverId: 'serverId',
  userId: 'userId'
};

export declare type UsersOnServerDistinctFieldEnum = (typeof UsersOnServerDistinctFieldEnum)[keyof typeof UsersOnServerDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  password: 'password'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const MessageDistinctFieldEnum: {
  id: 'id',
  channelId: 'channelId',
  username: 'username',
  msg: 'msg',
  date: 'date'
};

export declare type MessageDistinctFieldEnum = (typeof MessageDistinctFieldEnum)[keyof typeof MessageDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Channel
 */

export type Channel = {
  id: number
  name: string
  serverId: string
}


export type AggregateChannel = {
  count: number
  avg: ChannelAvgAggregateOutputType | null
  sum: ChannelSumAggregateOutputType | null
  min: ChannelMinAggregateOutputType | null
  max: ChannelMaxAggregateOutputType | null
}

export type ChannelAvgAggregateOutputType = {
  id: number
}

export type ChannelSumAggregateOutputType = {
  id: number
}

export type ChannelMinAggregateOutputType = {
  id: number
}

export type ChannelMaxAggregateOutputType = {
  id: number
}


export type ChannelAvgAggregateInputType = {
  id?: true
}

export type ChannelSumAggregateInputType = {
  id?: true
}

export type ChannelMinAggregateInputType = {
  id?: true
}

export type ChannelMaxAggregateInputType = {
  id?: true
}

export type AggregateChannelArgs = {
  where?: ChannelWhereInput
  orderBy?: Enumerable<ChannelOrderByInput> | ChannelOrderByInput
  cursor?: ChannelWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChannelDistinctFieldEnum>
  count?: true
  avg?: ChannelAvgAggregateInputType
  sum?: ChannelSumAggregateInputType
  min?: ChannelMinAggregateInputType
  max?: ChannelMaxAggregateInputType
}

export type GetChannelAggregateType<T extends AggregateChannelArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetChannelAggregateScalarType<T[P]>
}

export type GetChannelAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ChannelAvgAggregateOutputType ? ChannelAvgAggregateOutputType[P] : never
}
    
    

export type ChannelSelect = {
  id?: boolean
  name?: boolean
  server?: boolean | ServerArgs
  serverId?: boolean
  Message?: boolean | FindManyMessageArgs
}

export type ChannelInclude = {
  server?: boolean | ServerArgs
  Message?: boolean | FindManyMessageArgs
}

export type ChannelGetPayload<
  S extends boolean | null | undefined | ChannelArgs,
  U = keyof S
> = S extends true
  ? Channel
  : S extends undefined
  ? never
  : S extends ChannelArgs | FindManyChannelArgs
  ? 'include' extends U
    ? Channel  & {
      [P in TrueKeys<S['include']>]:
      P extends 'server'
      ? ServerGetPayload<S['include'][P]> :
      P extends 'Message'
      ? Array<MessageGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Channel ? Channel[P]
: 
      P extends 'server'
      ? ServerGetPayload<S['select'][P]> :
      P extends 'Message'
      ? Array<MessageGetPayload<S['select'][P]>> : never
    }
  : Channel
: Channel


export interface ChannelDelegate {
  /**
   * Find zero or one Channel that matches the filter.
   * @param {FindOneChannelArgs} args - Arguments to find a Channel
   * @example
   * // Get one Channel
   * const channel = await prisma.channel.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneChannelArgs>(
    args: Subset<T, FindOneChannelArgs>
  ): CheckSelect<T, Prisma__ChannelClient<Channel | null>, Prisma__ChannelClient<ChannelGetPayload<T> | null>>
  /**
   * Find the first Channel that matches the filter.
   * @param {FindFirstChannelArgs} args - Arguments to find a Channel
   * @example
   * // Get one Channel
   * const channel = await prisma.channel.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstChannelArgs>(
    args?: Subset<T, FindFirstChannelArgs>
  ): CheckSelect<T, Prisma__ChannelClient<Channel | null>, Prisma__ChannelClient<ChannelGetPayload<T> | null>>
  /**
   * Find zero or more Channels that matches the filter.
   * @param {FindManyChannelArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Channels
   * const channels = await prisma.channel.findMany()
   * 
   * // Get first 10 Channels
   * const channels = await prisma.channel.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const channelWithIdOnly = await prisma.channel.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyChannelArgs>(
    args?: Subset<T, FindManyChannelArgs>
  ): CheckSelect<T, Promise<Array<Channel>>, Promise<Array<ChannelGetPayload<T>>>>
  /**
   * Create a Channel.
   * @param {ChannelCreateArgs} args - Arguments to create a Channel.
   * @example
   * // Create one Channel
   * const Channel = await prisma.channel.create({
   *   data: {
   *     // ... data to create a Channel
   *   }
   * })
   * 
  **/
  create<T extends ChannelCreateArgs>(
    args: Subset<T, ChannelCreateArgs>
  ): CheckSelect<T, Prisma__ChannelClient<Channel>, Prisma__ChannelClient<ChannelGetPayload<T>>>
  /**
   * Delete a Channel.
   * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
   * @example
   * // Delete one Channel
   * const Channel = await prisma.channel.delete({
   *   where: {
   *     // ... filter to delete one Channel
   *   }
   * })
   * 
  **/
  delete<T extends ChannelDeleteArgs>(
    args: Subset<T, ChannelDeleteArgs>
  ): CheckSelect<T, Prisma__ChannelClient<Channel>, Prisma__ChannelClient<ChannelGetPayload<T>>>
  /**
   * Update one Channel.
   * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
   * @example
   * // Update one Channel
   * const channel = await prisma.channel.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ChannelUpdateArgs>(
    args: Subset<T, ChannelUpdateArgs>
  ): CheckSelect<T, Prisma__ChannelClient<Channel>, Prisma__ChannelClient<ChannelGetPayload<T>>>
  /**
   * Delete zero or more Channels.
   * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
   * @example
   * // Delete a few Channels
   * const { count } = await prisma.channel.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ChannelDeleteManyArgs>(
    args: Subset<T, ChannelDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Channels.
   * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Channels
   * const channel = await prisma.channel.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ChannelUpdateManyArgs>(
    args: Subset<T, ChannelUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Channel.
   * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
   * @example
   * // Update or create a Channel
   * const channel = await prisma.channel.upsert({
   *   create: {
   *     // ... data to create a Channel
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Channel we want to update
   *   }
   * })
  **/
  upsert<T extends ChannelUpsertArgs>(
    args: Subset<T, ChannelUpsertArgs>
  ): CheckSelect<T, Prisma__ChannelClient<Channel>, Prisma__ChannelClient<ChannelGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyChannelArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateChannelArgs>(args: Subset<T, AggregateChannelArgs>): Promise<GetChannelAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Channel.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ChannelClient<T> implements Promise<T> {
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

  server<T extends ServerArgs = {}>(args?: Subset<T, ServerArgs>): CheckSelect<T, Prisma__ServerClient<Server | null>, Prisma__ServerClient<ServerGetPayload<T> | null>>;

  Message<T extends FindManyMessageArgs = {}>(args?: Subset<T, FindManyMessageArgs>): CheckSelect<T, Promise<Array<Message>>, Promise<Array<MessageGetPayload<T>>>>;

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
 * Channel findOne
 */
export type FindOneChannelArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * Filter, which Channel to fetch.
  **/
  where: ChannelWhereUniqueInput
}


/**
 * Channel findFirst
 */
export type FindFirstChannelArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * Filter, which Channel to fetch.
  **/
  where?: ChannelWhereInput
  orderBy?: Enumerable<ChannelOrderByInput> | ChannelOrderByInput
  cursor?: ChannelWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChannelDistinctFieldEnum>
}


/**
 * Channel findMany
 */
export type FindManyChannelArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * Filter, which Channels to fetch.
  **/
  where?: ChannelWhereInput
  /**
   * Determine the order of the Channels to fetch.
  **/
  orderBy?: Enumerable<ChannelOrderByInput> | ChannelOrderByInput
  /**
   * Sets the position for listing Channels.
  **/
  cursor?: ChannelWhereUniqueInput
  /**
   * The number of Channels to fetch. If negative number, it will take Channels before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Channels.
  **/
  skip?: number
  distinct?: Enumerable<ChannelDistinctFieldEnum>
}


/**
 * Channel create
 */
export type ChannelCreateArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * The data needed to create a Channel.
  **/
  data: ChannelCreateInput
}


/**
 * Channel update
 */
export type ChannelUpdateArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * The data needed to update a Channel.
  **/
  data: ChannelUpdateInput
  /**
   * Choose, which Channel to update.
  **/
  where: ChannelWhereUniqueInput
}


/**
 * Channel updateMany
 */
export type ChannelUpdateManyArgs = {
  data: ChannelUpdateManyMutationInput
  where?: ChannelWhereInput
}


/**
 * Channel upsert
 */
export type ChannelUpsertArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * The filter to search for the Channel to update in case it exists.
  **/
  where: ChannelWhereUniqueInput
  /**
   * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
  **/
  create: ChannelCreateInput
  /**
   * In case the Channel was found with the provided `where` argument, update it with this data.
  **/
  update: ChannelUpdateInput
}


/**
 * Channel delete
 */
export type ChannelDeleteArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
  /**
   * Filter which Channel to delete.
  **/
  where: ChannelWhereUniqueInput
}


/**
 * Channel deleteMany
 */
export type ChannelDeleteManyArgs = {
  where?: ChannelWhereInput
}


/**
 * Channel without action
 */
export type ChannelArgs = {
  /**
   * Select specific fields to fetch from the Channel
  **/
  select?: ChannelSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChannelInclude | null
}



/**
 * Model Server
 */

export type Server = {
  id: string
  name: string
  adminId: number
  position: number
  icon: string
}


export type AggregateServer = {
  count: number
  avg: ServerAvgAggregateOutputType | null
  sum: ServerSumAggregateOutputType | null
  min: ServerMinAggregateOutputType | null
  max: ServerMaxAggregateOutputType | null
}

export type ServerAvgAggregateOutputType = {
  adminId: number
  position: number
}

export type ServerSumAggregateOutputType = {
  adminId: number
  position: number
}

export type ServerMinAggregateOutputType = {
  adminId: number
  position: number
}

export type ServerMaxAggregateOutputType = {
  adminId: number
  position: number
}


export type ServerAvgAggregateInputType = {
  adminId?: true
  position?: true
}

export type ServerSumAggregateInputType = {
  adminId?: true
  position?: true
}

export type ServerMinAggregateInputType = {
  adminId?: true
  position?: true
}

export type ServerMaxAggregateInputType = {
  adminId?: true
  position?: true
}

export type AggregateServerArgs = {
  where?: ServerWhereInput
  orderBy?: Enumerable<ServerOrderByInput> | ServerOrderByInput
  cursor?: ServerWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ServerDistinctFieldEnum>
  count?: true
  avg?: ServerAvgAggregateInputType
  sum?: ServerSumAggregateInputType
  min?: ServerMinAggregateInputType
  max?: ServerMaxAggregateInputType
}

export type GetServerAggregateType<T extends AggregateServerArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetServerAggregateScalarType<T[P]>
}

export type GetServerAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ServerAvgAggregateOutputType ? ServerAvgAggregateOutputType[P] : never
}
    
    

export type ServerSelect = {
  id?: boolean
  name?: boolean
  admin?: boolean | UserArgs
  adminId?: boolean
  channels?: boolean | FindManyChannelArgs
  users?: boolean | FindManyUsersOnServerArgs
  position?: boolean
  icon?: boolean
}

export type ServerInclude = {
  admin?: boolean | UserArgs
  channels?: boolean | FindManyChannelArgs
  users?: boolean | FindManyUsersOnServerArgs
}

export type ServerGetPayload<
  S extends boolean | null | undefined | ServerArgs,
  U = keyof S
> = S extends true
  ? Server
  : S extends undefined
  ? never
  : S extends ServerArgs | FindManyServerArgs
  ? 'include' extends U
    ? Server  & {
      [P in TrueKeys<S['include']>]:
      P extends 'admin'
      ? UserGetPayload<S['include'][P]> :
      P extends 'channels'
      ? Array<ChannelGetPayload<S['include'][P]>> :
      P extends 'users'
      ? Array<UsersOnServerGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Server ? Server[P]
: 
      P extends 'admin'
      ? UserGetPayload<S['select'][P]> :
      P extends 'channels'
      ? Array<ChannelGetPayload<S['select'][P]>> :
      P extends 'users'
      ? Array<UsersOnServerGetPayload<S['select'][P]>> : never
    }
  : Server
: Server


export interface ServerDelegate {
  /**
   * Find zero or one Server that matches the filter.
   * @param {FindOneServerArgs} args - Arguments to find a Server
   * @example
   * // Get one Server
   * const server = await prisma.server.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneServerArgs>(
    args: Subset<T, FindOneServerArgs>
  ): CheckSelect<T, Prisma__ServerClient<Server | null>, Prisma__ServerClient<ServerGetPayload<T> | null>>
  /**
   * Find the first Server that matches the filter.
   * @param {FindFirstServerArgs} args - Arguments to find a Server
   * @example
   * // Get one Server
   * const server = await prisma.server.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstServerArgs>(
    args?: Subset<T, FindFirstServerArgs>
  ): CheckSelect<T, Prisma__ServerClient<Server | null>, Prisma__ServerClient<ServerGetPayload<T> | null>>
  /**
   * Find zero or more Servers that matches the filter.
   * @param {FindManyServerArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Servers
   * const servers = await prisma.server.findMany()
   * 
   * // Get first 10 Servers
   * const servers = await prisma.server.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const serverWithIdOnly = await prisma.server.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyServerArgs>(
    args?: Subset<T, FindManyServerArgs>
  ): CheckSelect<T, Promise<Array<Server>>, Promise<Array<ServerGetPayload<T>>>>
  /**
   * Create a Server.
   * @param {ServerCreateArgs} args - Arguments to create a Server.
   * @example
   * // Create one Server
   * const Server = await prisma.server.create({
   *   data: {
   *     // ... data to create a Server
   *   }
   * })
   * 
  **/
  create<T extends ServerCreateArgs>(
    args: Subset<T, ServerCreateArgs>
  ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>
  /**
   * Delete a Server.
   * @param {ServerDeleteArgs} args - Arguments to delete one Server.
   * @example
   * // Delete one Server
   * const Server = await prisma.server.delete({
   *   where: {
   *     // ... filter to delete one Server
   *   }
   * })
   * 
  **/
  delete<T extends ServerDeleteArgs>(
    args: Subset<T, ServerDeleteArgs>
  ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>
  /**
   * Update one Server.
   * @param {ServerUpdateArgs} args - Arguments to update one Server.
   * @example
   * // Update one Server
   * const server = await prisma.server.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ServerUpdateArgs>(
    args: Subset<T, ServerUpdateArgs>
  ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>
  /**
   * Delete zero or more Servers.
   * @param {ServerDeleteManyArgs} args - Arguments to filter Servers to delete.
   * @example
   * // Delete a few Servers
   * const { count } = await prisma.server.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ServerDeleteManyArgs>(
    args: Subset<T, ServerDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Servers.
   * @param {ServerUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Servers
   * const server = await prisma.server.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ServerUpdateManyArgs>(
    args: Subset<T, ServerUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Server.
   * @param {ServerUpsertArgs} args - Arguments to update or create a Server.
   * @example
   * // Update or create a Server
   * const server = await prisma.server.upsert({
   *   create: {
   *     // ... data to create a Server
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Server we want to update
   *   }
   * })
  **/
  upsert<T extends ServerUpsertArgs>(
    args: Subset<T, ServerUpsertArgs>
  ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyServerArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateServerArgs>(args: Subset<T, AggregateServerArgs>): Promise<GetServerAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Server.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ServerClient<T> implements Promise<T> {
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

  admin<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  channels<T extends FindManyChannelArgs = {}>(args?: Subset<T, FindManyChannelArgs>): CheckSelect<T, Promise<Array<Channel>>, Promise<Array<ChannelGetPayload<T>>>>;

  users<T extends FindManyUsersOnServerArgs = {}>(args?: Subset<T, FindManyUsersOnServerArgs>): CheckSelect<T, Promise<Array<UsersOnServer>>, Promise<Array<UsersOnServerGetPayload<T>>>>;

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
 * Server findOne
 */
export type FindOneServerArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * Filter, which Server to fetch.
  **/
  where: ServerWhereUniqueInput
}


/**
 * Server findFirst
 */
export type FindFirstServerArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * Filter, which Server to fetch.
  **/
  where?: ServerWhereInput
  orderBy?: Enumerable<ServerOrderByInput> | ServerOrderByInput
  cursor?: ServerWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ServerDistinctFieldEnum>
}


/**
 * Server findMany
 */
export type FindManyServerArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * Filter, which Servers to fetch.
  **/
  where?: ServerWhereInput
  /**
   * Determine the order of the Servers to fetch.
  **/
  orderBy?: Enumerable<ServerOrderByInput> | ServerOrderByInput
  /**
   * Sets the position for listing Servers.
  **/
  cursor?: ServerWhereUniqueInput
  /**
   * The number of Servers to fetch. If negative number, it will take Servers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Servers.
  **/
  skip?: number
  distinct?: Enumerable<ServerDistinctFieldEnum>
}


/**
 * Server create
 */
export type ServerCreateArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * The data needed to create a Server.
  **/
  data: ServerCreateInput
}


/**
 * Server update
 */
export type ServerUpdateArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * The data needed to update a Server.
  **/
  data: ServerUpdateInput
  /**
   * Choose, which Server to update.
  **/
  where: ServerWhereUniqueInput
}


/**
 * Server updateMany
 */
export type ServerUpdateManyArgs = {
  data: ServerUpdateManyMutationInput
  where?: ServerWhereInput
}


/**
 * Server upsert
 */
export type ServerUpsertArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * The filter to search for the Server to update in case it exists.
  **/
  where: ServerWhereUniqueInput
  /**
   * In case the Server found by the `where` argument doesn't exist, create a new Server with this data.
  **/
  create: ServerCreateInput
  /**
   * In case the Server was found with the provided `where` argument, update it with this data.
  **/
  update: ServerUpdateInput
}


/**
 * Server delete
 */
export type ServerDeleteArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
  /**
   * Filter which Server to delete.
  **/
  where: ServerWhereUniqueInput
}


/**
 * Server deleteMany
 */
export type ServerDeleteManyArgs = {
  where?: ServerWhereInput
}


/**
 * Server without action
 */
export type ServerArgs = {
  /**
   * Select specific fields to fetch from the Server
  **/
  select?: ServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServerInclude | null
}



/**
 * Model UsersOnServer
 */

export type UsersOnServer = {
  serverId: string
  userId: number
}


export type AggregateUsersOnServer = {
  count: number
  avg: UsersOnServerAvgAggregateOutputType | null
  sum: UsersOnServerSumAggregateOutputType | null
  min: UsersOnServerMinAggregateOutputType | null
  max: UsersOnServerMaxAggregateOutputType | null
}

export type UsersOnServerAvgAggregateOutputType = {
  userId: number
}

export type UsersOnServerSumAggregateOutputType = {
  userId: number
}

export type UsersOnServerMinAggregateOutputType = {
  userId: number
}

export type UsersOnServerMaxAggregateOutputType = {
  userId: number
}


export type UsersOnServerAvgAggregateInputType = {
  userId?: true
}

export type UsersOnServerSumAggregateInputType = {
  userId?: true
}

export type UsersOnServerMinAggregateInputType = {
  userId?: true
}

export type UsersOnServerMaxAggregateInputType = {
  userId?: true
}

export type AggregateUsersOnServerArgs = {
  where?: UsersOnServerWhereInput
  orderBy?: Enumerable<UsersOnServerOrderByInput> | UsersOnServerOrderByInput
  cursor?: UsersOnServerWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UsersOnServerDistinctFieldEnum>
  count?: true
  avg?: UsersOnServerAvgAggregateInputType
  sum?: UsersOnServerSumAggregateInputType
  min?: UsersOnServerMinAggregateInputType
  max?: UsersOnServerMaxAggregateInputType
}

export type GetUsersOnServerAggregateType<T extends AggregateUsersOnServerArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUsersOnServerAggregateScalarType<T[P]>
}

export type GetUsersOnServerAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UsersOnServerAvgAggregateOutputType ? UsersOnServerAvgAggregateOutputType[P] : never
}
    
    

export type UsersOnServerSelect = {
  server?: boolean | ServerArgs
  serverId?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type UsersOnServerInclude = {
  server?: boolean | ServerArgs
  user?: boolean | UserArgs
}

export type UsersOnServerGetPayload<
  S extends boolean | null | undefined | UsersOnServerArgs,
  U = keyof S
> = S extends true
  ? UsersOnServer
  : S extends undefined
  ? never
  : S extends UsersOnServerArgs | FindManyUsersOnServerArgs
  ? 'include' extends U
    ? UsersOnServer  & {
      [P in TrueKeys<S['include']>]:
      P extends 'server'
      ? ServerGetPayload<S['include'][P]> :
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof UsersOnServer ? UsersOnServer[P]
: 
      P extends 'server'
      ? ServerGetPayload<S['select'][P]> :
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : UsersOnServer
: UsersOnServer


export interface UsersOnServerDelegate {
  /**
   * Find zero or one UsersOnServer that matches the filter.
   * @param {FindOneUsersOnServerArgs} args - Arguments to find a UsersOnServer
   * @example
   * // Get one UsersOnServer
   * const usersOnServer = await prisma.usersOnServer.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUsersOnServerArgs>(
    args: Subset<T, FindOneUsersOnServerArgs>
  ): CheckSelect<T, Prisma__UsersOnServerClient<UsersOnServer | null>, Prisma__UsersOnServerClient<UsersOnServerGetPayload<T> | null>>
  /**
   * Find the first UsersOnServer that matches the filter.
   * @param {FindFirstUsersOnServerArgs} args - Arguments to find a UsersOnServer
   * @example
   * // Get one UsersOnServer
   * const usersOnServer = await prisma.usersOnServer.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUsersOnServerArgs>(
    args?: Subset<T, FindFirstUsersOnServerArgs>
  ): CheckSelect<T, Prisma__UsersOnServerClient<UsersOnServer | null>, Prisma__UsersOnServerClient<UsersOnServerGetPayload<T> | null>>
  /**
   * Find zero or more UsersOnServers that matches the filter.
   * @param {FindManyUsersOnServerArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all UsersOnServers
   * const usersOnServers = await prisma.usersOnServer.findMany()
   * 
   * // Get first 10 UsersOnServers
   * const usersOnServers = await prisma.usersOnServer.findMany({ take: 10 })
   * 
   * // Only select the `serverId`
   * const usersOnServerWithServerIdOnly = await prisma.usersOnServer.findMany({ select: { serverId: true } })
   * 
  **/
  findMany<T extends FindManyUsersOnServerArgs>(
    args?: Subset<T, FindManyUsersOnServerArgs>
  ): CheckSelect<T, Promise<Array<UsersOnServer>>, Promise<Array<UsersOnServerGetPayload<T>>>>
  /**
   * Create a UsersOnServer.
   * @param {UsersOnServerCreateArgs} args - Arguments to create a UsersOnServer.
   * @example
   * // Create one UsersOnServer
   * const UsersOnServer = await prisma.usersOnServer.create({
   *   data: {
   *     // ... data to create a UsersOnServer
   *   }
   * })
   * 
  **/
  create<T extends UsersOnServerCreateArgs>(
    args: Subset<T, UsersOnServerCreateArgs>
  ): CheckSelect<T, Prisma__UsersOnServerClient<UsersOnServer>, Prisma__UsersOnServerClient<UsersOnServerGetPayload<T>>>
  /**
   * Delete a UsersOnServer.
   * @param {UsersOnServerDeleteArgs} args - Arguments to delete one UsersOnServer.
   * @example
   * // Delete one UsersOnServer
   * const UsersOnServer = await prisma.usersOnServer.delete({
   *   where: {
   *     // ... filter to delete one UsersOnServer
   *   }
   * })
   * 
  **/
  delete<T extends UsersOnServerDeleteArgs>(
    args: Subset<T, UsersOnServerDeleteArgs>
  ): CheckSelect<T, Prisma__UsersOnServerClient<UsersOnServer>, Prisma__UsersOnServerClient<UsersOnServerGetPayload<T>>>
  /**
   * Update one UsersOnServer.
   * @param {UsersOnServerUpdateArgs} args - Arguments to update one UsersOnServer.
   * @example
   * // Update one UsersOnServer
   * const usersOnServer = await prisma.usersOnServer.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UsersOnServerUpdateArgs>(
    args: Subset<T, UsersOnServerUpdateArgs>
  ): CheckSelect<T, Prisma__UsersOnServerClient<UsersOnServer>, Prisma__UsersOnServerClient<UsersOnServerGetPayload<T>>>
  /**
   * Delete zero or more UsersOnServers.
   * @param {UsersOnServerDeleteManyArgs} args - Arguments to filter UsersOnServers to delete.
   * @example
   * // Delete a few UsersOnServers
   * const { count } = await prisma.usersOnServer.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UsersOnServerDeleteManyArgs>(
    args: Subset<T, UsersOnServerDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more UsersOnServers.
   * @param {UsersOnServerUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many UsersOnServers
   * const usersOnServer = await prisma.usersOnServer.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UsersOnServerUpdateManyArgs>(
    args: Subset<T, UsersOnServerUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one UsersOnServer.
   * @param {UsersOnServerUpsertArgs} args - Arguments to update or create a UsersOnServer.
   * @example
   * // Update or create a UsersOnServer
   * const usersOnServer = await prisma.usersOnServer.upsert({
   *   create: {
   *     // ... data to create a UsersOnServer
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the UsersOnServer we want to update
   *   }
   * })
  **/
  upsert<T extends UsersOnServerUpsertArgs>(
    args: Subset<T, UsersOnServerUpsertArgs>
  ): CheckSelect<T, Prisma__UsersOnServerClient<UsersOnServer>, Prisma__UsersOnServerClient<UsersOnServerGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUsersOnServerArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUsersOnServerArgs>(args: Subset<T, AggregateUsersOnServerArgs>): Promise<GetUsersOnServerAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for UsersOnServer.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UsersOnServerClient<T> implements Promise<T> {
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

  server<T extends ServerArgs = {}>(args?: Subset<T, ServerArgs>): CheckSelect<T, Prisma__ServerClient<Server | null>, Prisma__ServerClient<ServerGetPayload<T> | null>>;

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
 * UsersOnServer findOne
 */
export type FindOneUsersOnServerArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * Filter, which UsersOnServer to fetch.
  **/
  where: UsersOnServerWhereUniqueInput
}


/**
 * UsersOnServer findFirst
 */
export type FindFirstUsersOnServerArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * Filter, which UsersOnServer to fetch.
  **/
  where?: UsersOnServerWhereInput
  orderBy?: Enumerable<UsersOnServerOrderByInput> | UsersOnServerOrderByInput
  cursor?: UsersOnServerWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UsersOnServerDistinctFieldEnum>
}


/**
 * UsersOnServer findMany
 */
export type FindManyUsersOnServerArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * Filter, which UsersOnServers to fetch.
  **/
  where?: UsersOnServerWhereInput
  /**
   * Determine the order of the UsersOnServers to fetch.
  **/
  orderBy?: Enumerable<UsersOnServerOrderByInput> | UsersOnServerOrderByInput
  /**
   * Sets the position for listing UsersOnServers.
  **/
  cursor?: UsersOnServerWhereUniqueInput
  /**
   * The number of UsersOnServers to fetch. If negative number, it will take UsersOnServers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` UsersOnServers.
  **/
  skip?: number
  distinct?: Enumerable<UsersOnServerDistinctFieldEnum>
}


/**
 * UsersOnServer create
 */
export type UsersOnServerCreateArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * The data needed to create a UsersOnServer.
  **/
  data: UsersOnServerCreateInput
}


/**
 * UsersOnServer update
 */
export type UsersOnServerUpdateArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * The data needed to update a UsersOnServer.
  **/
  data: UsersOnServerUpdateInput
  /**
   * Choose, which UsersOnServer to update.
  **/
  where: UsersOnServerWhereUniqueInput
}


/**
 * UsersOnServer updateMany
 */
export type UsersOnServerUpdateManyArgs = {
  data: UsersOnServerUpdateManyMutationInput
  where?: UsersOnServerWhereInput
}


/**
 * UsersOnServer upsert
 */
export type UsersOnServerUpsertArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * The filter to search for the UsersOnServer to update in case it exists.
  **/
  where: UsersOnServerWhereUniqueInput
  /**
   * In case the UsersOnServer found by the `where` argument doesn't exist, create a new UsersOnServer with this data.
  **/
  create: UsersOnServerCreateInput
  /**
   * In case the UsersOnServer was found with the provided `where` argument, update it with this data.
  **/
  update: UsersOnServerUpdateInput
}


/**
 * UsersOnServer delete
 */
export type UsersOnServerDeleteArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
  /**
   * Filter which UsersOnServer to delete.
  **/
  where: UsersOnServerWhereUniqueInput
}


/**
 * UsersOnServer deleteMany
 */
export type UsersOnServerDeleteManyArgs = {
  where?: UsersOnServerWhereInput
}


/**
 * UsersOnServer without action
 */
export type UsersOnServerArgs = {
  /**
   * Select specific fields to fetch from the UsersOnServer
  **/
  select?: UsersOnServerSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UsersOnServerInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string
  password: string
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
  name?: boolean
  password?: boolean
  servers?: boolean | FindManyUsersOnServerArgs
  adminOfServers?: boolean | FindManyServerArgs
}

export type UserInclude = {
  servers?: boolean | FindManyUsersOnServerArgs
  adminOfServers?: boolean | FindManyServerArgs
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
      P extends 'servers'
      ? Array<UsersOnServerGetPayload<S['include'][P]>> :
      P extends 'adminOfServers'
      ? Array<ServerGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'servers'
      ? Array<UsersOnServerGetPayload<S['select'][P]>> :
      P extends 'adminOfServers'
      ? Array<ServerGetPayload<S['select'][P]>> : never
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

  servers<T extends FindManyUsersOnServerArgs = {}>(args?: Subset<T, FindManyUsersOnServerArgs>): CheckSelect<T, Promise<Array<UsersOnServer>>, Promise<Array<UsersOnServerGetPayload<T>>>>;

  adminOfServers<T extends FindManyServerArgs = {}>(args?: Subset<T, FindManyServerArgs>): CheckSelect<T, Promise<Array<Server>>, Promise<Array<ServerGetPayload<T>>>>;

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
 * Model Message
 */

export type Message = {
  id: number
  channelId: number
  username: string
  msg: string
  date: Date
}


export type AggregateMessage = {
  count: number
  avg: MessageAvgAggregateOutputType | null
  sum: MessageSumAggregateOutputType | null
  min: MessageMinAggregateOutputType | null
  max: MessageMaxAggregateOutputType | null
}

export type MessageAvgAggregateOutputType = {
  id: number
  channelId: number
}

export type MessageSumAggregateOutputType = {
  id: number
  channelId: number
}

export type MessageMinAggregateOutputType = {
  id: number
  channelId: number
}

export type MessageMaxAggregateOutputType = {
  id: number
  channelId: number
}


export type MessageAvgAggregateInputType = {
  id?: true
  channelId?: true
}

export type MessageSumAggregateInputType = {
  id?: true
  channelId?: true
}

export type MessageMinAggregateInputType = {
  id?: true
  channelId?: true
}

export type MessageMaxAggregateInputType = {
  id?: true
  channelId?: true
}

export type AggregateMessageArgs = {
  where?: MessageWhereInput
  orderBy?: Enumerable<MessageOrderByInput> | MessageOrderByInput
  cursor?: MessageWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MessageDistinctFieldEnum>
  count?: true
  avg?: MessageAvgAggregateInputType
  sum?: MessageSumAggregateInputType
  min?: MessageMinAggregateInputType
  max?: MessageMaxAggregateInputType
}

export type GetMessageAggregateType<T extends AggregateMessageArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMessageAggregateScalarType<T[P]>
}

export type GetMessageAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MessageAvgAggregateOutputType ? MessageAvgAggregateOutputType[P] : never
}
    
    

export type MessageSelect = {
  id?: boolean
  channel?: boolean | ChannelArgs
  channelId?: boolean
  username?: boolean
  msg?: boolean
  date?: boolean
}

export type MessageInclude = {
  channel?: boolean | ChannelArgs
}

export type MessageGetPayload<
  S extends boolean | null | undefined | MessageArgs,
  U = keyof S
> = S extends true
  ? Message
  : S extends undefined
  ? never
  : S extends MessageArgs | FindManyMessageArgs
  ? 'include' extends U
    ? Message  & {
      [P in TrueKeys<S['include']>]:
      P extends 'channel'
      ? ChannelGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Message ? Message[P]
: 
      P extends 'channel'
      ? ChannelGetPayload<S['select'][P]> : never
    }
  : Message
: Message


export interface MessageDelegate {
  /**
   * Find zero or one Message that matches the filter.
   * @param {FindOneMessageArgs} args - Arguments to find a Message
   * @example
   * // Get one Message
   * const message = await prisma.message.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneMessageArgs>(
    args: Subset<T, FindOneMessageArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message | null>, Prisma__MessageClient<MessageGetPayload<T> | null>>
  /**
   * Find the first Message that matches the filter.
   * @param {FindFirstMessageArgs} args - Arguments to find a Message
   * @example
   * // Get one Message
   * const message = await prisma.message.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstMessageArgs>(
    args?: Subset<T, FindFirstMessageArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message | null>, Prisma__MessageClient<MessageGetPayload<T> | null>>
  /**
   * Find zero or more Messages that matches the filter.
   * @param {FindManyMessageArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Messages
   * const messages = await prisma.message.findMany()
   * 
   * // Get first 10 Messages
   * const messages = await prisma.message.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyMessageArgs>(
    args?: Subset<T, FindManyMessageArgs>
  ): CheckSelect<T, Promise<Array<Message>>, Promise<Array<MessageGetPayload<T>>>>
  /**
   * Create a Message.
   * @param {MessageCreateArgs} args - Arguments to create a Message.
   * @example
   * // Create one Message
   * const Message = await prisma.message.create({
   *   data: {
   *     // ... data to create a Message
   *   }
   * })
   * 
  **/
  create<T extends MessageCreateArgs>(
    args: Subset<T, MessageCreateArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Delete a Message.
   * @param {MessageDeleteArgs} args - Arguments to delete one Message.
   * @example
   * // Delete one Message
   * const Message = await prisma.message.delete({
   *   where: {
   *     // ... filter to delete one Message
   *   }
   * })
   * 
  **/
  delete<T extends MessageDeleteArgs>(
    args: Subset<T, MessageDeleteArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Update one Message.
   * @param {MessageUpdateArgs} args - Arguments to update one Message.
   * @example
   * // Update one Message
   * const message = await prisma.message.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends MessageUpdateArgs>(
    args: Subset<T, MessageUpdateArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Delete zero or more Messages.
   * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
   * @example
   * // Delete a few Messages
   * const { count } = await prisma.message.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends MessageDeleteManyArgs>(
    args: Subset<T, MessageDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Messages.
   * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Messages
   * const message = await prisma.message.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends MessageUpdateManyArgs>(
    args: Subset<T, MessageUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Message.
   * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
   * @example
   * // Update or create a Message
   * const message = await prisma.message.upsert({
   *   create: {
   *     // ... data to create a Message
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Message we want to update
   *   }
   * })
  **/
  upsert<T extends MessageUpsertArgs>(
    args: Subset<T, MessageUpsertArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyMessageArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMessageArgs>(args: Subset<T, AggregateMessageArgs>): Promise<GetMessageAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Message.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__MessageClient<T> implements Promise<T> {
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

  channel<T extends ChannelArgs = {}>(args?: Subset<T, ChannelArgs>): CheckSelect<T, Prisma__ChannelClient<Channel | null>, Prisma__ChannelClient<ChannelGetPayload<T> | null>>;

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
 * Message findOne
 */
export type FindOneMessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter, which Message to fetch.
  **/
  where: MessageWhereUniqueInput
}


/**
 * Message findFirst
 */
export type FindFirstMessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter, which Message to fetch.
  **/
  where?: MessageWhereInput
  orderBy?: Enumerable<MessageOrderByInput> | MessageOrderByInput
  cursor?: MessageWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MessageDistinctFieldEnum>
}


/**
 * Message findMany
 */
export type FindManyMessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter, which Messages to fetch.
  **/
  where?: MessageWhereInput
  /**
   * Determine the order of the Messages to fetch.
  **/
  orderBy?: Enumerable<MessageOrderByInput> | MessageOrderByInput
  /**
   * Sets the position for listing Messages.
  **/
  cursor?: MessageWhereUniqueInput
  /**
   * The number of Messages to fetch. If negative number, it will take Messages before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Messages.
  **/
  skip?: number
  distinct?: Enumerable<MessageDistinctFieldEnum>
}


/**
 * Message create
 */
export type MessageCreateArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * The data needed to create a Message.
  **/
  data: MessageCreateInput
}


/**
 * Message update
 */
export type MessageUpdateArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * The data needed to update a Message.
  **/
  data: MessageUpdateInput
  /**
   * Choose, which Message to update.
  **/
  where: MessageWhereUniqueInput
}


/**
 * Message updateMany
 */
export type MessageUpdateManyArgs = {
  data: MessageUpdateManyMutationInput
  where?: MessageWhereInput
}


/**
 * Message upsert
 */
export type MessageUpsertArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * The filter to search for the Message to update in case it exists.
  **/
  where: MessageWhereUniqueInput
  /**
   * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
  **/
  create: MessageCreateInput
  /**
   * In case the Message was found with the provided `where` argument, update it with this data.
  **/
  update: MessageUpdateInput
}


/**
 * Message delete
 */
export type MessageDeleteArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter which Message to delete.
  **/
  where: MessageWhereUniqueInput
}


/**
 * Message deleteMany
 */
export type MessageDeleteManyArgs = {
  where?: MessageWhereInput
}


/**
 * Message without action
 */
export type MessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
}



/**
 * Deep Input Types
 */


export type ChannelWhereInput = {
  AND?: ChannelWhereInput | Enumerable<ChannelWhereInput>
  OR?: ChannelWhereInput | Enumerable<ChannelWhereInput>
  NOT?: ChannelWhereInput | Enumerable<ChannelWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  server?: ServerRelationFilter | ServerWhereInput
  serverId?: StringFilter | string
  Message?: MessageListRelationFilter
}

export type ChannelOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  serverId?: SortOrder
}

export type ChannelWhereUniqueInput = {
  id?: number
}

export type ServerWhereInput = {
  AND?: ServerWhereInput | Enumerable<ServerWhereInput>
  OR?: ServerWhereInput | Enumerable<ServerWhereInput>
  NOT?: ServerWhereInput | Enumerable<ServerWhereInput>
  id?: StringFilter | string
  name?: StringFilter | string
  admin?: UserRelationFilter | UserWhereInput
  adminId?: IntFilter | number
  channels?: ChannelListRelationFilter
  users?: UsersOnServerListRelationFilter
  position?: IntFilter | number
  icon?: StringFilter | string
}

export type ServerOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  adminId?: SortOrder
  position?: SortOrder
  icon?: SortOrder
}

export type ServerWhereUniqueInput = {
  id?: string
  position?: number
}

export type UsersOnServerWhereInput = {
  AND?: UsersOnServerWhereInput | Enumerable<UsersOnServerWhereInput>
  OR?: UsersOnServerWhereInput | Enumerable<UsersOnServerWhereInput>
  NOT?: UsersOnServerWhereInput | Enumerable<UsersOnServerWhereInput>
  server?: ServerRelationFilter | ServerWhereInput
  serverId?: StringFilter | string
  user?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
}

export type UsersOnServerOrderByInput = {
  serverId?: SortOrder
  userId?: SortOrder
}

export type UsersOnServerWhereUniqueInput = {
  serverId_userId?: ServerIdUserIdCompoundUniqueInput
}

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  password?: StringFilter | string
  servers?: UsersOnServerListRelationFilter
  adminOfServers?: ServerListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  password?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  name?: string
}

export type MessageWhereInput = {
  AND?: MessageWhereInput | Enumerable<MessageWhereInput>
  OR?: MessageWhereInput | Enumerable<MessageWhereInput>
  NOT?: MessageWhereInput | Enumerable<MessageWhereInput>
  id?: IntFilter | number
  channel?: ChannelRelationFilter | ChannelWhereInput
  channelId?: IntFilter | number
  username?: StringFilter | string
  msg?: StringFilter | string
  date?: DateTimeFilter | Date | string
}

export type MessageOrderByInput = {
  id?: SortOrder
  channelId?: SortOrder
  username?: SortOrder
  msg?: SortOrder
  date?: SortOrder
}

export type MessageWhereUniqueInput = {
  id?: number
}

export type ChannelCreateInput = {
  name: string
  server: ServerCreateOneWithoutChannelsInput
  Message?: MessageCreateManyWithoutChannelInput
}

export type ChannelUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  server?: ServerUpdateOneRequiredWithoutChannelsInput
  Message?: MessageUpdateManyWithoutChannelInput
}

export type ChannelUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type ServerCreateInput = {
  id: string
  name: string
  icon?: string
  admin: UserCreateOneWithoutAdminOfServersInput
  channels?: ChannelCreateManyWithoutServerInput
  users?: UsersOnServerCreateManyWithoutServerInput
}

export type ServerUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  icon?: string | StringFieldUpdateOperationsInput
  admin?: UserUpdateOneRequiredWithoutAdminOfServersInput
  channels?: ChannelUpdateManyWithoutServerInput
  users?: UsersOnServerUpdateManyWithoutServerInput
}

export type ServerUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  icon?: string | StringFieldUpdateOperationsInput
}

export type UsersOnServerCreateInput = {
  server: ServerCreateOneWithoutUsersInput
  user: UserCreateOneWithoutServersInput
}

export type UsersOnServerUpdateInput = {
  server?: ServerUpdateOneRequiredWithoutUsersInput
  user?: UserUpdateOneRequiredWithoutServersInput
}

export type UsersOnServerUpdateManyMutationInput = {

}

export type UserCreateInput = {
  name: string
  password: string
  servers?: UsersOnServerCreateManyWithoutUserInput
  adminOfServers?: ServerCreateManyWithoutAdminInput
}

export type UserUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  servers?: UsersOnServerUpdateManyWithoutUserInput
  adminOfServers?: ServerUpdateManyWithoutAdminInput
}

export type UserUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
}

export type MessageCreateInput = {
  username: string
  msg: string
  date?: Date | string
  channel: ChannelCreateOneWithoutMessageInput
}

export type MessageUpdateInput = {
  username?: string | StringFieldUpdateOperationsInput
  msg?: string | StringFieldUpdateOperationsInput
  date?: Date | string | DateTimeFieldUpdateOperationsInput
  channel?: ChannelUpdateOneRequiredWithoutMessageInput
}

export type MessageUpdateManyMutationInput = {
  username?: string | StringFieldUpdateOperationsInput
  msg?: string | StringFieldUpdateOperationsInput
  date?: Date | string | DateTimeFieldUpdateOperationsInput
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

export type ServerRelationFilter = {
  is?: ServerWhereInput
  isNot?: ServerWhereInput
}

export type MessageListRelationFilter = {
  every?: MessageWhereInput
  some?: MessageWhereInput
  none?: MessageWhereInput
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type ChannelListRelationFilter = {
  every?: ChannelWhereInput
  some?: ChannelWhereInput
  none?: ChannelWhereInput
}

export type UsersOnServerListRelationFilter = {
  every?: UsersOnServerWhereInput
  some?: UsersOnServerWhereInput
  none?: UsersOnServerWhereInput
}

export type ServerIdUserIdCompoundUniqueInput = {
  serverId: string
  userId: number
}

export type ServerListRelationFilter = {
  every?: ServerWhereInput
  some?: ServerWhereInput
  none?: ServerWhereInput
}

export type ChannelRelationFilter = {
  is?: ChannelWhereInput
  isNot?: ChannelWhereInput
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

export type ServerCreateOneWithoutChannelsInput = {
  create?: ServerCreateWithoutChannelsInput
  connect?: ServerWhereUniqueInput
}

export type MessageCreateManyWithoutChannelInput = {
  create?: MessageCreateWithoutChannelInput | Enumerable<MessageCreateWithoutChannelInput>
  connect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type ServerUpdateOneRequiredWithoutChannelsInput = {
  create?: ServerCreateWithoutChannelsInput
  connect?: ServerWhereUniqueInput
  update?: ServerUpdateWithoutChannelsDataInput
  upsert?: ServerUpsertWithoutChannelsInput
}

export type MessageUpdateManyWithoutChannelInput = {
  create?: MessageCreateWithoutChannelInput | Enumerable<MessageCreateWithoutChannelInput>
  connect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  set?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  disconnect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  delete?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  update?: MessageUpdateWithWhereUniqueWithoutChannelInput | Enumerable<MessageUpdateWithWhereUniqueWithoutChannelInput>
  updateMany?: MessageUpdateManyWithWhereNestedInput | Enumerable<MessageUpdateManyWithWhereNestedInput>
  deleteMany?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  upsert?: MessageUpsertWithWhereUniqueWithoutChannelInput | Enumerable<MessageUpsertWithWhereUniqueWithoutChannelInput>
}

export type UserCreateOneWithoutAdminOfServersInput = {
  create?: UserCreateWithoutAdminOfServersInput
  connect?: UserWhereUniqueInput
}

export type ChannelCreateManyWithoutServerInput = {
  create?: ChannelCreateWithoutServerInput | Enumerable<ChannelCreateWithoutServerInput>
  connect?: ChannelWhereUniqueInput | Enumerable<ChannelWhereUniqueInput>
}

export type UsersOnServerCreateManyWithoutServerInput = {
  create?: UsersOnServerCreateWithoutServerInput | Enumerable<UsersOnServerCreateWithoutServerInput>
  connect?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
}

export type UserUpdateOneRequiredWithoutAdminOfServersInput = {
  create?: UserCreateWithoutAdminOfServersInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutAdminOfServersDataInput
  upsert?: UserUpsertWithoutAdminOfServersInput
}

export type ChannelUpdateManyWithoutServerInput = {
  create?: ChannelCreateWithoutServerInput | Enumerable<ChannelCreateWithoutServerInput>
  connect?: ChannelWhereUniqueInput | Enumerable<ChannelWhereUniqueInput>
  set?: ChannelWhereUniqueInput | Enumerable<ChannelWhereUniqueInput>
  disconnect?: ChannelWhereUniqueInput | Enumerable<ChannelWhereUniqueInput>
  delete?: ChannelWhereUniqueInput | Enumerable<ChannelWhereUniqueInput>
  update?: ChannelUpdateWithWhereUniqueWithoutServerInput | Enumerable<ChannelUpdateWithWhereUniqueWithoutServerInput>
  updateMany?: ChannelUpdateManyWithWhereNestedInput | Enumerable<ChannelUpdateManyWithWhereNestedInput>
  deleteMany?: ChannelScalarWhereInput | Enumerable<ChannelScalarWhereInput>
  upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | Enumerable<ChannelUpsertWithWhereUniqueWithoutServerInput>
}

export type UsersOnServerUpdateManyWithoutServerInput = {
  create?: UsersOnServerCreateWithoutServerInput | Enumerable<UsersOnServerCreateWithoutServerInput>
  connect?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  set?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  disconnect?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  delete?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  update?: UsersOnServerUpdateWithWhereUniqueWithoutServerInput | Enumerable<UsersOnServerUpdateWithWhereUniqueWithoutServerInput>
  updateMany?: UsersOnServerUpdateManyWithWhereNestedInput | Enumerable<UsersOnServerUpdateManyWithWhereNestedInput>
  deleteMany?: UsersOnServerScalarWhereInput | Enumerable<UsersOnServerScalarWhereInput>
  upsert?: UsersOnServerUpsertWithWhereUniqueWithoutServerInput | Enumerable<UsersOnServerUpsertWithWhereUniqueWithoutServerInput>
}

export type ServerCreateOneWithoutUsersInput = {
  create?: ServerCreateWithoutUsersInput
  connect?: ServerWhereUniqueInput
}

export type UserCreateOneWithoutServersInput = {
  create?: UserCreateWithoutServersInput
  connect?: UserWhereUniqueInput
}

export type ServerUpdateOneRequiredWithoutUsersInput = {
  create?: ServerCreateWithoutUsersInput
  connect?: ServerWhereUniqueInput
  update?: ServerUpdateWithoutUsersDataInput
  upsert?: ServerUpsertWithoutUsersInput
}

export type UserUpdateOneRequiredWithoutServersInput = {
  create?: UserCreateWithoutServersInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutServersDataInput
  upsert?: UserUpsertWithoutServersInput
}

export type UsersOnServerCreateManyWithoutUserInput = {
  create?: UsersOnServerCreateWithoutUserInput | Enumerable<UsersOnServerCreateWithoutUserInput>
  connect?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
}

export type ServerCreateManyWithoutAdminInput = {
  create?: ServerCreateWithoutAdminInput | Enumerable<ServerCreateWithoutAdminInput>
  connect?: ServerWhereUniqueInput | Enumerable<ServerWhereUniqueInput>
}

export type UsersOnServerUpdateManyWithoutUserInput = {
  create?: UsersOnServerCreateWithoutUserInput | Enumerable<UsersOnServerCreateWithoutUserInput>
  connect?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  set?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  disconnect?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  delete?: UsersOnServerWhereUniqueInput | Enumerable<UsersOnServerWhereUniqueInput>
  update?: UsersOnServerUpdateWithWhereUniqueWithoutUserInput | Enumerable<UsersOnServerUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: UsersOnServerUpdateManyWithWhereNestedInput | Enumerable<UsersOnServerUpdateManyWithWhereNestedInput>
  deleteMany?: UsersOnServerScalarWhereInput | Enumerable<UsersOnServerScalarWhereInput>
  upsert?: UsersOnServerUpsertWithWhereUniqueWithoutUserInput | Enumerable<UsersOnServerUpsertWithWhereUniqueWithoutUserInput>
}

export type ServerUpdateManyWithoutAdminInput = {
  create?: ServerCreateWithoutAdminInput | Enumerable<ServerCreateWithoutAdminInput>
  connect?: ServerWhereUniqueInput | Enumerable<ServerWhereUniqueInput>
  set?: ServerWhereUniqueInput | Enumerable<ServerWhereUniqueInput>
  disconnect?: ServerWhereUniqueInput | Enumerable<ServerWhereUniqueInput>
  delete?: ServerWhereUniqueInput | Enumerable<ServerWhereUniqueInput>
  update?: ServerUpdateWithWhereUniqueWithoutAdminInput | Enumerable<ServerUpdateWithWhereUniqueWithoutAdminInput>
  updateMany?: ServerUpdateManyWithWhereNestedInput | Enumerable<ServerUpdateManyWithWhereNestedInput>
  deleteMany?: ServerScalarWhereInput | Enumerable<ServerScalarWhereInput>
  upsert?: ServerUpsertWithWhereUniqueWithoutAdminInput | Enumerable<ServerUpsertWithWhereUniqueWithoutAdminInput>
}

export type ChannelCreateOneWithoutMessageInput = {
  create?: ChannelCreateWithoutMessageInput
  connect?: ChannelWhereUniqueInput
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type ChannelUpdateOneRequiredWithoutMessageInput = {
  create?: ChannelCreateWithoutMessageInput
  connect?: ChannelWhereUniqueInput
  update?: ChannelUpdateWithoutMessageDataInput
  upsert?: ChannelUpsertWithoutMessageInput
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

export type ServerCreateWithoutChannelsInput = {
  id: string
  name: string
  icon?: string
  admin: UserCreateOneWithoutAdminOfServersInput
  users?: UsersOnServerCreateManyWithoutServerInput
}

export type MessageCreateWithoutChannelInput = {
  username: string
  msg: string
  date?: Date | string
}

export type ServerUpdateWithoutChannelsDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  icon?: string | StringFieldUpdateOperationsInput
  admin?: UserUpdateOneRequiredWithoutAdminOfServersInput
  users?: UsersOnServerUpdateManyWithoutServerInput
}

export type ServerUpsertWithoutChannelsInput = {
  update: ServerUpdateWithoutChannelsDataInput
  create: ServerCreateWithoutChannelsInput
}

export type MessageUpdateWithWhereUniqueWithoutChannelInput = {
  where: MessageWhereUniqueInput
  data: MessageUpdateWithoutChannelDataInput
}

export type MessageUpdateManyWithWhereNestedInput = {
  where: MessageScalarWhereInput
  data: MessageUpdateManyDataInput
}

export type MessageScalarWhereInput = {
  AND?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  OR?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  NOT?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  id?: IntFilter | number
  channelId?: IntFilter | number
  username?: StringFilter | string
  msg?: StringFilter | string
  date?: DateTimeFilter | Date | string
}

export type MessageUpsertWithWhereUniqueWithoutChannelInput = {
  where: MessageWhereUniqueInput
  update: MessageUpdateWithoutChannelDataInput
  create: MessageCreateWithoutChannelInput
}

export type UserCreateWithoutAdminOfServersInput = {
  name: string
  password: string
  servers?: UsersOnServerCreateManyWithoutUserInput
}

export type ChannelCreateWithoutServerInput = {
  name: string
  Message?: MessageCreateManyWithoutChannelInput
}

export type UsersOnServerCreateWithoutServerInput = {
  user: UserCreateOneWithoutServersInput
}

export type UserUpdateWithoutAdminOfServersDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  servers?: UsersOnServerUpdateManyWithoutUserInput
}

export type UserUpsertWithoutAdminOfServersInput = {
  update: UserUpdateWithoutAdminOfServersDataInput
  create: UserCreateWithoutAdminOfServersInput
}

export type ChannelUpdateWithWhereUniqueWithoutServerInput = {
  where: ChannelWhereUniqueInput
  data: ChannelUpdateWithoutServerDataInput
}

export type ChannelUpdateManyWithWhereNestedInput = {
  where: ChannelScalarWhereInput
  data: ChannelUpdateManyDataInput
}

export type ChannelScalarWhereInput = {
  AND?: ChannelScalarWhereInput | Enumerable<ChannelScalarWhereInput>
  OR?: ChannelScalarWhereInput | Enumerable<ChannelScalarWhereInput>
  NOT?: ChannelScalarWhereInput | Enumerable<ChannelScalarWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  serverId?: StringFilter | string
}

export type ChannelUpsertWithWhereUniqueWithoutServerInput = {
  where: ChannelWhereUniqueInput
  update: ChannelUpdateWithoutServerDataInput
  create: ChannelCreateWithoutServerInput
}

export type UsersOnServerUpdateWithWhereUniqueWithoutServerInput = {
  where: UsersOnServerWhereUniqueInput
  data: UsersOnServerUpdateWithoutServerDataInput
}

export type UsersOnServerUpdateManyWithWhereNestedInput = {
  where: UsersOnServerScalarWhereInput
  data: UsersOnServerUpdateManyDataInput
}

export type UsersOnServerScalarWhereInput = {
  AND?: UsersOnServerScalarWhereInput | Enumerable<UsersOnServerScalarWhereInput>
  OR?: UsersOnServerScalarWhereInput | Enumerable<UsersOnServerScalarWhereInput>
  NOT?: UsersOnServerScalarWhereInput | Enumerable<UsersOnServerScalarWhereInput>
  serverId?: StringFilter | string
  userId?: IntFilter | number
}

export type UsersOnServerUpsertWithWhereUniqueWithoutServerInput = {
  where: UsersOnServerWhereUniqueInput
  update: UsersOnServerUpdateWithoutServerDataInput
  create: UsersOnServerCreateWithoutServerInput
}

export type ServerCreateWithoutUsersInput = {
  id: string
  name: string
  icon?: string
  admin: UserCreateOneWithoutAdminOfServersInput
  channels?: ChannelCreateManyWithoutServerInput
}

export type UserCreateWithoutServersInput = {
  name: string
  password: string
  adminOfServers?: ServerCreateManyWithoutAdminInput
}

export type ServerUpdateWithoutUsersDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  icon?: string | StringFieldUpdateOperationsInput
  admin?: UserUpdateOneRequiredWithoutAdminOfServersInput
  channels?: ChannelUpdateManyWithoutServerInput
}

export type ServerUpsertWithoutUsersInput = {
  update: ServerUpdateWithoutUsersDataInput
  create: ServerCreateWithoutUsersInput
}

export type UserUpdateWithoutServersDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  adminOfServers?: ServerUpdateManyWithoutAdminInput
}

export type UserUpsertWithoutServersInput = {
  update: UserUpdateWithoutServersDataInput
  create: UserCreateWithoutServersInput
}

export type UsersOnServerCreateWithoutUserInput = {
  server: ServerCreateOneWithoutUsersInput
}

export type ServerCreateWithoutAdminInput = {
  id: string
  name: string
  icon?: string
  channels?: ChannelCreateManyWithoutServerInput
  users?: UsersOnServerCreateManyWithoutServerInput
}

export type UsersOnServerUpdateWithWhereUniqueWithoutUserInput = {
  where: UsersOnServerWhereUniqueInput
  data: UsersOnServerUpdateWithoutUserDataInput
}

export type UsersOnServerUpsertWithWhereUniqueWithoutUserInput = {
  where: UsersOnServerWhereUniqueInput
  update: UsersOnServerUpdateWithoutUserDataInput
  create: UsersOnServerCreateWithoutUserInput
}

export type ServerUpdateWithWhereUniqueWithoutAdminInput = {
  where: ServerWhereUniqueInput
  data: ServerUpdateWithoutAdminDataInput
}

export type ServerUpdateManyWithWhereNestedInput = {
  where: ServerScalarWhereInput
  data: ServerUpdateManyDataInput
}

export type ServerScalarWhereInput = {
  AND?: ServerScalarWhereInput | Enumerable<ServerScalarWhereInput>
  OR?: ServerScalarWhereInput | Enumerable<ServerScalarWhereInput>
  NOT?: ServerScalarWhereInput | Enumerable<ServerScalarWhereInput>
  id?: StringFilter | string
  name?: StringFilter | string
  adminId?: IntFilter | number
  position?: IntFilter | number
  icon?: StringFilter | string
}

export type ServerUpsertWithWhereUniqueWithoutAdminInput = {
  where: ServerWhereUniqueInput
  update: ServerUpdateWithoutAdminDataInput
  create: ServerCreateWithoutAdminInput
}

export type ChannelCreateWithoutMessageInput = {
  name: string
  server: ServerCreateOneWithoutChannelsInput
}

export type ChannelUpdateWithoutMessageDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  server?: ServerUpdateOneRequiredWithoutChannelsInput
}

export type ChannelUpsertWithoutMessageInput = {
  update: ChannelUpdateWithoutMessageDataInput
  create: ChannelCreateWithoutMessageInput
}

export type MessageUpdateWithoutChannelDataInput = {
  username?: string | StringFieldUpdateOperationsInput
  msg?: string | StringFieldUpdateOperationsInput
  date?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type MessageUpdateManyDataInput = {
  username?: string | StringFieldUpdateOperationsInput
  msg?: string | StringFieldUpdateOperationsInput
  date?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ChannelUpdateWithoutServerDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  Message?: MessageUpdateManyWithoutChannelInput
}

export type ChannelUpdateManyDataInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type UsersOnServerUpdateWithoutServerDataInput = {
  user?: UserUpdateOneRequiredWithoutServersInput
}

export type UsersOnServerUpdateManyDataInput = {

}

export type UsersOnServerUpdateWithoutUserDataInput = {
  server?: ServerUpdateOneRequiredWithoutUsersInput
}

export type ServerUpdateWithoutAdminDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  icon?: string | StringFieldUpdateOperationsInput
  channels?: ChannelUpdateManyWithoutServerInput
  users?: UsersOnServerUpdateManyWithoutServerInput
}

export type ServerUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  icon?: string | StringFieldUpdateOperationsInput
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
