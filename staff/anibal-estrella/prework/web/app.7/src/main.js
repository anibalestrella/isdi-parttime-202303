// ESTA ES LA CAPA De PRESENTACION
// SOLO IMPORTA LÓGICA
// NO EXPORTA NADA
console.log('//// MAIN');

import { loginPage } from './pages/login-page.js'
import { homePage, renderUser, renderPosts, postListPanel } from './pages/home-page.js'
import { context, show } from './ui.js'

if (context.userId === undefined)
    show(loginPage)
else {
    if (renderUser()) {
        if (renderPosts()) {
            show(homePage)
            show(postListPanel)
        } else {
            show(loginPage)
        }
    } else
        show(loginPage)
}
