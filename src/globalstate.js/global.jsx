import { proxy } from 'valtio'

const auth = proxy({ authen: false , email:""})

export default auth