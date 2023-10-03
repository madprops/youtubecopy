const App = {}

App.setup = () => {
	browser.commands.onCommand.addListener((command) => {
		if (command === `copy`) {
			App.copy()
		}
	})

	browser.browserAction.onClicked.addListener(() => {
		App.copy()
	})
}

App.copy = async () => {
	let active = await browser.tabs.query({active: true, currentWindow: true})

	if (active.length) {
		let url = active[0].url
		let regex = /(?:[?&]v=|\/embed\/|\/v\/|\/youtu\.be\/|\/watch\?v=|\/embed\?v=)([A-Za-z0-9_-]{11})/
		let match = url.match(regex)

		if (match) {
			let clean = `https://youtu.be/${match[1]}`
			navigator.clipboard.writeText(clean)
		}
	}
}

App.setup()