export default function useEventListener(
	target: any,
	event: string,
	callback: any
) {
	const ev = new Event(event)
	target.addEventListener(event, callback, false)
	target.dispatchEvent(ev)
}
