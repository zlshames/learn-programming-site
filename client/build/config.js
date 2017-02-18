'use strict'
const path = require('path')
const pkg = require('../../package')

module.exports = {
	port: 8080,
	title: 'learn-programming-frontend',
	vendor: Object.keys(pkg.frontDependencies),
	babel: {
		babelrc: false,
		presets: [
			['es2015', { modules: false }],
			'stage-1'
		],
		plugins: [
			'transform-vue-jsx'
		]
	},
	postcss: [
		require('autoprefixer')({
			// Vue does not support ie 8 and below
			browsers: ['last 2 versions', 'ie > 8']
		}),
		require('postcss-nested')
	],
	cssModules: false,
	jsx: true
}
