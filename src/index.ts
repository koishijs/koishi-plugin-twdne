import { Context, Random, Schema, segment } from 'koishi'

const BASE_URL = 'https://www.thiswaifudoesnotexist.net/example-{0}.jpg'

export interface Config {}

export const name = 'TWDNE'
export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('twdne [id:integer]', '随机老婆图片')
    .action(async (_, id = Random.int(100000)) => {
      const data = await ctx.http.get<ArrayBuffer>(BASE_URL.replace('{0}', '' + id), {
        responseType: 'arraybuffer',
      })
      return segment.image(data)
    })
}
