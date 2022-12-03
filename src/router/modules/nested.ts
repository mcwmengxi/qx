const nestedRouter = {
	path: '/nested',
	meta: {
		title: '多级菜单',
		rank: 8
	},
	children: [
		{
			path: '/nested/menu1',
			meta: {
				title: '菜单1'
			},
			children: [
				{
					path: '/nested/menu1/menu1-1/index',
					name: 'Menu1-1',
					meta: {
						title: '菜单1-1'
					}
				},
				{
					path: '/nested/menu1/menu1-2',
					meta: {
						title: '菜单1-2'
					},
					children: [
						{
							path: '/nested/menu1/menu1-2/menu1-2-1',
							name: 'Menu1-2-1',
							meta: {
								title: '菜单1-2-1',
								showParent: true
							}
						}
					]
				}
			]
		}
	]
} as RouteConfigsTable

export default nestedRouter
