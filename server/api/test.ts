export default defineEventHandler(async () => {
    // Wait 3 seconds then return
    console.log('Hello from server')
    return Math.random()
})