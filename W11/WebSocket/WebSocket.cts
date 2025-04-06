const g_coMultipleChatRooms = new Map(Array.of(Array.of("one", new Set()), Array.of("the available room", new Set())))

function g_enter(a_oAUser, a_sOneOfTheAvailableRooms) {
	g_coMultipleChatRooms.get(a_sOneOfTheAvailableRooms).add(a_oAUser)
}

Bun.serve({
	fetch(a_oOneOfTheAvailableRooms, a_o) {
		a_o.upgrade(a_oOneOfTheAvailableRooms, { data: new URL(a_oOneOfTheAvailableRooms.url).searchParams.get("room") })
		return
	},
	websocket: {
		open(a_o) {
			g_enter(a_o, a_o.data)
		},
		message(a_o, a_m) {
			for (const l_co of g_coMultipleChatRooms.values()) {
				if (l_co.has(a_o)) l_co.forEach(a_o => a_o.send(a_m))
			}
		}
	}
})