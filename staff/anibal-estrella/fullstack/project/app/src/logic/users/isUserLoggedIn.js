import context from '../context'
import { utils } from 'com'

const { isTokenValid, isTokenAlive } = utils
/** DESCRIPTION
 * isUserLoggedIn.js 
 * isTokenValid
 * isTokenAlive
 * @returns
 * 
 */
export default () => isTokenValid(context.token) && isTokenAlive(context.token)