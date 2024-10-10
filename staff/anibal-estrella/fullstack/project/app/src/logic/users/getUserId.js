import { utils } from 'com'
import context from '../context'

const { extractSubFromToken } = utils

export default () => extractSubFromToken(context.token)