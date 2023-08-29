const middleware = {}

middleware['auth-guard'] = require('../middleware/auth-guard.ts')
middleware['auth-guard'] = middleware['auth-guard'].default || middleware['auth-guard']

export default middleware
