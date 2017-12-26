const dotenv = require('dotenv')
dotenv.config()

const Service = require('./service')

// Queue the explosions! ...by Michael Bay
new Service().initialize()
