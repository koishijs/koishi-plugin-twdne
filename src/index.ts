import { Context, Random, Schema, segment } from 'koishi'
import {} from '@koishijs/plugin-http'

const BASE_URL = 'https://www.thiswaifudoesnotexist.net/example-{0}.jpg'

export const name = 'TWDNE'

export const inject = ['http']

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.i18n.define('zh', require('./locales/zh'))

  ctx.command('twdne [id:integer]')
    .action(async (_, id = Random.int(100000)) => {
      const data = await ctx.http.get<ArrayBuffer>(BASE_URL.replace('{0}', '' + id), {
        responseType: 'arraybuffer',
      })
      return segment.image(data, 'image/jpeg')
    })
}
