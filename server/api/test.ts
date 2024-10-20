export default defineEventHandler(async () => {
    // Wait 3 seconds then return
    console.log('Hello from the server!')
    return Math.random()
})