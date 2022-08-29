import { createVNode, render } from 'vue'
import loadingBar from '../components/loadingBar.vue'

const loadingBarVnode = createVNode(loadingBar)
render(loadingBarVnode, document.body)

export default loadingBarVnode